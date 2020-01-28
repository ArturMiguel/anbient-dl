#!/usr/bin/env node

const args = require('commander')
const fs = require('fs')
const colors = require('colors')
const { download } = require('./lib/download')
const { version } = require('./package.json')

args
.name('anbient-downloader')
.version(version)
.option('-i, --input <input>', '(necessário) anbient url')
.option('-o, --output <output>', '(necessário) diretório de saída')
.parse(process.argv)

const { input, output } = args;
if (input && output) {
    if(!fs.existsSync(output)) console.log(colors.red(`Diretório não existe "${output}"`))
    else download(input, output)
} else {
    console.log(colors.red('--input e --output são necessários. Digite --help para ajuda.'))
}
