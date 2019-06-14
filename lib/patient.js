const log = require('./logger');
const request = require('request');
const patient = {};

patient.getPatientList = async function(req,response,next){
    const mrno = req.query.mrno;
    const mobile = req.query.mobile;
    if(!mrno && !mobile){
        log.error("Mobile and MRN missing, return error message")
        response.send(400, {message: "Mobile and MRN missing"});
        return next();
    }

    let url = 'http://223.196.87.151/rhis/df/mobileapp/getPatientList?Mrno=';
    (mrno) ? url = url + mrno + '&Mobileno=' : url = url + '&Mobileno=' ;
    if(mobile) url = url + mobile;

    const options = {  
        url: url,
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
        let json
        try {
            json = JSON.parse(body);
        } catch (error) {
            log.error("No result found.");
            response.send(400,{message: "No result found."});
            return next();
            
        }
        
        response.send(200, {data: json});
        return next();
    });
    
}

module.exports = patient

