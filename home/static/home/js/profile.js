document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('profile-form');

    function updateCoordinates(locationField, latField, lonField) {
      var location = locationField.value;
      $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q=' + location, function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        $(latField).val(lat);
        $(lonField).val(lon);
      }).fail(function () {
        console.error('Failed to retrieve coordinates.');
      });
    }

    $('#id_location_one').on('change', function () {
      updateCoordinates(this, '#id_location_one_latitude', '#id_location_one_longitude');
    });

    $('#id_location_two').on('change', function () {
      updateCoordinates(this, '#id_location_two_latitude', '#id_location_two_longitude');
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the form from submitting normally
      var locationOne = form.elements['location_one'].value;
      var locationTwo = form.elements['location_two'].value;
      convertLocationToCoordinates(locationOne, locationTwo);
    });

    function convertLocationToCoordinates(locationOne, locationTwo) {
      $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q=' + locationOne, function (data) {
        var lat1 = data[0].lat;
        var lon1 = data[0].lon;
        $('#id_location_one_latitude').val(lat1);
        $('#id_location_one_longitude').val(lon1);
        $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q=' + locationTwo, function (data) {
          var lat2 = data[0].lat;
          var lon2 = data[0].lon;
          $('#id_location_two_latitude').val(lat2);
          $('#id_location_two_longitude').val(lon2);
          form.submit();
        });
      }).fail(function () {
        console.error('Failed to retrieve coordinates.');
      });
    }
  });