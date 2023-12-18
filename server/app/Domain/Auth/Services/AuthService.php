<?php

namespace Domain\Auth\Services;

use Domain\Auth\Repositories\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function __construct(protected AuthRepositoryInterface $repository)
    {
    }

    public function login(array $credentials): array
    {
        if (Auth::attempt($credentials)) {
            return [
                'message' => 'User authenticated successfully',
                'token' => Auth::user()->createToken('login')->plainTextToken
            ];
        }
    }
}
