const log = require('./logger');
const request = require('request');
const patient = {};

patient.getPatientList = async function(req,response,next){
    const mrno = req.query.mrno;
    log.debug(req.query.mrno)
    if(!mrno){
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
    
    request(options, function(err, res, body) {  
        if(err) response.send(400,{error: "error in API call"})
        let json = JSON.parse(body);
        response.send(200, {data: json});
        return next();
    });
    
}

module.exports = patient

