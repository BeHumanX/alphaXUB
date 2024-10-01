<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $enviroment = App::enviroment();
        if (app()->environment('production')) {
            $url = request()->url();
            if (str_starts_with($url, 'http://')) {
                $newUrl = str_replace('http', 'https', $url);
                abort(301, '', ['Location' => $newUrl]);
            }
        }
    }
}
