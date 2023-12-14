<?php

namespace Domain\User\Controllers;

use App\Core\Controller;
use Domain\User\Requests\UserRequest;
use Domain\User\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(private UserService $service)
    {
    }

    public function store(UserRequest $request): JsonResponse
    {
        $this->service->createNewUser($request->all());

        return $this->responseMessage('user created successfully', 201);
    }
}
