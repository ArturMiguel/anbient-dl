const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

module.exports = () => {
    const notifier = updateNotifier({
        pkg: pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24
    })
    notifier.notify({
        isGlobal: true
    })
}
