$(document).ready(function () {
    if (!sessionStorage.getItem('modalsShown')) {
        setTimeout(function () {
            $('#welcomeModal').modal('show');
        }, 3000);

        setTimeout(function () {
            $('#welcomeModal').modal('hide');
            $('#secondModal').modal('show');
        }, 10000);

        sessionStorage.setItem('modalsShown', 'true');
    }
});

$('#continueButton').click(function () {
    window.location.href = "{% url 'account_signup' %}";
    $('#secondModal').modal('hide');
});