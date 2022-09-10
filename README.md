# Trybe Futebol Clube

# :warning: Disclaimer
:warning: Nesse projeto, a única parte/código feita por mim foi a parte de backend da aplicação no diretório app/backend e o arquivo Dockerfile no diretório app/frontend, sendo todo o resto feito pela empresa Trybe e de sua propriedade. :warning:

# Contexto

<div>
 <img alt="Shows the login page." src="/images/imagem1.png" width=500>
 <img alt="Shows the matches page." src="/images/imagem2.png" width=500>
 <img alt="Shows leaderboard page." src="/images/imagem3.png" width=500>
</div>

Este foi um dos muitos projetos desenvolvidos por mim enquanto estudante da Trybe. Esse foi um projeto particulamente dificil e por isso ele tem uma grande importância e destaque para mim enquanto desenvolvedor.

O objetivo dessa aplicação é conseguir acessar os dados do banco de dados através do front-end para simular um site que guarda dados de partidas de times de futebol(vitórias, gols, partidas), onde o usuário consegue acessar a plataforma através de um login que será validado através de um token gerado pelo **JSON Web Token** e sua senha sera criptografada usando o **bcryptjs**.

Essa aplicação foi desenvolvida utilizando **TypeScript**, enquanto o banco de dados utilizado para armazenar os dados dos times é o **MySQL**, sendo acessado utilizando o ORM(*Object-Relational Mapping ou, em português, mapeamento objeto-relacional*) **Sequelize** aplicando a arquitetura de software baseada em camadas.

## Técnologias usadas

### Back-end:

- MySQL
- Sequelize
- Docker
- Arquitetura de Softaware baseada em camadas(*Model, Service e Controller*)
- Node.js
- TypeScript


## Instalando Dependências
### :warning: Toda essa aplicação roda utilizando **Docker**, sendo o unico software necessário para rodar a aplicação.

Estando no diretório raíz do projeto, execute no terminal:
```
 npm run compose:up:dev
```

> Esse comando irar criar os 3 containers necessários para rodar a aplicação, estando o frontend na porta local 3000, enquanto o backend estara rodando na porta local 3001.
> Para acessar a aplicação através do login, utilize:
> - email: "admin@admin.com"
> - password: "secret_admin"
