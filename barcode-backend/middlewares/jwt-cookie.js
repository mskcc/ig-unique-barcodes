const jwtInCookie = require('jwt-in-cookie');
const apiResponse = require('../helpers/apiResponse');
exports.authenticateRequest = function(req, res, next) {
  if(process.env.ENV !== 'PROD') {
    next();
    return;
  }
  try {
    let user = jwtInCookie.validateJwtToken(req);
    res.user = user;
  } catch(err){
    return apiResponse.AuthenticationErrorResponse(res,  'Not authorized - please log in');
  }
  next();
};
