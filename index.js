#!/usr/bin/env node

const cli = require('commander')
const fs = require('fs')
const download = require('./lib/download')
const { version } = require('./package.json')
require('./lib/notifier')()

cli
.name('dl')
.version(version, '-v, --version', 'versão atual.')
.usage('-i <input> -o <output>')
.option('-i, --input <input>', '(necessário) anbient url.')
.option('-o, --output <output>', '(necessário) diretório de saída.')
.helpOption('-h, --help', 'informações de ajuda.')
.on('--help', () => console.log('\nRepo: https://github.com/ArturMiguel/anbient-dl'))
.parse(process.argv)

const { input, output } = cli
if (input && output) {
    if (!fs.existsSync(output)) {
        console.log(`Diretório inválido "${output}"`)
        process.exit(1)
    }
    download(input, output)
} else {
    console.log('--input e --output são necessários. Use --help para ajuda.')
    process.exit(1)
}