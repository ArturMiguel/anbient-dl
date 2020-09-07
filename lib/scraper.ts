import puppeteer from 'puppeteer';
import ora from 'ora';
import colors from 'colors';
import request from 'request';
import fs from 'fs';
import progressBar from './progressBar';

interface Episode {
    name: string;
    url: string;
}

export default async (animeURL: string, outputDir: string) => {
    const spinner = ora(colors.cyan(`Consultando ${animeURL}`)).start();

    try {
        const browser = await puppeteer.launch({
            args: ['--ignore-certificate-errors'] // Anbient fix
        });

        const page = await browser.newPage();
        await page.setRequestInterception(true);
        let blockedResources = ['stylesheet', 'image', 'media', 'font', 'fetch', 'websocket', 'other'];

        page.on('request', (req) => {
            if (blockedResources.includes(req.resourceType())) req.abort();
            else req.continue();
        });

        // Scraping Anbient
        await page.goto(animeURL, {
            waitUntil: 'load'
        });

        const episodeURLs = await page.$$eval('.servidor.zippyshare > li > a', (elements) => elements.map((element) => element.getAttribute('href')));

        if (!episodeURLs.length) {
            spinner.fail('Nenhum episódio encontrado no servidor Zippyshare!');
            process.exit(1);
        }

        const animeName = await page.$eval('#page-title', (element) => element.textContent.replace(/[\\/:*?"<>|]/g, '').replace(/ /g, '_'));

        const episodes: Episode[] = [];

        for (const [index, episodeURL] of episodeURLs.entries()) {
            const episodeIndex = (index + 1).toString().padStart(2, '0');

            spinner.start(colors.cyan(`Consultando arquivo ${episodeIndex}/${episodeURLs.length.toString().padStart(2, '0')} | ${episodeURL}`));

            try {
                // Scraping Zippyshare
                blockedResources = ['stylesheet', 'image', 'media', 'font', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest', 'other'];

                await page.goto(episodeURL, {
                    waitUntil: 'load'
                });

                const href = await page.$eval('#dlbutton', (element) => element.getAttribute('href'));
                const www = `www${episodeURL.split('.')[0].replace(/^\D+/g, '')}`; // http://www92, http://www57, http://www114

                episodes.push({
                    name: `(${episodeIndex}) ${animeName}.mp4`,
                    url: `https://${www}.zippyshare.com${href}`
                });

                spinner.succeed();
            } catch (error) {
                spinner.fail();
            }
        }

        await browser.close();

        // Dowloading episodes
        const download = (episode: Episode) => new Promise((resolve) => {
            request(episode.url)
                .on('response', (response) => {
                    const fileSize = parseInt(response.headers['content-length']);
                    const progress = progressBar(fileSize, episode.name);

                    response.on('data', (chunk) => progress.tick(chunk.length));
                })
                .pipe(fs.createWriteStream(`${outputDir}/${episode.name}`))
                .on('close', () => resolve());
        });

        for (const episode of episodes) await download(episode);

        process.exit(0);
    } catch (error) {
        spinner.fail(error.message);
        process.exit(1);
    }
};
