const request = require("request");

module.exports = {
  getRequest : function(uri){
    return new Promise((resolve, reject) => {
    request({
      method : "GET",
      json : true,
      uri : uri
    }, (error, response, body) => {
        if(!error && response.statusCode == 200){
          resolve(body);
        }
        else{
          reject(error);
        }
      });
    });
  }
}


