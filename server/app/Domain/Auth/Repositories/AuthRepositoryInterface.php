<?php

namespace Domain\Auth\Repositories;

interface AuthRepositoryInterface
{
    public function getUserByEmail(string $email);
}
