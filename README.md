# Projet PFE avec React js et Laravel
## Application web e-commerce "Bazar"

## Requirements 
* PHP (+v7.3) https://www.php.net/manual/fr/install.php
* Composer https://getcomposer.org/download/
* Laravel 8 (version v8) https://laravel.com/docs/8.x/installation

## Installation
1. Clone repo
```
$ git clone https://github.com/EyaMagdouli/bazar.git
$ cd bazar
```
2. Backend Configuration
```
$ Copy .env.example file to .env and edit database credentials there
$ Run cd backend
$ Run composer install
$ Run php artisan key:generate
$ Run php artisan migrate --seed (it has some seeded data for your testing)
```
3. Frontend Configuration
```
$ cd react
$ npm install
```

You can login to adminpanel by going go http://localhost:8000/admin/login URL and login with credentials admin@gmail.com - secret
