const puppeteer = require('puppeteer')
const request = require('request')
const fs = require('fs')
const ora = require('ora')
const { progressBar } = require('./progress-bar')
const colors = require('colors')

async function scraping(input) {
    const spinner = ora(colors.cyan(`Consultando "${input}"`)).start()
    try {
        const browser = await puppeteer.launch({ args: ['--ignore-certificate-errors'] })
        const page = await browser.newPage()
        // Scraping Anbient
        await page.goto(input, { waitUntil: 'load', timeout: 0 })
        const urls = await page.$$eval('.servidor.zippyshare > li > a', e => e.map(a => a.href))
        if (urls.length === 0) {
            spinner.fail('O host Zippyshare não foi encontrado!')
            process.exit(1)
        }
        let name = await page.$eval('#page-title', h1 => h1.textContent)
        name = name.replace(/[\\/:*?"<>|]/g, '').replace(/ /g, '_')
        const files = []
        for (const [index, url] of urls.entries()) {
            let ep = (index + 1).toString().padStart(2, '0')
            spinner.start(colors.cyan(`Verificando arquivo(s) ${ep}/${urls.length.toString().padStart(2, '0')} | ${url}`))
            try {
                // Scraping Zippyshare
                await page.goto(url, { waitUntil: 'load', timeout: 0 })
                const href = await page.$eval('#dlbutton', a => a.getAttribute('href'))
                const www = 'www' + url.split('.')[0].replace(/^\D+/g, '') // http://www92, http://www57, http://www114
                const downloadURL = `https://${www}.zippyshare.com${href}`
                files.push({ name: `${name}(${ep}).mp4`, url: downloadURL })
                spinner.succeed()
            } catch (error) {
                spinner.fail()
            }
        }
        await browser.close()
        return files
    } catch (error) {
        spinner.fail(error.message)
        process.exit(1)
    }
}

async function download(input, output) {
    const files = await scraping(input)
    const d = (downloadURL, fileName) => {
        return new Promise((resolve) => {
            request(downloadURL).on('response', (response) => {
                const fileSize = parseInt(response.headers['content-length'])
                const bar = progressBar(fileSize, fileName)
                response.on('data', chunk => bar.tick(chunk.length))
            }).pipe(fs.createWriteStream(`${output}/${fileName}`)).on('close', () => resolve())
        })
    }
    for (const file of files) await d(file.url, file.name)
}

exports.download = download
