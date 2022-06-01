# 📝 Papelaria da Lu 

## Introdução
Projeto final desenvolvido como requisito parcial para aprovação no programa de aceleração em Node.js [Luiza Code 4ª edição.](https://conteudo.carreiras.magazineluiza.com.br/luiza-code-4-edicao-inscricao)

O desafio proposto foi o de desenvolver um módulo de lista de desejos dos produtos de um e-commerce de itens de papelaria para seus clientes.

## 🎯 Features

* Gerenciamento de clientes
* Gerenciamento de produtos
* Gerenciamento de listas de desejos

## 📖 Guia de instalação

Clone este repositório utilizando o comando:
```
git clone https://github.com/LuizaCode4ed-Grupo1/PapelariaDaLu.git
```
Instale as dependências:
```
npm install
```

## 🚀 Inicializando

Para inicializar o servidor, utilize o comando:
```
npm start
```
Conecte na API utilizando a porta 3000.

## 💻 Banco de Dados e Coleções MongoDB

* clientes
* listasdesejos
* produtos

Comando para a criação do banco de dados com a coleção clientes
```
const database = 'papelaria-da-lu';
const collection = 'clientes';
use(database);
db.createCollection(collection);
```
Comando exemplo para a criação das demais coleções do banco de dados
```
use('papelaria-da-lu');
db.createCollection('produtos');
```

## 🚩 API Endpoints

Todos os endpoints foram documentados com o swagger, que pode ser acessado através do link: 
http://localhost:3000/docs/

## 🖥️ Tecnologias utilizadas

* [NodeJS](https://nodejs.dev/) - Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.
* [ExpressJS](https://www.expresjs.org/) - Express é um dos mais populares frameworks para servidores Node.js.
* [MongoDB](https://www.mongodb.com/) - MongoDB é um programa de banco de dados NoSQL, de código aberto e multiplataforma, que fornece escalabilidade e flexibilidade.
* [Mongoose](https://mongoosejs.com/) - Mongoose é uma biblioteca do Node.js que proporciona uma solução baseada em esquemas para modelar os dados da uma aplicação.
* [Swagger](https://swagger.io/docs/) - Swagger é um framework com um conjunto de ferramentas para desenvolvedores de API da SmartBear que independente da linguagem, auxilia a descrição, consumo e visualização de serviços de uma API REST através da criação de sua documentação.


## :woman_technologist: Autoras

<table align="center">
    <tr align="center">
        <td>
            <a href="https://github.com/alineviana">
                <img src="https://avatars.githubusercontent.com/u/80078418?v=4" width=100 />
                <p>Aline<br>Viana</p>
            </a>
            <p>:wink:</p>
        </td>
        <td>
            <a href="https://github.com/beatrizmakowski">
                <img src="https://avatars.githubusercontent.com/u/86008015?v=4" width=100 />
                <p>Beatriz<br>Makowski</p>
            </a>
            <p>:nerd_face:</p>
        </td>
        <td>
            <a href="https://github.com/JessicaTroiano">
                 <img src="https://avatars.githubusercontent.com/u/101470905?v=4" width=100 />
                <p>Jéssica<br>Troiano</p>
            </a>
        <p>:smile_cat:</p>
        </td>
        <td>
            <a href="https://github.com/mahdorigan">
                 <img src="https://avatars.githubusercontent.com/u/103972305?v=4" width=100 />
                <p>Mariana<br>Dorigan</p>
            </a>
        <p>🤖</p>
        </td>
        <td>
            <a href="https://github.com/priscillararimmy">
                 <img src="https://avatars.githubusercontent.com/u/89642572?v=4" width=100 />
                <p>Priscilla<br>Rarimmy</p>
            </a>
        <p>👾</p>
        </td>
    </tr> 
</table>