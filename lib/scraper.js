const puppeteer = require('puppeteer')
const ora = require('ora')
const colors = require('colors')

module.exports = async (input) => {
    const spinner = ora(colors.cyan(`Consultando "${input}"`)).start()
    try {
        const browser = await puppeteer.launch({
            args: ['--ignore-certificate-errors'] // Anbient
        })
        
        const page = await browser.newPage()
        await page.setRequestInterception(true)
        let blockedResources = ['stylesheet', 'image', 'media', 'font', 'fetch', 'websocket', 'other']

        page.on('request', (req) => {
            if (blockedResources.indexOf(req.resourceType()) !== -1) req.abort()
            else req.continue()
        })

        /* Scraping Anbient */
        await page.goto(input, {
            waitUntil: 'load',
        })
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
            spinner.start(colors.cyan(`Arquivo ${ep}/${urls.length.toString().padStart(2, '0')} | ${url}`))
            try {
                /* Scraping Zippyshare */
                blockedResources = ['stylesheet', 'image', 'media', 'font', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest', 'other']
                await page.goto(url, {
                    waitUntil: 'load'
                })
                const href = await page.$eval('#dlbutton', a => a.getAttribute('href'))
                const www = 'www' + url.split('.')[0].replace(/^\D+/g, '') // http://www92, http://www57, http://www114
                const downloadURL = `https://${www}.zippyshare.com${href}`

                files.push({
                    name: `${name}(${ep}).mp4`,
                    url: downloadURL
                })

                spinner.succeed()
            } catch(error) {
                spinner.fail()
            }
        }
        await browser.close()
        return files
    } catch(error) {
        spinner.fail(error.message)
        process.exit(1)
    }
}