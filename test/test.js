var should = require('should');
var config = require('../../config.json');
var brinydeep = require('../index.js');
var image_num = 6374128;
var region_id = 1;
before(function(done) {
	brinydeep.setup(config.client_key, config.api_key);
    brinydeep.all_images(function(e,o){
       //image_num = o.images[3].id;
       //region_id = o.images[3].regions[0];
       //console.log(e,o);
        done();
    });
});

var temp_ids = '';
var new_droplet_multi = {
	droplets: [{
		name: "test2",
		size_id: 66,
		image_id: image_num,
		region_id: 1
	}, {
		name: "test3",
		size_id: 66,
		image_id: image_num,
		region_id: 1
	}]
};
var new_droplet = {
	name: "test1",
	size_id: 66,
	image_id: image_num,
	region_id: 1
};

var test_droplet_ids = 0;

describe('documentation', function() {

	it('should be able to display', function(done) {
		brinydeep.documentation(function(e, o) {
			o.should.be.a('string');
			done();
		});
	});

	it('should be able to list sizes', function(done) {
		brinydeep.sizes(function(e, o) {
			o.status.should.equal('OK');
			//console.log(o);
			done();
		});
	});

});

describe('droplet creation', function() {

	it('should be able to create a single droplet', function(done) {
		brinydeep.new_droplets(new_droplet, function(e, o) {
            console.log(e,o);
			o.status.should.equal('OK');
			done();
		});
	});

	it('should fail to create a single droplet with invalid size', function(done) {
		new_droplet.size_id = 2312312;
		brinydeep.new_droplets(new_droplet, function(e, o) {
			e.should.equal('ERROR');
			done();
		});
	});

	it('should be able to create multiple droplets', function(done) {
		brinydeep.new_droplets(new_droplet_multi, function(e, o) {
			o.status.should.equal('OK');
			done();
		});
	});

});

describe('bulk droplet info', function() {

	it('should be able to show active droplets', function(done) {
		brinydeep.show_active(function(e, o) {
			o.status.should.equal('OK');
			//o.droplets.length.should.equal(1);
			//console.log(o);
			done();
		});
	});

	it('should be able to list all droplet IDs created in current session', function(done) {
		test_droplet_ids = brinydeep.get_ids_created_this_session();
		test_droplet_ids.length.should.equal(3);
		//console.log(test_droplet_ids);
		done();
	});
	it('should be able to provide one droplet IPs', function(done) {
		this.timeout(50 * 1000); //unclear how long this should take this will disable the timeout
		brinydeep.get_ips(test_droplet_ids[0],function (e,o) {
			console.log(o);
			o.ip_address.should.not.equal(null);
			done();
		});
	});

	it('should be able to provide all droplet IP', function(done) {
		this.timeout(50 * 1000); //unclear how long this should take this will disable the timeout
		brinydeep.get_ips(test_droplet_ids,function (e,o) {
			o.length.should.equal(3);
			console.log(o);
			o[0].ip_address.should.not.equal(null);
			o[1].ip_address.should.not.equal(null);
			o[2].ip_address.should.not.equal(null);
			done();
		});
	});


	it('should be able to list all ids', function(done) {
		brinydeep.get_ids(function(e, o) {
			temp_ids = o;
            console.log(o);
			//o.length.should.equal(3);
			done();
		});
	});

});

describe('droplet functions', function() {

	before(function(done) { //timeout function to allow for droplet init
		console.log('\ntest timeout to allow droplet creation\n');
		this.timeout(50 * 1000);
		setTimeout(done, 50 * 990);
	});

	it('should be able to show droplet by ID', function(done) {
		brinydeep.show_droplets(test_droplet_ids[0], function(e, o) {
			//console.log(o);
			o.status.should.equal('OK');
			done();
		});
	});

	it('should be able to destroy test droplets', function(done) {
		brinydeep.destroy(test_droplet_ids, function(e, o) {
			console.log(e,o);
			o[0].status.should.equal('OK');
			o[1].status.should.equal('OK');
			o[2].status.should.equal('OK');
			done();
		});
	});

});

// it('should be able to destroy all machines', function (done) {
// 	brinydeep.destroy_all_droplets(function (e,o) {
// 		o.forEach(function (stat) {
// 			stat.status.should.equal('OK');
// 		})
// 		done();
// 	});
// });