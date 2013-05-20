var request = require('request');
var async = require('async');

var requester = {};
module.exports = requester;

var host_string = "";
var cred_string = "";

requester.setup = function (c_host_string, c_cred_string){
    host_string = c_host_string;
    cred_string = c_cred_string;
    return true;
};

requester.send_request = function (urls,callback) {
    //console.log(urls)
  var req = function (url,callback) {
      request(url,function (e,o) {
			o = JSON.parse(o.body);	
			if (o.status === 'ERROR') {
				callback(o.error_message,o);
			} else {
				callback(e,o);	
			}
		});
  }
	if (Array.isArray(urls)){
		async.map(urls, req, function (e,r) {
			callback(e,r);
		});
	} else {
		req(urls,callback);
	}
	
}

requester.build_requests = function (type, api_path,arg) {
	if (type === undefined){ type = '/'};
	if (Array.isArray(arg)){
		var reqs = [];
		for (var item in arg){
			reqs.push(host_string+'/'+type+'/'+arg[item]+'/'+api_path+'/?'+cred_string);
		}
		return reqs;
	} 
	else return host_string+'/'+type+'/'+arg+'/'+api_path+'/?'+cred_string;
}

// name Required, String, this is the name of the droplet - must be formatted by hostname rules
// size_id Required, Numeric, this is the id of the size you would like the droplet created at
// image_id Required, Numeric, this is the id of the image you would like the droplet created with
// region_id Required, Numeric, this is the id of the region you would like your server in IE: US/Amsterdam
// ssh_key_ids Optional, Numeric CSV, comma separated list of ssh_key_ids that you would like to be added to the server
requester.build_machine_req = function (machine) {
    var ret =   "/new?name="+machine.name
                + "&size_id="+machine.size_id
				+ "&image_id="+machine.image_id
				+ "&region_id="+machine.region_id
                +'&'+cred_string;

	if (machine.hasOwnProperty('ssh_key_ids')){
		ret+=("&ssh_key_ids="+machine.ssh_key_ids);
	} 
	return ret;
}


