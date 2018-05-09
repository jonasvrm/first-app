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
            var errorAlert = "<div class='alert alert-danger'>";

            errors.forEach(function (error) {
                errorAlert = errorAlert + "<p>" + error + "</p>";
            });

            errorAlert = errorAlert + "</div>";

            return errorAlert;
        }
    }
}