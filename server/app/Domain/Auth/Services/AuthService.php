<?php

namespace Domain\Auth\Services;

use Domain\Auth\Repositories\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(protected AuthRepositoryInterface $repository)
    {
    }

    public function login(array $credentials): array
    {
        if (Auth::attempt($credentials)) {
            $user = $this->repository->getUserByEmail($credentials['email']);

            return [
                'message' => 'User authenticated successfully',
                'token' => $user->createToken('login')->plainTextToken
            ];
        }

        throw ValidationException::withMessages(['authetication' => 'Email or password is incorrect']);
    }
}
