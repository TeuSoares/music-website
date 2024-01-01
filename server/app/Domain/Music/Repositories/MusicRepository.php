<?php

namespace Domain\Music\Repositories;

use Domain\Music\Models\Music;
use Illuminate\Database\Eloquent\Builder;

class MusicRepository implements MusicRepositoryInterface
{
    public function __construct(protected Music $model)
    {
    }

    public function listAllMusicsWithFilters(array $params): Builder
    {
        $query = $this->model->where('user_id', auth()->user()->id);

        $genre = $params['genre'];

        return $query
            ->when($genre, function ($query) use ($genre) {
                $query->where('genre', $genre);
            });
    }

    public function createNewMusic(array $data)
    {
        return Music::create($data);
    }
}
