<?php

namespace Tests\Traits;

use Domain\User\Models\User;
use Laravel\Sanctum\Sanctum;

trait UserTrait
{
    public function createNewUser(): User
    {
        return User::newFactory()->create();
    }

    public function userAuthenticated(): User
    {
        $user = User::newFactory()->create();

        Sanctum::actingAs($user);

        return $user;
    }

    public function createNewUserCustom(array $data): User
    {
        return User::newFactory()->create($data);
    }
}
