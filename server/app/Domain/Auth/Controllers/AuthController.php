<?php

namespace Domain\Auth\Controllers;

use App\Core\Controller;
use Domain\Auth\Requests\LoginRequest;
use Domain\Auth\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private AuthService $service)
    {
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $this->service->login($request->all());

        return response()->json(['data' => $data]);
    }
}
