<?php

namespace Domain\Auth\Controllers;

use App\Core\Controller;
use Domain\Auth\Requests\ForgotPasswordRequest;
use Domain\Auth\Requests\LoginRequest;
use Domain\Auth\Services\AuthService;
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

        return $this->responseMessageWithData($data);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return $this->responseMessage('User logged out with success.');
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $msg = $this->service->forgotPassword($request->email);

        return $this->responseMessage($msg);
    }
}
