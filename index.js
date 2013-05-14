var request = require('request');

var brinydeep = {};
module.exports = brinydeep;

var api_key= "";
var client_id = ""; 
var cred_string = "";
var host_string = "https://api.digitalocean.com/";
var requestor = require('./lib/request.js');
var ids_created_this_session = [];

brinydeep.setup = function (c_client_id, c_api_key) {
   api_key = c_api_key;
   client_id = c_client_id;
   cred_string = "client_id=" + client_id + "&api_key=" + api_key;
   requestor.setup(host_string,cred_string);
};

/////////////////
//Documentation//
/////////////////
brinydeep.documentation = function  (callback) {
	var req = host_string+ cred_string;
	request(req,function (e,o) {
		o = o.body;
		//console.log(e,o);
		callback(e,o);
	});
};


////////////
//Droplets//
////////////
brinydeep.get_ids = function (callback) {
	var req = host_string+ "/droplets/?" + cred_string;
	requestor.send_request(req,function (e,o) {
		if (e) { callback(e) }
		else {
			var ids = [];
			o.droplets.forEach(function (machine){
				ids.push(machine.id);
			});
			callback(e,ids);
		}
	});
};

brinydeep.get_ids_created_this_session = function(){
	return ids_created_this_session;
};


brinydeep.show_active = function (callback) {
	var req = host_string+ "/droplets/?" + cred_string;
	requestor.send_request(req,callback);
};

brinydeep.show_droplets = function (droplet_ids, callback) {
	var reqs = requestor.build_requests('droplets','',droplet_ids);
	requestor.send_request(reqs,callback);
};

brinydeep.new_droplets = function (options,callback) {
	var new_machine_req = "";
	if (options.hasOwnProperty('droplets')){
		new_machine_req = [];
		options.droplets.forEach(function (machine){
			//console.log(machine)
			new_machine_req.push( requestor.build_machine_req(machine));
		});
	} else {
		new_machine_req = requestor.build_machine_req(options);
	}
	options = requestor.build_requests('droplets','/',new_machine_req);
	requestor.send_request(options,function (e,o) {
		//adds to a locally stored array of created droplets
		if (Array.isArray(o)){
			for (droplet in o) {
				var id = o[droplet].droplet.id;
				//console.log(id);
				ids_created_this_session.push(id);
			}
		} else {
			var id = o.droplet.id;
			ids_created_this_session.push(id); 
		}
		callback(e,o);
	});
};

// droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.get_ips = function (droplet_ids, callback) {
	var ip_provider = require('./lib/ip_provider.js');
	ip_provider(droplet_ids,requestor,callback);

};

// droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.reboot = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','reboot',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.power_cycle = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','power_cycle',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.shut_down = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','shut_down',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.power_off = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','power_off',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.power_on = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','power_on',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.reset_root_password = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','password_reset',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.resize = function (droplet_ids,size_id,callback) {
	var api_req = 'resize/?size_id='+size_id+'&'+cred_string;
	var reqs = requestor.build_requests('droplets',api_req,droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.snapshot = function (droplet_id,name,callback) {
	var api_req = droplet_id+'/snapshot/?name='+name+'&'+cred_string;
	
	requestor.send_request(api_req,callback);
};
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.restore = function (droplet_ids,name,callback) {
	var api_req = 'restore/?name='+name+'&'+cred_string;
	var reqs = requestor.build_requests('droplets',api_req,droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.rebuild = function (droplet_ids,callback) {
	var api_req = 'rebuild/?image_id='+name+'&'+cred_string;
	var reqs = requestor.build_requests('droplets',api_req,droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.enable_backups = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','enable_backups',droplet_ids);
	requestor.send_request(reqs,callback);
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.disable_backups = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','disable_backups',droplet_ids);
	requestor.send_request(reqs,callback);
};

//image_id Required, Numeric, this is the id of the image you would like to use to rebuild your droplet with
brinydeep.destroy_all_droplets = function (callback) {
	brinydeep.get_ids(function (e,o) {
		if (!e){
			var reqs = requestor.build_requests('droplets','destroy',o);
			requestor.send_request(reqs,callback);
		}
	});
};

//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.destroy = function (droplet_ids,callback) {
	var reqs = requestor.build_requests('droplets','destroy',droplet_ids);
	requestor.send_request(reqs,callback);
};

///////////
//Regions//
///////////
brinydeep.regions = function (callback) {
	var req = host_string+ "/regions/?" + cred_string;
	requestor.send_request(req,callback);
};
//////////
//Images//
//////////
brinydeep.all_images = function (callback) {
	var req = host_string+ "/images/?" + cred_string
	requestor.send_request(req,callback);
};
//image_id Required, Numeric, this is the id of the image you would like to use to rebuild your droplet with
brinydeep.show_images = function (image_ids, callback) {
	var reqs = requestor.build_requests('images','/',image_ids);
	requestor.send_request(reqs,callback);
};
//image_id Required, Numeric, this is the id of the image you would like to use to rebuild your droplet with
brinydeep.destroy_images = function (image_ids, callback) {
	var reqs = requestor.build_requests('images','destroy',image_ids);
	requestor.send_request(reqs,callback);
};

////////////
//SSH Keys//
////////////
brinydeep.all_ssh_keys = function (callback) {
	var req = host_string+ "/ssh_keys/?" + cred_string;
	requestor.send_request(req,callback);
};
//ssh_key Required, Numeric, this is the id of the ssh key you would like to use to display
brinydeep.show_ssh_key = function (ssh_key_ids,callback) {
	var reqs = requestor.build_requests('images','/',ssh_key_ids);
	requestor.send_request(reqs,callback);
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
	requestor.send_request(req,callback);
}

if(!module.parent) {

}