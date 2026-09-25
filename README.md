# Music Management Website

Manage your favorite songs in one place. Add as many songs as you want and listen to them whenever you want, from anywhere.

## Project Screens

### 1 - Home

> Home page when loading the application

![Default Home](https://i.imgur.com/DwEQwiq.png)

> Home page when selecting a song to play

![Home when selecting a song](https://i.imgur.com/vmVqjgr.png)

### 2 - Authentication

> Login screen

![Login](https://i.imgur.com/J72TC6H.png)

> User registration form

![User Registration](https://i.imgur.com/4QuAHKa.png)

> Forgot password

![Forgot Password](https://i.imgur.com/MOQDA3E.png)

### 3 - Song Registration and Editing Forms

> Form for adding new songs

![Add New Songs](https://i.imgur.com/E7GL4Em.png)

> Form for editing a song

![Update Song](https://i.imgur.com/NgBtpNo.png)

## Technologies Used

### Front-end:

* Next.js
* TypeScript
* Tailwind CSS and Shadcn/ui
* Forms with React Hook Form and Zod for validation
* TanStack Query for API consumption
* Context API for state management
* Unit tests with Jest and Testing Library
* End-to-End testing with Cypress

### Back-end:

* PHP 8.2
* Laravel 10
* MySQL
* Authentication with Laravel Sanctum
* Unit and integration tests with PHPUnit
* Domain-Driven Design (DDD)

## Features

* [x] User authentication and registration
* [x] Password recovery
* [x] Email verification
* [x] Add new songs
* [x] Delete a song
* [x] Update a song

## How to Run

#### Prerequisites

* Node
* PHP 8.2
* MySQL
* Composer

#### First, clone this repository

```bash
    git clone https://github.com/TeuSoares/music-website.git
```

#### Setting up the server 👇

1. Install the dependencies inside the server folder:

```bash
    composer install
```

2. Create the `.env` file and configure the required variables:

```bash
    cp .env.example .env
```

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

```text
MAIL_MAILER=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
```

3. Run the following commands: `php artisan key:generate` and `php artisan config:cache`

4. After creating your database and configuring it in the `.env` file, you can run the database migrations. To do so, run:
   `php artisan migrate`

5. Start the server:
   `php artisan serve`

#### Starting the front-end 👇

1. Access the web folder:

```bash
    cd web
```

2. Install the dependencies:

```bash
    npm install
```

3. Configure the `.env` file:

```bash
    cp .env.example .env
```

```text
NEXT_PUBLIC_API_URL='http://localhost:8000' (Or another port where your server is running)
```

4. Start the project:

```bash
    npm run dev
```

## Project Presentation Video

https://github.com/TeuSoares/music-website/assets/70549313/47331e70-2026-4685-b40b-c3c0a520a106

## Author

* **Mateus Soares** [LinkedIn](https://www.linkedin.com/in/mateus-soares-santos/)

## Version

1.0.0

## License

This project is licensed under the MIT License.
