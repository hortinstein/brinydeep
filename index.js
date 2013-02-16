var request = require('request');
var async = require('async');

var brinydeep = {};
module.exports = brinydeep;

var api_key= "";
var client_id = ""; 
var cred_string = "";
var host_string = "https://api.digitalocean.com/"


var send_request = function (urls,callback) {
	//console.log(urls)
  var req = function (url,callback) {
  	request(url,function (e,o) {
			o = JSON.parse(o.body);	
			if (o.status === 'ERROR') {
				callback(o.description,o);
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

var build_requests = function (type, api_path,arg) {
	if (type === undefined){ type = '/'};
	if (Array.isArray(arg)){
		var reqs = [];
		for (var item in arg){
			reqs.push(host_string+'/'+type+'/'+arg[item]+'/'+api_path+'/?'+cred_string);
		}
		return reqs;
	} 
	else return [host_string+'/'+type+'/'+arg+'/'+api_path+'/?'+cred_string];
}

brinydeep.setup = function  (sclient_id,sapi_key) {
	api_key = sapi_key;
	client_id = sclient_id;
	cred_string = "client_id=" + client_id + "&api_key=" + api_key;
}


/////////////////
//Documentation//
/////////////////
brinydeep.documentation = function  (callback) {
	var req = host_string+ cred_string;
	request(req,function (e,o) {
		o = o.body
		//console.log(e,o);
		callback(e,o);
	});
};


////////////
//Droplets//
////////////
brinydeep.get_ids = function (callback) {
	var req = host_string+ "/droplets/?" + cred_string
	send_request(req,function (e,o) {
		if (e) { callback(e) }
		else {
			var ids = [];
			o.droplets.forEach(function (machine){
				ids.push(machine.id);
			});
			callback(e,ids);
		};
	});
}
brinydeep.show_active = function (callback) {
	var req = host_string+ "/droplets/?" + cred_string
	send_request(req,callback);
}

brinydeep.show = function (droplet_ids, callback) {
	
};



// name Required, String, this is the name of the droplet - must be formatted by hostname rules
// size_id Required, Numeric, this is the id of the size you would like the droplet created at
// image_id Required, Numeric, this is the id of the image you would like the droplet created with
// region_id Required, Numeric, this is the id of the region you would like your server in IE: US/Amsterdam
// ssh_key_ids Optional, Numeric CSV, comma separated list of ssh_key_ids that you would like to be added to the server
var build_machine_req = function (machine) {
	var ret = "/new?name="+machine.name+
													"&size_id="+machine.size_id+
													"&image_id="+machine.image_id+
													"&region_id="+machine.region_id+'&'+cred_string;

	if (machine.hasOwnProperty('ssh_key_ids')){
		ret+=("&ssh_key_ids="+machine.ssh_key_ids);
	} 
	return ret;
}

brinydeep.new_droplet = function (options,callback) {
	var new_machine_req = "";
	if (options.hasOwnProperty('droplets')){
		var new_machine_req = [];
		options.droplets.forEach(function (machine){
			//console.log(machine)
			new_machine_req.push( build_machine_req(machine));
		});
	} else {
		new_machine_req = build_machine_req(options);
	}
	options = build_requests('droplets','/',new_machine_req);
	console.log(options);
	send_request(options,callback);


};
// droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.reboot = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.power_cycle = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.shut_down = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.power_off = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.power_on = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.reset_root_password = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.resize = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.snapshot = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.restore = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.rebuild = function (droplet_ids,callback) {
	
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.enable_automatic_backups = function (droplet_ids,callback) {
	
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.disable_automatic_backups = function (droplet_ids,callback) {
	
};
//image_id Required, Numeric, this is the id of the image you would like to use to rebuild your droplet with
brinydeep.destroy_all_droplets = function (callback) {
	brinydeep.get_ids(function (e,o) {
		if (!e){
			var reqs = build_requests('droplets','destroy',o)
			send_request(reqs,callback)
		}
	})
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.destroy = function (droplet_ids,callback) {
	var reqs = build_requests('droplets','destroy',droplet_ids);
	send_request(reqs,callback)
};

///////////
//Regions//
///////////
brinydeep.regions = function (callback) {
	
};
//////////
//Images//
//////////
brinydeep.all_images = function (callback) {
	
};
//image_id Required, Numeric, this is the id of the image you would like to use to rebuild your droplet with
brinydeep.show_images = function (image_id, callback) {
	
};
//image_id Required, Numeric, this is the id of the image you would like to use to rebuild your droplet with
brinydeep.destroy_images = function (image_id, callback) {
	
};


////////////
//SSH Keys//
////////////
brinydeep.all_ssh_keys = function (callback) {
	
};
//ssh_key Required, Numeric, this is the id of the ssh key you would like to use to display
brinydeep.show_ssh_key = function (ssh_key_id,callback) {
	
};
////////Coming soon with API///////////////////////////////////
// brinydeep.add_ssh_key = function (ssh_key,callback) {	
// };
// brinydeep.edit_ssh_key = function (ssh_key,callback) {
// };
// brinydeep.destroy_ssh_key = function (ssh_key,callback) {
// };
////////Coming soon with API///////////////////////////////////

brinydeep.sizes = function (callback) {
	var req = host_string+ "/sizes/?" + cred_string
	send_request(req,callback);
}

if(!module.parent) {

}