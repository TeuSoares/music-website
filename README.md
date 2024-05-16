# Gerenciador de Músicas

Gerencie as suas músicas favoritas em apenas um lugar. Cadastre quantas músicas quiser e ouça em qualquer momento, de onde estiver.

## Telas do projeto

### 1 - Home
> Home ao carregar a página

![Home Padrão](https://i.imgur.com/DwEQwiq.png)

> Home ao selecionar uma música para ouvir

![Home ao selecionar uma música](https://i.imgur.com/vmVqjgr.png)

### 2 - Autenticação
> Tela de login

![Login](https://i.imgur.com/J72TC6H.png)

> Formulário de cadastro de usuário

![Cadastro de usuários](https://i.imgur.com/4QuAHKa.png)

> Esqueci a senha

![Esqueci a senha](https://i.imgur.com/MOQDA3E.png)

### 3 - Formulários de cadastro e edição de músicas
> Formulário para inserir novas músicas

![Inserir novas músicas](https://i.imgur.com/E7GL4Em.png)

> Formulário para editar uma música

![Atualizar música](https://i.imgur.com/NgBtpNo.png)

## O que foi utilizado

### Front-end:
* Next.JS
* TypeScript
* Tailwind CSS e Shadcn/ui
* Formulários com React Hook Form e Zod para validação
* TanStack Query para consumo de APIs
* Context API para gerenciamento de estados
* Testes unitários com Jest e Testing Library
  
### Back-end
* PHP 8.2
* Laravel 10
* MySQL
* Sistema de autenticação com Laravel Sanctum
* Testes de integração com PHP Unit
* Metodologia Domain-Driven Design (DDD)

## Funcionalidades
* [x] Autenticação e cadastro de usuário
* [x] Recuperar a senha
* [x] Validação de e-mail
* [x] Cadastro de novas músicas
* [x] Excluir uma música
* [x] Atualizar uma música

## Como rodar

#### Pré-Requisitos
* Node
* PHP 8.2
* MySQL
* Composer
  
#### Antes de tudo, clone este repositório
```bash
    git clone https://github.com/TeuSoares/music-website.git
```

#### Configurando servidor 👇
1. Instale as dependências dentro da pasta server
```bash
    composer install
```

2. Crie o arquivo `.env` e configure as varíaveis necessárias
```bash
    cp .env.example .env
```
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```
```
MAIL_MAILER=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
```

3. Execute os comandos: `php artisan key:generate` e `php artisan config:cache`

4. Após criar seu banco de dados e configura-lo no .env, você pode fazer a migração das tabelas necessárias. Para isso rode o comando `php artisan migrate`
   
5. Para iniciar o servidor rode: `php artisan serve`

#### Inicializando o front-end 👇
1. Acesse a pasta web
```bash
    cd web
```

2. Instalando dependências
```bash
    npm install
```

3. Configure o .env
```bash
    cp .env.example .env
```
```
NEXT_PUBLIC_API_URL='http://localhost:8000' (Ou outra porta que seu servidor estiver rodando)
```

4. Inicializar projeto
```bash
    npm run dev
```

## Vídeo de apresentação


https://github.com/TeuSoares/music-website/assets/70549313/47331e70-2026-4685-b40b-c3c0a520a106


## Autor

* **Mateus Soares** [Linkedin](https://www.linkedin.com/in/mateus-soares-santos/)

## Versão

1.0.0

## Licença

Este projeto está licenciado sob a Licença MIT.
