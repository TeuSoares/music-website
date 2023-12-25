<?php

namespace Domain\User\Repositories;

use Domain\User\Models\User;

interface UserRepositoryInterface
{
    public function createNewUser(array $data);
    public function getUserByEmail(string $email);
    public function updateUser(User $user, array $data);
}
