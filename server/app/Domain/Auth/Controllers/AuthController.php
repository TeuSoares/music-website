<?php

namespace Domain\Auth\Controllers;

use App\Core\Controller;
use Domain\Auth\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $service)
    {
    }

    public function login(Request $request): JsonResponse
    {
        $data = $this->service->login($request->all());

        return $this->responseBuilder($data);
    }
}
