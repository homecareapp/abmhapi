
const patient = require('./patient')
module.exports = function (server, restify) {
    //login api
    server.get('/getpatientlist', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler:  patient.getPatientList}
    ]));
}