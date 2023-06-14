# Laravel Template - Flowbite

This just a laravel template with breeze react, user role based access crud with setup flowbite admin template
## Support me

<a href="https://trakteer.id/ajikamaludin" target="_blank"><img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-blue-2.png" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

## Requirements

- PHP 8.1 or latest
- Node 16+ or latest

## How to run

prepare env
```bash
cp .env.example .env # configure app for laravel
touch database/database.sqlite # if you use .env.example with default sqlite database
composer install
npm install
```
use php server
```bash
php artisan migrate --seed # create table for db and seed data
php artisan key:gen 
php artisan ser #keep run to dev
```

compile asset
```bash
npm run dev # compiling asset for development # keep run for dev
```

## Default User

```bash
username : admin@admin.com
password : password
```

## Compile Assets ( to prod )

```bash
npm run build
```

## TODO

- [ ] add dark mode
- [ ] add default setting (app name)
