<?php

namespace Domain\Auth\Services;

use Domain\User\Models\User;
use Domain\User\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthService
{
    public function __construct(protected UserRepositoryInterface $userRepository)
    {
    }

    public function login(array $credentials): array
    {
        if (Auth::attempt($credentials)) {
            $user = $this->userRepository->getUserByEmail($credentials['email']);

            return ['token' => $user->createToken('login')->plainTextToken];
        }

        throw ValidationException::withMessages(['authetication' => 'Email or password is incorrect']);
    }

    public function createNewUser(array $data): void
    {
        try {
            $this->userRepository->createNewUser($data);
        } catch (\Exception $e) {
            abort(500, 'Failed to create new user. Please try again');
        }
    }

    public function forgotPassword(string $email): bool
    {
        try {
            $status = Password::sendResetLink(['email' => $email]);

            if ($status === Password::RESET_LINK_SENT) {
                return true;
            }
        } catch (\Exception $e) {
            abort(500, 'Error sending reset link');
        }
    }

    public function resetPassword(array $data): bool
    {
        $status = Password::reset($data, function (User $user, string $password) {
            $this->userRepository->updateUser($user, ['password' => $password]);
        });

        if ($status === Password::PASSWORD_RESET) {
            return true;
        }

        if ($status === Password::INVALID_TOKEN) {
            throw ValidationException::withMessages(['token' => 'The token selected is invalid.']);
        }
    }
}
