<?php

namespace Domain\User\Repositories;

interface UserRepositoryInterface
{
    public function createNewUser(array $data);
}
