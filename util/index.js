const moment = require('moment')

module.exports = {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    nameCharAt(firstName, lastName) {
        if (firstName.charAt(1) == "'") {
            return `${firstName.charAt(0) + firstName.charAt(1)} ${lastName.charAt(0)}`
        } else if (lastName.charAt(1) == "'") {
            return `${firstName.charAt(0)} ${lastName.charAt(0) + lastName.charAt(1)}`
        }
        return `${firstName.charAt(0)} ${lastName.charAt(0)}`
    },
    formatDate(date) {
        return moment(date).fromNow()
    },
}