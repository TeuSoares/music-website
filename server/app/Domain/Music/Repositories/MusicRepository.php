<?php

namespace Domain\Music\Repositories;

use Domain\Music\Models\Music;
use Illuminate\Database\Eloquent\Collection;

class MusicRepository implements MusicRepositoryInterface
{
    public function __construct(protected Music $model)
    {
    }

    public function listAllMusicsWithFilters(array $params): Collection
    {
        $query = $this->model->where('user_id', auth()->user()->id);

        $genre = $params['genre'];
        $artist = $params['artist'];
        $name = $params['name'];

        return $query
            ->when($genre, function ($query) use ($genre) {
                $query->where('genre', $genre);
            })
            ->when($artist, function ($query) use ($artist) {
                $query->where('artist', $artist);
            })
            ->when($name, function ($query) use ($name) {
                $query->where('name','LIKE',"%{$name}%");
            })
            ->get();
    }

    public function createNewMusic(array $data)
    {
        return $this->model->create($data);
    }
}
