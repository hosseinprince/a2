var express        = require('express'),
    mongodb        = require('mongodb'),
    passport       = require('passport'),
    node_acl       = require('acl'),
    app            = express(),
    session        = require('express-session'),
    cookieParser   = require('cookie-parser'),
    localStrategy  = require('passport-local').Strategy;
var bodyParser     = require('body-parser');
var methodOverride = require('method-override'),
    acl;

// Some test data. Get this from your database.
var users = [
  {
    id       : 1,
    username : 'ha',
    password : '123456',
    email    : 'bob@example.com'
  },
  {
    id       : 2,
    username : 'joe',
    password : 'birthday',
    email    : 'joe@example.com'
  }
];

// Setup express
app.use(cookieParser());
app.use(bodyParser.json({extended : false}));
app.use(methodOverride());
app.use(session({
  secret            : "lovesecret",
  name              : "user",
//   store: sessionStore, // connect-mongo session store
  proxy             : true,
  resave            : true,
  saveUninitialized : true
}));
// Initialize Passport. Also use passport.session() middleware, to support
// persistent login sessions.
app.use(passport.initialize());
app.use(passport.session());

// Error handling
app.use(function (error, request, response, next) {
  if (!error) {
    return next();
  }
  response.send(error.msg, error.errorCode);
});

authentication_setup();

// Connecting to mongo database and setup authorization
mongodb.connect('mongodb://127.0.0.1:27017/ac2', authorization_setup);

// Setting up passport
function authentication_setup () {

  // Setup session support
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    find_user_by_id(id, function (error, user) {
      done(error, user);
    });
  });

  // Setup strategy (local in this case)
  passport.use(new localStrategy(
    function (username, password, done) {
      process.nextTick(function () {
        find_by_username(username, function (error, user) {

          if (error) {
            return done(error);
          }

          if (!user) {
            return done(null, false, {message : 'Unknown user ' + username});
          }

          if (user.password != password) {
            return done(null, false, {message : 'Invalid password'});
          }

          // Authenticated
          return done(null, user);
        });
      });
    }
  ));
}

// Setting up node_acl
function authorization_setup (error, db) {

  var mongoBackend = new node_acl.mongodbBackend(db /*, {String} prefix */);

  // Create a new access control list by providing the mongo backend
  //  Also inject a simple logger to provide meaningful output
  acl = new node_acl(mongoBackend, logger());

  // Defining roles and routes
  set_roles();
  set_routes();
}

// This creates a set of roles which have permissions on
//  different resources.
function set_roles () {

  // Define roles, resources and permissions
  acl.allow([
    {
      roles  : ['admin'],
      allows : [
        {
          resources   : '/api/secret',
          permissions : '*'
        },
        {
          resources   : ['forums', 'news'],
          permissions : ['get', 'put', 'delete']
        }
      ]
    },
    {
      roles  : ['gold', 'silver'],
      allows : [
        {
          resources   : 'cash',
          permissions : ['sell', 'exchange']
        },
        {
          resources   : ['account', 'deposit'],
          permissions : ['put', 'delete']
        }
      ]
    }
  ]);

  // Inherit roles
  //  Every user is allowed to do what guests do
  //  Every admin is allowed to do what users do
  acl.addRoleParents('user', 'guest');
  acl.addRoleParents('admin', 'user');
}

// Defining routes ( resources )
function set_routes () {

  // Check your current user and roles
  app.post('/status', function (request, response) {
    acl.addUserRoles(request.user.id, "admin");
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', request.user);
    acl.isAllowed(request.user.id, '/secret', 'get', function (er, res) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res, er);
    });
    acl.allowedPermissions(request.user.id, '/secret', function (err, permissions) {
      console.log('##########!!!!!!!!!!!!!!!!!!!!', err, permissions);
    });
    acl.userRoles(request.user.id, function (error, roles) {
      response.send('User: ' + JSON.stringify(request.user) + ' Roles: ' + JSON.stringify(roles));
    });
  });

  // Only for users and higher
  app.post('/api/secret',
    [authenticated, acl.middleware()],
    function (request, response) {
      response.send({en : 'Welcome Sir!'});
    }
  );

  // Logging out the current user
  app.get('/api/logout', function (request, response) {
    request.logout();
    response.send({});
  });

  app.get('/api/users', authenticated, function (request, response) {
    if (request.user)
      response.send(request.user);
    else {
      request.logout();
      response.send({});
    }
  });

  // Logging in a user
  app.post('/api/login',
    passport.authenticate('local', {}),
    function (req, response) {
      console.log('Cookies: ', req.cookies);
      response.send({token : 'qazwsx'});
    }
  );

  // Setting a new role
  app.get('/allow/:user/:role', function (request, response, next) {
    acl.addUserRoles(request.params.user, request.params.role);
    response.send(request.params.user + ' is a ' + request.params.role);
  });

  // Unsetting a role
  app.get('/disallow/:user/:role', function (request, response, next) {
    acl.removeUserRoles(request.params.user, request.params.role);
    response.send(request.params.user + ' is not a ' + request.params.role + ' anymore.');
  });

  app.get('/', function (req, res, next) {
    res.send({en : 'logout'});
  });
}

// This gets the ID from currently logged in user
function get_user_id (request, response) {

  // Since numbers are not supported by node_acl in this case, convert
  //  them to strings, so we can use IDs nonetheless.
  return request.user && request.user.id.toString() || false;
}

// Helper used in session setup by passport
function find_user_by_id (id, callback) {

  var index = id - 1;

  if (users[index]) {
    callback(null, users[index]);
  }
  else {
    var error    = new Error('User does not exist.');
    error.status = 404;
    callback(error);
  }
}

// Helper used in the local strategy setup by passport
function find_by_username (username, callback) {

  var usersLength = users.length,
      i;

  for (i = 0; i < usersLength; i++) {
    var user = users[i];
    if (user.username === username) {
      return callback(null, user);
    }
  }

  return callback(null, null);
}

// Generic debug logger for node_acl
function logger () {
  return {
    debug : function (msg) {
      console.log('-DEBUG-', msg);
    }
  };
}

// Authentication middleware for passport
function authenticated (request, response, next) {
  if (request.isAuthenticated()) {
    console.log('user authenticated', request.user.username);
    return next();
  }
  else console.log('user is loged out');
  response.status(401).send({en : 'notAuthenticated'})
}

app.listen(2000, function () {
  console.log('Express server listening on port 8080');
});
