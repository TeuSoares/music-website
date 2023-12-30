<?php

namespace Domain\User\Models;

use Domain\Music\Models\Music;
use Database\Factories\UserFactory;
use Domain\Auth\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password'];
    protected $hidden   = ['password', 'remember_token'];
    protected $casts    = ['email_verified_at' => 'datetime', 'password' => 'hashed'];

    protected static function newFactory(): UserFactory
    {
        return UserFactory::new();
    }

    public function sendPasswordResetNotification($token): void
    {
        $url = env('FRONT_URL') . '/password/reset/' . $token . '?email=' . $this->email;

        $this->notify(new ResetPasswordNotification($url, $this->name));
    }

    public function musics(): HasMany
    {
        return $this->hasMany(Music::class);
    }
}
