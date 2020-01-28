const colors = require('colors')
const ProgressBar = require('progress')

exports.progressBar = (fileSize, fileName) => {
    return new ProgressBar(`${colors.cyan(`${fileName} [:bar] :percent | ~${(fileSize / 1024 / 1024).toFixed(2)}MB | :etas`)}`, {
        total: fileSize,
        complete: '■',
        incomplete: '.',
        width: 25
    })
}
