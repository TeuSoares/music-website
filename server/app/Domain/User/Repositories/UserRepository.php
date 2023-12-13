<?php

namespace Domain\User\Repositories;

use Domain\User\Models\User;

class UserRepository
{
    public function __construct(protected User $model)
    {
    }

    public function createNewUser(array $data): User
    {
        return $this->model->create($data);
    }
}
