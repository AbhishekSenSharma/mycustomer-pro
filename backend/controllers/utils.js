const Post = require("../models/customer");
const { GeneralError, NotFound } = require('../utils/error');
// https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
const authtokenCountry ="IaJjT4Xs1ATVbfC8LSsbkGq9dBgPA8w9Yfi1wSe-tlHEHBZFy_ZjxaEr87Plm0ZvlWg"
let authkey;
const request = require('request-promise');
const { getTokenSourceMapRange } = require("typescript");

const options = {
  url: 'https://www.universal-tutorial.com/api/getaccesstoken',
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "api-token":authtokenCountry,
    "user-email": "abhisheksensharma@gmail.com"
  }
};

getToken=()=>{
  return request(options)
    .then((token) => {
      authkey = JSON.parse(token).auth_token;
      return authkey

    })
    .catch((error) => {
      next(new GeneralError("Fetching countries failed!"));
    });

}

locationapi = async(req,res,url) =>{
  if(authkey === undefined) {
    await getToken();

  }
  const countryOpts = {
    url: 'https://www.universal-tutorial.com/api/'+url,
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer "+ authkey,
    }
  };
  request(countryOpts)
    .then((countries) => {
      res.status(200).json({
        message: "Countries found!",
        result: JSON.parse(countries)
      });
    })
    .catch((error) => {
      next(new GeneralError("Fetching api failed!"));
    });

}
exports.getStates = (req,res) =>{
  const url = 'states/'+req.params.country;
  locationapi(req,res,url);

}
exports.getCountries = async (req, res) => {
  const url = 'countries/';
  locationapi(req,res,url);
};
exports.getCities = async (req, res) => {
  const url = 'cities/'+req.params.state;
  locationapi(req,res,url);
};






