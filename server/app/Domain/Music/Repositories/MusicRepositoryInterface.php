<?php

namespace Domain\Music\Repositories;

interface MusicRepositoryInterface
{
    public function listAllMusicsWithFilters(array $params);
    public function createNewMusic(array $data);
    public function findMusicById(int $id);
}
