# brinydeep
=========

node.js wrapper for [Digital Ocean's API](https://api.digitalocean.com)
# install

With [npm](https://npmjs.org) do:

```
npm install brinydeep
```


# example

``` js
var brinydeep = require('brinydeep');
brinydeep.setup(CLIENT_KEY, API_KEY);
var new_droplet = {
	name: "test1",
	size_id: 66,
	image_id: 25306,
	region_id: 1
};
brinydeep.new_droplets(new_droplet,function (e,o) {
	console.log(o);
});
brinydeep.get_ids(function (e,o) {
	temp_ids = o;
});

```

# example with multiple machines

``` js
var new_droplet_multi = {
	droplets: [
		{
			name: "test2",
			size_id: 66,
			image_id: 25306,
			region_id: 1
		},
		{
			name: "test3",
			size_id: 66,
			image_id: 25306,
			region_id: 1
		}
	]
};
var temp_ids = '';

brinydeep.new_droplets(new_droplet_multi,function (e,o) {
	console.log(o);
});
brinydeep.get_ids(function (e,o) {
	temp_ids = o;
});

```


# API methods

``` js
var brinydeep = require('brinydeep').setup(CLIENT_KEY, API_KEY);
```

This sets up the API for use

## var brinydeep.documentation(callback)

returns the html for digitaloceans api 

## var brinydeep.get_ids(callback)

returns an array of all the ids 

## var brinydeep.show_active(callback)

returns active ids in Digital Oceans API form, (all functions taking IDs can be passed an array of IDs, and will return an array of seperate JSON responses).  

'''
{"status":"OK","droplets":[{"backups_active":null,"id":100823,"image_id":420,"name":"test222","region_id":1,"size_id":33,"status":"active"}]}
'''

## var brinydeep.show_droplets(id,callback) or brinydeep.show_droplets([id,...],callback)

returns active ids in Digital Oceans API form

'''
{"status":"OK","droplets":[{"backups_active":null,"id":100823,"image_id":420,"name":"test222","region_id":1,"size_id":33,"status":"active"}]}
'''

## var brinydeep.new_droplets = function (options,callback)

creates a new droplet

Options:
*name Required, String, this is the name of the droplet - must be formatted by hostname rules
*size_id Required, Numeric, this is the id of the size you would like the droplet created at
*image_id Required, Numeric, this is the id of the image you would like the droplet created with
*region_id Required, Numeric, this is the id of the region you would like your server in IE: US/Amsterdam
*ssh_key_ids Optional, Numeric CSV, comma separated list of ssh_key_ids that you would like to be added to the server

'''
{"status":"OK","droplet":{"id":100824,"name":"test","image_id":419,"size_id":32,"event_id":7499}}
'''

## var brinydeep.reboot(ids,callback)

reboots droplets

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.power_cycle(ids,callback)

power cycles droplets

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.shut_down(ids,callback)

shuts off droplets

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.power_off(ids,callback)

powers off droplets

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.power_on(ids,callback)

powers on droplets

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.reset_root_password(ids,callback)

This method will reset the root password for a droplet. Please be aware that this will reboot the droplet to allow resetting the password.

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.resize(ids,size_id,callback)

This method will resize a droplet based on id size

'''
{"status":"OK","event_id":7501}
'''

## var brinydeep.snapshot(id,name,callback)

This method will take a snapshot of a droplet (this will only take one id as an arg)

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.restore(ids,name,callback)

This method allows you to restore a droplet with a previous image or snapshot. This will be a mirror copy of the image or snapshot to your droplet. Be sure you have backed up any necessary information prior to restore.

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.rebuild(ids,image_id,callback)

This method allows you to reinstall a droplet with a default image. This is useful if you want to start again but retain the same IP address for your droplet.

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.enable_backups(ids,callback)

This method enables automatic backups which run in the background daily to backup your droplet's data.

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.disable_backups(ids,callback)

This method disables automatic backups.

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.destroy_all_droplets(callback)

This method destroys all droplets.

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.destroy_all_droplets(ids,callback)

This method destroys droplets provided their ids.

'''
{"status":"OK","event_id":7504}
'''

## var brinydeep.regions(callback)

Returns all regions.

'''
{"status":"OK","regions":[{"id":1,"name":"New York 1"},{"id":2,"name":"Amsterdam 1"}]}
'''


## var brinydeep.all_images(callback)

Returns all images.

'''
{"status":"OK","images":[{"id":429,"name":"Real Backup 10242011","distribution":"Ubuntu"},{"id":430,"name":"test233","distribution":"Ubuntu"},{"id":431,"name":"test888","distribution":"Ubuntu"},{"id":442,"name":"tesah22","distribution":"Ubuntu"},{"id":443,"name":"testah33","distribution":"Ubuntu"},{"id":444,"name":"testah44","distribution":"Ubuntu"},{"id":447,"name":"ahtest55","distribution":"Ubuntu"},{"id":448,"name":"ahtest66","distribution":"Ubuntu"},{"id":449,"name":"ahtest77","distribution":"Ubuntu"},{"id":458,"name":"Rails3-1Ruby1-9-2","distribution":"Ubuntu"},{"id":466,"name":"NYTD Backup 1-18-2012","distribution":"Ubuntu"},{"id":478,"name":"NLP Final","distribution":"Ubuntu"},{"id":540,"name":"API - Final","distribution":"Ubuntu"},{"id":577,"name":"test1-1","distribution":"Ubuntu"},{"id":578,"name":"alec snapshot1","distribution":"Ubuntu"}]}
'''

## var brinydeep.show_images(image_ids,callback)

Shows images for given ids.

'''
{"status":"OK","image":{"id":429,"name":"Real Backup 10242011","distribution":"Ubuntu"}}
'''

## var brinydeep.destroy_images(image_ids,callback)

destroys images for given ids.

'''
{"status":"OK","image":{"id":429,"name":"Real Backup 10242011","distribution":"Ubuntu"}}
'''

## var brinydeep.all_ssh_keys(callback)

shows all ssh keys

'''
{"status":"OK","ssh_keys":[{"id":10,"name":"office-imac"},{"id":11,"name":"macbook-air"}]}
'''

## var brinydeep.show_ssh_keys(ids,callback)

shows all ssh keys

'''
{"status":"OK","ssh_keys":[{"id":10,"name":"office-imac"},{"id":11,"name":"macbook-air"}]}
'''

## var brinydeep.sizes(ids,callback)

shows all different sizes 

'''
{"status":"OK","sizes":[{"id":33,"name":"512MB"},{"id":34,"name":"1GB"},{"id":35,"name":"2GB"},{"id":36,"name":"4GB"},{"id":37,"name":"8GB"},{"id":38,"name":"16GB"}]}
'''

# license

MIT