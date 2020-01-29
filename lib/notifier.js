const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

const notifier = updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24
})

exports.notifier = notifier.notify({
    isGlobal: true
})
