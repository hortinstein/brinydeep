var droplet_ips = '';

function validate_ips(droplet_ids, requestor, droplet_list, callback) {
	var ip_list = [];
	for (i in droplet_list) {
		droplet = droplet_list[i].droplet;
		if (droplet.ip_address != null) {
			droplet_json = {};
			droplet_json.ip_address = droplet_list[i].droplet.ip_address;
			droplet_json.id = droplet_list[i].droplet.id;
			ip_list.push(droplet_json);
		} else {
			setTimeout(function() {
				get_ips(droplet_ids, requestor, callback);
			}, 1000);
			return;
		}
	};
	if (ip_list.length === 1) { //just returns one element for ip_list
		ip_list = ip_list[0];
	}
	callback(null, ip_list)
}

function get_ips(droplet_ids, requestor, callback) {
	var reqs = requestor.build_requests('droplets', '', droplet_ids);
	requestor.send_request(reqs, function(e, o) {
		if (e) {
			callback(e, o);
		} else {
			if (!(Array.isArray(o))) { //looks cleaner with this slight hack
				o = [o];
			};
			validate_ips(droplet_ids, requestor, o, callback);
		}
	});
};

module.exports = get_ips;