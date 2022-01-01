$(function() {
    $.validator.setDefaults({
        submitHandler: function() {
            getToken();
        }
    });
    $('#loginForm').validate({
        rules: {
            username: {
                required: true,
                // email: true,
                // under development
            },
            password: {
                required: true,
                minlength: 5
            },
            // terms: { required: true },
        },
        messages: {
            username: {
                required: "Please enter a username or email",
                // email: "Please enter a vaild email address"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            // terms: "Please accept our terms"
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

});