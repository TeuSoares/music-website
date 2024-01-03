<?php

namespace Domain\Music\Policies;

use Domain\Music\Models\Music;
use Domain\User\Models\User;

class MusicPolicy
{
    public function view(?User $user, Music $music): bool
    {
        return $user->id === $music->user_id;
    }
}
