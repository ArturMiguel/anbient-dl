<a href='https://www.npmjs.com/package/anbient-dl'>
    <img src='https://img.shields.io/npm/v/anbient-dl'>
</a>
<a href='https://www.npmjs.com/package/anbient-dl'>
    <img src='https://img.shields.io/npm/dt/anbient-dl'>
</a>

# anbient-dl

A função do `anbient-dl` é automatizar a coleta das urls de download no Anbient e posteriormente obter os arquivos de cada uma; hospedados no Zippyshare. O formato de saída dos arquivos é `.mp4`.

## Requisitos

- [Node.js](https://nodejs.org/en/) v12+

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

O `anbient-dl` não tem nenhuma relação interna com os sites Anbient e Zippyshare. A utilização da ferramenta poderá ter como consequência a violação dos Termos de Serviço desses sites, sendo assim, o usuário tem total responsabilidade dos resultados consequentes desse uso.