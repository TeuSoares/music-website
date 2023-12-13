<?php

namespace Domain\User\Services;

use Domain\User\Repositories\UserRepository;
use Illuminate\Validation\ValidationException;

class UserService
{
    public function __construct(protected UserRepository $repository)
    {
    }

    public function createNewUser(array $data): void
    {
        $user = $this->repository->createNewUser($data);

        throw_if(!$user, ValidationException::withMessages(['Failed to create new user. Please try again']));
    }
}
