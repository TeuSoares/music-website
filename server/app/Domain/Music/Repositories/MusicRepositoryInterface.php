<?php

namespace Domain\Music\Repositories;

use Domain\Music\Models\Music;
use Illuminate\Database\Eloquent\Collection;

interface MusicRepositoryInterface
{
    public function getAll(array $params): Collection;
    public function create(array $data): Music;
    public function findOne(int $id): Music;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
