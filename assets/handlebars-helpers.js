var Handlebars = require('express-handlebars');

// assets/handlebars-helpers.js

module.exports = {
    convertGuid: function (id) {
        return parseInt(id, 15);
    },
    select: function (value, options) {
        return options.fn(this)
            .split('\n')
            .map(function (v) {
                var t = 'value="' + value + '"'
                return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
    },
    validationError: function (errors) {
        
        if (errors.length > 0) {
            var errorAlert = "<div class='alert alert-danger fade' data-dismiss='alert'>";
            errorAlert = errorAlert + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span> </button><ul>";

            errors.forEach(function (error) {
                errorAlert = errorAlert + "<li>" + error + "</li>";
                errorAlert = errorAlert + "<li>" + error + "</li>";
            });

            errorAlert = errorAlert + "</ul></div>";

            return errorAlert;
        }
    }
}