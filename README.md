<a href='https://www.npmjs.com/package/anbient-dl'>
    <img src='https://img.shields.io/npm/v/anbient-dl'>
</a>
<a href='https://www.npmjs.com/package/anbient-dl'>
    <img src='https://img.shields.io/npm/dt/anbient-dl'>
</a>

# anbient-dl

A função do `anbient-dl` é automatizar a coleta das urls de download no Anbient e posteriormente obter os arquivos de cada uma; hospedados no Zippyshare. O formato de saída dos arquivos é `.mp4`.

## Requisitos

- [Node.js](https://nodejs.org/en/) v12

## Instalação

```
npm install -g anbient-dl
```

## Utilização

#### CLI

- `dl [...]`

#### Args
- `-v, --version` versão atual.
- `-i, --input` (necessário) Anbient url.
- `-o, --output` (necessário) diretório de saída. 
- `-h, --help` informações de ajuda.

#### Exemplo
```
dl -i https://www.anbient.com/Tv/another -o "C:\Users\User\Videos\Another"
```

<img src='./assets/downloading.jpg'>

## Versão Beta

Na versão `1.2.0-beta.0` está incluído um menu para selecionar os episódios que deseja baixar:

<img src='./assets/menu.jpg'>

A utilização continua a mesma, para instalar, digite:

```
npm install -g anbient-dl@beta
```

## Aviso legal

O `anbient-dl` não tem nenhuma relação com o Anbient e o Zippyshare. O uso da ferramenta poderá violar os Termos de Serviço desses sites, sendo de total responsabilidade do usuário.