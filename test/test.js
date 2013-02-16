var should = require('should');
var config = require('../../config.json');
var brinydeep = require('../index.js');

before(function (done) {
		brinydeep.setup(config.client_key, config.api_key);
		done();
});

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
var new_droplet = {
	name: "test1",
	size_id: 66,
	image_id: 25306,
	region_id: 1
};
var id;
// it('should be able to show documentation', function (done) {
// 	brinydeep.documentation(function (e,o) {
// 		o.should.be.a('string');
// 		done();
// 	});
// });

// it('should be able to show active droplets', function (done) {
// 	brinydeep.show_active(function (e,o) {
// 		o.status.should.equal('OK');
// 		o.droplets.length.should.equal(0);
// 		done();
// 	});
// });

// it('should be able to create a droplet', function (done) {
// 	brinydeep.new_droplet(new_droplet,function (e,o) {
// 		o.status.should.equal('OK');
// 		done();
// 	});
// });
// it('should be able to create multiple droplets', function (done) {
// 	brinydeep.new_droplet(new_droplet_multi,function (e,o) {
// 		console.log(e,o)
// 		o.status.should.equal('OK');
// 		o.droplets.length.should.equal(0);
// 		done();
// 	});
// });
// it('should be able to list all ids', function (done) {
// 	brinydeep.get_ids(function (e,o) {
// 		console.log(e,o)
// 		o.length.should.equal(3);
// 		done();
// 	});
// });
it('should be able to destroy all machines', function (done) {
	brinydeep.destroy_all_droplets(function (e,o) {
		o.forEach(function (stat) {
			stat.status.should.equal('OK');
		})
		done();
	});
});
it('should be able to list sizes', function (done) {
	brinydeep.sizes(function (e,o) {
		o.status.should.equal('OK');
		done();
	});
});