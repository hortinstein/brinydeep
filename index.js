var request = require('request');
var argv = require('optimist');


var brinydeep = {};
module.exports = brinydeep;

var c_api_key= "";
var c_client_id = ""; 
var host_string = "https://api.digitalocean.com/"

brinydeep.setup = function  (client_id,api_key) {
	c_api_key = client_id;
	c_client_id = client_id;
}



/////////////////
//Documentation//
/////////////////
brinydeep.documentation = function  (client_id,api_key,callback) {
	var req = host_string+ "?client_id=" + client_id 
		+ "&api_key=" + api_key;

};


////////////
//Droplets//
////////////
brinydeep.show_active = function (client_id,api_key,callback) {
	
}

brinydeep.show = function (client_id,api_key,callback) {
	
};

// name Required, String, this is the name of the droplet - must be formatted by hostname rules
// size_id Required, Numeric, this is the id of the size you would like the droplet created at
// image_id Required, Numeric, this is the id of the image you would like the droplet created with
// region_id Required, Numeric, this is the id of the region you would like your server in IE: US/Amsterdam
// ssh_key_ids Optional, Numeric CSV, comma separated list of ssh_key_ids that you would like to be added to the server
brinydeep.new_droplet = function (options,callback) {
	
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
//droplet_id(s) Required, Integer, this is the id of your droplet
brinydeep.destroy = function (droplet_ids,callback) {
	
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
	
}
