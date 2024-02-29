$(document).ready(function () {
	if (!sessionStorage.getItem('modalsShown')) {
		setTimeout(function () {
			$('#welcomeModal').modal('show');
		}, 2000);

		setTimeout(function () {
			$('#welcomeModal').modal('hide');
			$('#secondModal').modal('show');
		}, 8000);

		sessionStorage.setItem('modalsShown', 'true');
	}
});

$('#continueButton').click(function () {
	window.location.href = "{% url 'account_signup' %}";
	$('#secondModal').modal('hide');
});
