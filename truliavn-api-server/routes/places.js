module.exports = function (router, connection, CITIES, DISTRICTS, WARDS) {

// Initial

// city
connection.query(
	'SELECT * FROM Cities',
	[],
	function (err, cities, fields) {
		if (err){
			console.log(err);
			return;
		}
		for (var i = 0; i < cities.length; i++) {
			CITIES[cities[i].id] = {cityName: cities[i].cityName};
		}
		console.log('city ok.');
	}
)

// district
connection.query(
	'SELECT * FROM Districts',
	[],
	function (err, districts, fields) {
		if (err){
			console.log(err);
			return;
		}
		for (var i = 0; i < districts.length; i++) {
			DISTRICTS[districts[i].id] = {
				cityId: districts[i].cityId, 
				districtName: districts[i].districtName
			}
		}
		console.log('district ok.');
	}
)

// ward
connection.query(
	'SELECT * FROM Wards',
	[],
	function (err, wards, fields) {
		if (err){
			console.log(err);
			return;
		}
		for (var i = 0; i < wards.length; i++) {
			WARDS[wards[i].id] = {
				districtId: wards[i].districtId,
				wardName: wards[i].wardName
			}
		}
		console.log('ward ok.');
	}
)

/**
 * ======================
 *
 * API about places
 *
 * ======================
 */

router.get('/cities', function (req, res) {
	res.json({
		status: 'success',
		cities: CITIES
	})
})

router.get('/districts', function (req, res) {
	var result = {};
	if (req.query.city){
		for (i in DISTRICTS){
			if (DISTRICTS[i].cityId == req.query.city){
				result[i] = DISTRICTS[i];
			}
		}
	}
	else{
		result = DISTRICTS;
	}
	res.json({
		status: 'success',
		districts: result
	})
})

router.get('/wards', function (req, res) {
	var result = {};
	if (req.query.district){
		for (i in WARDS){
			if (WARDS[i].districtId == req.query.district){
				result[i] = WARDS[i];
			}
		}
	}
	else{
		result = WARDS;
	}
	res.json({
		status: 'success',
		wards: result
	})
})

}