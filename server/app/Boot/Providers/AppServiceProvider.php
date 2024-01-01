<?php

namespace App\Boot\Providers;

use Domain\Music\Repositories\MusicRepository;
use Domain\Music\Repositories\MusicRepositoryInterface;
use Domain\User\Repositories\UserRepository;
use Domain\User\Repositories\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(MusicRepositoryInterface::class, MusicRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
