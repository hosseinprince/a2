var soap = require('soap');
var url  = 'http://www.webservicex.com/globalweather.asmx?WSDL';
// var args = {name: 'value'};
var args = {CountryName : 'iran'};
soap.createClient(url, function (err, client) {
  client.GetCitiesByCountry(args, function (err, result) {
    if (err)
      console.log(err);
    else
      console.log('result', result);
  });
});