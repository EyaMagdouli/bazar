const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .copy(
        'node_modules/@fortawesome/fontawesome-free/webfonts',
        'public/webfonts'
    );
    
// create a custom Backpack bundle CSS, with custom colors
mix.sass('resources/scss/custom-backpack-bundle.scss', 'public/packages/backpack/base/css/')
    .options({
      processCssUrls: false
    });


mix.disableNotifications(); // Disable success and error Notification
mix.disableSuccessNotifications(); // Disable only success Notification and show error Notification
