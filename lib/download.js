const puppeteer = require('puppeteer')
const request = require('request')
const fs = require('fs')
const ora = require('ora')
const { progressBar } = require('./progress-bar')
const colors = require('colors')

async function scraping(input) {
    const spinner = ora(colors.cyan(`Aguardando "${input}"`)).start()
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // Scraping Anbient
    await page.goto(input, { waitUntil: 'load', timeout: 0 })
    const files = []
    const urls = await page.$$eval('.servidor.zippyshare > li > a', e => e.map(a => a.href))
    if (urls.length === 0) {
        spinner.stop()
        console.log(colors.red('Zippyshare não foi encontrado!'))
    } else {
        for (const [index, url] of urls.entries()) {
            try {
                spinner.text = (colors.cyan(`Coletando informações de arquivo | ${url} | ${index}/${urls.length}`))
                // Scraping Zippyshare
                await page.goto(url, { waitUntil: 'load', timeout: 0 })
                const href = await page.$eval('#dlbutton', a => a.getAttribute('href'))
                const www = 'www' + url.split('.')[0].replace(/^\D+/g, '') // http://www92, http://www57, http://www114
                const downloadURL = `https://${www}.zippyshare.com${href}`
                let name = await page.$eval('meta[name="twitter:title"]', m => m.getAttribute('content'))
                name = name.replace('mkv ', 'mp4')
                files.push({ name: name, url: downloadURL })
            } catch (error) {
                spinner.stop()
                if (error.message === 'Error: failed to find element matching selector "#dlbutton"') console.log(colors.red(`O arquivo de "${url}" falhou na verificação.`))
                else console.log(colors.red(error.message))
            }
        }
    }
    await browser.close()
    spinner.stop()
    return files
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
