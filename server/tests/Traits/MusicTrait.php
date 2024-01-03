<?php

namespace Tests\Traits;

use Domain\Music\Models\Music;

trait MusicTrait
{
    public function createNewMusic(): Music
    {
        return Music::newFactory()->create();
    }

    public function createNewMusicCustom(array $data): Music
    {
        return Music::newFactory()->create($data);
    }

    public function createNewMusicWithoutPersist(): Music
    {
        return Music::newFactory()->make();
    }
}
