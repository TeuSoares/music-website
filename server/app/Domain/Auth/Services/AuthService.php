<?php

namespace Domain\Auth\Services;

use Domain\Auth\Repositories\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
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

    public function forgotPassword(string $email): string
    {
        try {
            $status = Password::sendResetLink(['email' => $email]);

            if ($status === Password::RESET_LINK_SENT) {
                return 'Sent reset link successfully to your mail.';
            }
        } catch (\Exception $e) {
            abort(500, 'Error sending reset link');
        }
    }
}
