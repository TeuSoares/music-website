<?php

namespace App\Boot\Providers;

// use Illuminate\Support\Facades\Gate;

use Domain\Music\Models\Music;
use Domain\Music\Policies\MusicPolicy;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Music::class => MusicPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Website Music - Verify Your Email')
                ->greeting('Hello, ' . $notifiable->name)
                ->line('Click the button below to verify your email address.')
                ->action('Click Here to Verify Email Address', $url);
        });

        VerifyEmail::createUrlUsing(function (object $notifiable) {
            $url_signed = URL::temporarySignedRoute(
                'auth.verification.verify',
                Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            $signed = explode('?', $url_signed)[1];

            return env('FRONT_URL') . '/email/verify/' . $notifiable->getKey() . '/' . sha1($notifiable->getEmailForVerification()) . '?' . $signed;
        });
    }
}
