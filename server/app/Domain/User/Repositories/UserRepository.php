<?php

namespace Domain\User\Repositories;

use Domain\User\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(protected User $model)
    {
    }

    public function createNewUser(array $data): User
    {
        return $this->model->create($data);
    }

    public function getUserByEmail(string $email): User
    {
        return $this->model->where('email', $email)->first();
    }

    public function updateUser(User $user, array $data): bool
    {
        return $user->update($data);
    }
}
