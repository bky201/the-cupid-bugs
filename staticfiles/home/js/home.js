document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var mylocation = document.getElementById('locations');
    if (mylocation) {

      var locationOne = document.getElementById('location_one').innerHTML;
      var locationTwo = document.getElementById('location_two').innerHTML;

      $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q=' + locationOne, function (data) {
        var lat1 = data[0].lat;
        var lon1 = data[0].lon;
        var marker1 = L.marker([lat1, lon1]).addTo(map);

        $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q=' + locationTwo, function (data) {
          var lat2 = data[0].lat;
          var lon2 = data[0].lon;
          var marker2 = L.marker([lat2, lon2]).addTo(map);

          var polyline = L.polyline([[lat1, lon1], [lat2, lon2]], { color: 'red' }).addTo(map);

          var bounds = L.latLngBounds([marker1.getLatLng(), marker2.getLatLng()]);
          map.fitBounds(bounds);
        });
      });
    }

    document.querySelectorAll('.latitude').forEach(function (container) {
      var locationOneLatElement = container.querySelector('#location_one_latitude');
      var locationOneLonElement = container.querySelector('#location_one_longitude');
      var locationTwoLatElement = container.querySelector('#location_two_latitude');
      var locationTwoLonElement = container.querySelector('#location_two_longitude');

      if (locationOneLatElement && locationOneLonElement && locationTwoLatElement && locationTwoLonElement) {
        var locationOneLat = locationOneLatElement.innerText;
        var locationOneLon = locationOneLonElement.innerText;
        var locationTwoLat = locationTwoLatElement.innerText;
        var locationTwoLon = locationTwoLonElement.innerText;

        var locationOneLatLng = [parseFloat(locationOneLat), parseFloat(locationOneLon)];
        var locationTwoLatLng = [parseFloat(locationTwoLat), parseFloat(locationTwoLon)];

        var marker1 = L.marker(locationOneLatLng).addTo(map)
          .bindPopup('Location One: ' + locationOneLatLng).openPopup();
        var marker2 = L.marker(locationTwoLatLng).addTo(map)
          .bindPopup('Location Two: ' + locationTwoLatLng).openPopup();

        var polyline = L.polyline([[locationOneLat, locationOneLon], [locationTwoLat, locationTwoLon]], { color: 'blue' }).addTo(map);
      } else {
        console.error('One or more location elements not found in the container:', container);
      }
    });

    var scheduledDateStr = document.getElementById('countDown').innerHTML.trim(); // Remove leading/trailing whitespaces

    scheduledDateStr = scheduledDateStr.replace('.', '').replace('p.m.', 'PM').replace('a.m.', ' AM');

    var scheduledDate = new Date(scheduledDateStr);

    function updateCountdown() {
      var now = new Date();
      var difference = scheduledDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        document.getElementById('countdownTimer').innerHTML = 'Scheduled date has passed';
        return;
      }

      var days = Math.floor(difference / (1000 * 60 * 60 * 24));
      var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((difference % (1000 * 60)) / 1000);

      var countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
      document.getElementById('countdownTimer').innerHTML = countdown;
    }

    updateCountdown();

    var timer = setInterval(updateCountdown, 1000);

  });