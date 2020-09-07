#!/usr/bin/env node

import cli from 'commander';
import fs from 'fs';
import { version } from './package.json';
import notifier from './lib/notifier';
import scraper from './lib/scraper';

notifier();

cli
    .name('dl')
    .version(version, '-v, --version', 'versão atual.')
    .usage('-i <input> -o <output>')
    .option('-i, --input <input>', '(necessário) anbient url.')
    .option('-o, --output <output>', '(necessário) diretório de saída.')
    .helpOption('-h, --help', 'informações de ajuda.')
    .on('--help', () => console.log('\nRepo: https://github.com/ArturMiguel/anbient-dl'))
    .parse(process.argv);

const { input, output } = cli;

if (input && output) {
    if (!fs.existsSync(output)) {
        console.log(`Diretório "${output}" é inválido!`);
        process.exit(1);
    }

    scraper(input, output);
} else {
    console.log('--input e --output são necessários. Use --help para ajuda.');
    process.exit(1);
}
