import puppeteer from 'puppeteer';
import ora from 'ora';
import colors from 'colors';
import request from 'request';
import fs from 'fs';
import progressBar from './progressBar';
import { Episode } from './models/Episode';
import episodeSelection from './episode-selection'

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

    const episodeURLs = await page.$$eval('.servidor.zippyshare > li > a', (elements: Element[]) => {
      return elements.map(element => element.getAttribute('href'));
    });

    if (!episodeURLs.length) {
      spinner.fail('Nenhum episódio encontrado no servidor Zippyshare!');
      process.exit(1);
    }

    const animeName = await page.$eval('#page-title', (element: Element) => element.textContent.replace(/[\\/:*?"<>|]/g, '').replace(/ /g, '_'));

    spinner.succeed();

    const episodesTemp: Episode[] = episodeURLs.map((url, index) => {
      const episodeIndex = (index + 1).toString().padStart(2, '0');
      return {
        name: `${episodeIndex}_${animeName}.mp4`,
        url: url
      }
    });

    const selectedEpisodes: Episode[] = await episodeSelection(episodesTemp);

    for (const episode of selectedEpisodes) {
      spinner.start(colors.cyan(`Consultando episódio ${episode.name} | ${episode.url}`));

      try {
        // Scraping Zippyshare
        blockedResources = ['stylesheet', 'image', 'media', 'font', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest', 'other'];

        await page.goto(episode.url, {
          waitUntil: 'load'
        });

        const href = await page.$eval('#dlbutton', (element: Element) => element.getAttribute('href'));
        const www = `www${episode.url.split('.')[0].replace(/^\D+/g, '')}`; // http://www92, http://www57, http://www114
        episode.url = `https://${www}.zippyshare.com${href}`;

        spinner.succeed();
      } catch (error) {
        spinner.fail();
      }
    }
    await browser.close();

    for await (const episode of selectedEpisodes) await download(episode, outputDir);

    process.exit(0);
  } catch (error) {
    spinner.fail(error.message);
    process.exit(1);
  }
};

function download(episode: Episode, outputDir: string) {
  return new Promise((resolve) => {
    request(episode.url)
      .on('response', (response) => {
        const fileSize = parseInt(response.headers['content-length']);
        const progress = progressBar(fileSize, episode.name);
        response.on('data', (chunk) => progress.tick(chunk.length));
      })
      .pipe(fs.createWriteStream(`${outputDir}/${episode.name}`))
      .on('close', () => resolve());
  });
}
