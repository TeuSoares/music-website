<?php

namespace Domain\Music\Services;

use Domain\Music\Repositories\MusicRepository;

class MusicService
{
    public function __construct(protected MusicRepository $repository)
    {
    }

    public function listAllMusics(array $params)
    {
        $params['genre'] = (string)($params['genre'] ?? '');

        return $this->repository->listAllMusicsWithFilters($params);
    }
}
