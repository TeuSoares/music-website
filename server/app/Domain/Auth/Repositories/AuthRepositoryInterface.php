<?php

namespace Domain\Auth\Repositories;

interface AuthRepositoryInterface
{
    public function getUserByEmail(string $email);
    public function sendResetLink(string $email);
}
