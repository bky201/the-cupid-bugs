document.addEventListener('DOMContentLoaded', function () {
	var map = L.map('map').setView([0, 0], 2);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	document.querySelectorAll('.latitude').forEach(function (container) {
		var locationOneLatElement = container.querySelector('#location_one_latitude');
		var locationOneLonElement = container.querySelector('#location_one_longitude');
		var locationTwoLatElement = container.querySelector('#location_two_latitude');
		var locationTwoLonElement = container.querySelector('#location_two_longitude');

		if (
			locationOneLatElement &&
			locationOneLonElement &&
			locationTwoLatElement &&
			locationTwoLonElement
		) {
			var locationOneLat = locationOneLatElement.innerText;
			var locationOneLon = locationOneLonElement.innerText;
			var locationTwoLat = locationTwoLatElement.innerText;
			var locationTwoLon = locationTwoLonElement.innerText;

			var locationOneLatLng = [parseFloat(locationOneLat), parseFloat(locationOneLon)];
			var locationTwoLatLng = [parseFloat(locationTwoLat), parseFloat(locationTwoLon)];

			var marker1 = L.marker(locationOneLatLng)
				.addTo(map)
				.bindPopup('Location One: ' + locationOneLatLng)
				.openPopup();
			var marker2 = L.marker(locationTwoLatLng)
				.addTo(map)
				.bindPopup('Location Two: ' + locationTwoLatLng)
				.openPopup();

			var polyline = L.polyline(
				[
					[locationOneLat, locationOneLon],
					[locationTwoLat, locationTwoLon],
				],
				{ color: 'blue' }
			).addTo(map);
		} else {
			console.error(
				'One or more location elements not found in the container:',
				container
			);
		}
	});
});
