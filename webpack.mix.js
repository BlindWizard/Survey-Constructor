const mix = require('laravel-mix');

mix.js('resources/js/admin/app.js', 'public/js/admin').version();
mix.js('resources/js/auth/login.js', 'public/js/auth').version();
mix.sass('resources/sass/app.scss', 'public/css').version();