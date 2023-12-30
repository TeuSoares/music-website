<?php

namespace Domain\Auth\Controllers;

use App\Core\Controller;
use Domain\Auth\Requests\ForgotPasswordRequest;
use Domain\Auth\Requests\LoginRequest;
use Domain\Auth\Requests\RegisterUserRequest;
use Domain\Auth\Requests\ResetPasswordRequest;
use Domain\Auth\Services\AuthService;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $service)
    {
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $this->service->login($request->all());

        return $this->responseMessageWithData('User authenticated successfully', $data);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return $this->responseMessage('User logged out with success.');
    }

    public function registerUser(RegisterUserRequest $request): JsonResponse
    {
        $this->service->registerUser($request->all());

        return $this->responseMessage('User created successfully.', 201);
    }

    public function verifyEmail(EmailVerificationRequest $request): JsonResponse
    {
        $request->fulfill();

        return $this->responseMessage('E-mail verification successfully.', 200);
    }

    public function verificationSend(Request $request): JsonResponse
    {
        $request->user()->sendEmailVerificationNotification();

        return $this->responseMessage('E-mail resend success.', 200);
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $this->service->forgotPassword($request->email);

        return $this->responseMessage('Sent reset link successfully to your mail.');
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $this->service->resetPassword($request->all());

        return $this->responseMessage('Password reset successfully.');
    }
}
