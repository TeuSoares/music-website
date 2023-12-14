<?php

namespace Domain\User\Services;

use Domain\User\Repositories\UserRepositoryInterface;
use Illuminate\Validation\ValidationException;

class UserService
{
    public function __construct(protected UserRepositoryInterface $repository)
    {
    }

    public function createNewUser(array $data): void
    {
        try {
            $this->repository->createNewUser($data);
        } catch (\Exception $e) {
            throw ValidationException::withMessages(['Failed to create new user. Please try again']);
        }
    }
}
