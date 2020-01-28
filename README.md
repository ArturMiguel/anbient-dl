<div>
    <a href='https://www.npmjs.com/package/anbient-dl'>
        <img src='https://img.shields.io/npm/v/anbient-dl?color=orange&label=npm' alt='anbient-dl-version'>
    </a>
</div>

# Anbient downloader

Baixe animes da lista plana do site [Anbient](https://www.anbient.com/).

![imagem-não-encontrada](https://i.imgur.com/bpszYqW.png)

## Instalação
`npm install -g anbient-dl`

## CLI
- `-V, --version` versão atual.
- `-i, --input` (necessário) anbient url.
- `-o, --output` (necessário) diretório de saída. 
- `-h, --help` informações de ajuda.

## Exemplos
`dl -i https://www.anbient.com/Tv/another -o C:\Users\User\Desktop\Another`

`dl -i https://www.anbient.com/anime/Kono-Subarashii-Sekai-ni-Shukufuku-wo -o "C:\Users\User\Desktop\Kono Subarashii Sekai ni Shukufuku o!"` (diretório com espaços)

## Comentários

- A versão atual não é estável.
- Por agora, apenas *links* do Zippyshare são suportados.
- Esse projeto é para uso pessoal e realiza *[web scraping](https://pt.wikipedia.org/wiki/Coleta_de_dados_web)*. Não abuse do uso.