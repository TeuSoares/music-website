<?php

namespace Domain\User\Repositories;

use Domain\User\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(protected User $model)
    {
    }

    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    public function getUserByEmail(string $email): User
    {
        return $this->model->where('email', $email)->firstOrFail();
    }

    public function findOne(int $id): User
    {
        return $this->model->findOrFail($id);
    }

    public function update(int $id, array $data): bool
    {
        $user = $this->model->findOrFail($id);
        return $user->update($data);
    }
}
