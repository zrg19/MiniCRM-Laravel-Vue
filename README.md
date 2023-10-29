<h1 align="center">MinCRM Laravel 10 Vue 3 with Rest API</h1>
<h3 align="center">A Single page Vue admin panel for Laravel projects.</h3>


Admin panel with a frontend to manage companies and their employees,
creating a MiniCRM application.

## Built with
- [Laravel 10](https://github.com/laravel/framework)
- [Vue 3](https://vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Laravel Vue Pagination](https://laravel-vue-pagination.org/guide/components/bootstrap-5.html)
- [Vue SweetAlert](https://avil13.github.io/vue-sweetalert2/)

#### System Requirement
- PHP 8.1
- Node LTS
- MySQL 8

#### Installation
- To get started, you need to install [PHP Composer](https://getcomposer.org/).
- `composer install`
- Copy `.env.example` to `.env` file
- To generate key
- `php artisan key:generate`
- Create a new MYSQL database and update database details in `.env` file
- `php artisan migrate`
- `php artisan db:seed`
- To make storage directory public run below command
- `php artisan storage:link`
- FrontEnd Setup 
- `npm install`
- Run application local setup
- `npm run dev`
- `php artisan serve`
- Now open http://localhost:8000/
- Add SMTP Configuration for MAIL setup in `.env` file

###### Admin Login 
- Email - admin@admin.com
- Password - password
