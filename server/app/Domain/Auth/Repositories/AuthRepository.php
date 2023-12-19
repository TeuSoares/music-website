<?php

namespace Domain\Auth\Repositories;

use Domain\User\Models\User;

class AuthRepository implements AuthRepositoryInterface
{
    public function getUserByEmail(string $email): User
    {
        return User::where('email', $email)->first();
    }
}
