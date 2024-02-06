<?php

namespace Domain\Auth\Services;

use App\Core\Traits\ThrowException;

use Domain\User\Models\User;
use Domain\User\Repositories\UserRepositoryInterface;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthService
{
    use ThrowException;

    public function __construct(protected UserRepositoryInterface $userRepository)
    {
    }

    public function login(array $credentials): array
    {
        if (Auth::attempt($credentials)) {
            /** @var \Domain\User\Models\User $user **/
            $user = Auth::user();

            return ['token' => $user->createToken('login')->plainTextToken];
        }

        $this->throwExceptionValidation(['authetication' => 'Email or password is incorrect']);
    }

    public function registerUser(array $data): void
    {
        $user = $this->userRepository->create($data);
        event(new Registered($user));
    }

    public function forgotPassword(string $email): bool
    {
        $status = Password::sendResetLink(['email' => $email]);

        if ($status === Password::RESET_LINK_SENT) {
            return true;
        }

        $this->throwExceptionHttpResponse('Error sending reset link. Please try again');
    }

    public function resetPassword(array $data): bool
    {
        $status = Password::reset($data, function (User $user, string $password) {
            $this->userRepository->update($user->id, ['password' => $password]);
        });

        if ($status === Password::PASSWORD_RESET) {
            return true;
        }

        if ($status === Password::INVALID_TOKEN) {
            $this->throwExceptionValidation(['token' => 'The selected token is invalid.']);
        }

        $this->throwExceptionHttpResponse('Error resetting password. Please try again');
    }
}
