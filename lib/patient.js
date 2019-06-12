const log = require('./logger');
const request = require('request');
const patient = {};

patient.getPatientList = async function(req,response,next){
    const mrno = req.query.mrno;
    if(!mrno){
        log.error("No MRNo, return error message")
        response.send(400, {message: "No MRNo Passed"});
        return next();
    }
    const options = {  
        url: 'http://164.164.87.47:8090/rhis/df/mobileapp/getPatientList?Mrno=' + mrno + '&Mobileno=',
        method: 'GET',
        headers: {
            'Accept': 'application/text',
            'Accept-Charset': 'utf-8'
        }
    };
    log.info("Calling ABMH API:" + options.url);
    
    request(options, function(err, res, body) {  
        if(err) {
            log.error(err);
            response.send(400,{message: "error in API call: " + err.errno});
            return next();
        }
        let json = JSON.parse(body);
        response.send(200, {data: json});
        return next();
    });
    
}

module.exports = patient

