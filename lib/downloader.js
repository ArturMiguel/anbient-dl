const scraper = require('./scraper')
const request = require('request')
const fs = require('fs')
const progressBar = require('./progress-bar')

module.exports = async (input, output) => {
    const files = await scraper(input)
    const download = (downloadURL, fileName) => {
        return new Promise((resolve) => {
            request(downloadURL)
            .on('response', (response) => {
                const fileSize = parseInt(response.headers['content-length'])
                const bar = progressBar(fileSize, fileName)
                response.on('data', chunk => bar.tick(chunk.length))
            })
            .pipe(fs.createWriteStream(`${output}/${fileName}`))
            .on('close', () => resolve())
        })
    }
    for (const file of files) await download(file.url, file.name)
}
