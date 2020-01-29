#!/usr/bin/env node

const cli = require('commander')
const fs = require('fs')
const colors = require('colors')
const { download } = require('./lib/download')
const { version } = require('./package.json')
require('./lib/notifier').notifier

cli
.name('dl')
.version(version, '-v, --version', 'versão atual.')
.usage('-i <input> -o <output>')
.option('-i, --input <input>', '(necessário) anbient url.')
.option('-o, --output <output>', '(necessário) diretório de saída.')
.helpOption('-h, --help', 'informações de ajuda.')
.on('--help', () => console.log('\nRepo: https://github.com/ArturMiguel/anbient-dl\n'))
.parse(process.argv)

const { input, output } = cli
if (input && output) {
    if(!fs.existsSync(output)) {
        console.log(colors.red(`Diretório inválido "${output}"`))
        process.exit(1)
    }
    download(input, output)
} else {
    console.log(colors.red('--input e --output são necessários. Use --help para ajuda.'))
    process.exit(1)
}
