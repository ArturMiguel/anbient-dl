<a href='https://www.npmjs.com/package/anbient-dl'>
    <img src='https://img.shields.io/npm/v/anbient-dl'>
</a>
<a href='https://www.npmjs.com/package/anbient-dl'>
    <img src='https://img.shields.io/npm/dt/anbient-dl'>
</a>

# anbient-dl

A função do `anbient-dl` é automatizar a coleta das urls de download no Anbient e posteriormente obter os arquivos de cada uma; hospedados no Zippyshare. O formato de saída dos arquivos é `.mp4`.

## Requisitos

- [Node.js](https://nodejs.org/en/)

## Instalação
`npm install -g anbient-dl`

## Utilização

#### CLI
- `-v, --version` versão atual.
- `-i, --input` (necessário) Anbient url.
- `-o, --output` (necessário) diretório de saída. 
- `-h, --help` informações de ajuda.

#### Exemplo
`dl -i https://www.anbient.com/Tv/another -o C:\Users\User\Desktop\Another`

![exemplo](https://i.imgur.com/TWNp5O7.jpg)

Obs: Utilize aspas em diretórios com espaços.

## Aviso legal

Caso você seja proprietário do Anbient ou Zippyshare e considera que o `anbient-dl` viola seu Termo de Privacidade, escreva uma *[issue](https://github.com/ArturMiguel/anbient-dl/issues)* sobre a violação.