<?php

namespace Domain\Auth\Repositories;

use Domain\User\Models\User;
use Illuminate\Support\Facades\Password;

class AuthRepository implements AuthRepositoryInterface
{
    public function getUserByEmail(string $email): User
    {
        return User::where('email', $email)->first();
    }
}
