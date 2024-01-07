<?php

namespace Domain\User\Repositories;

use Domain\User\Models\User;

interface UserRepositoryInterface
{
    public function create(array $data): User;
    public function getUserByEmail(string $email): User;
    public function findOne(int $id): User;
    public function update(int $id, array $data): bool;
}
