<?php

namespace Domain\Music\Repositories;

use Domain\Music\Models\Music;
use Illuminate\Database\Eloquent\Collection;

class MusicRepository implements MusicRepositoryInterface
{
    public function __construct(protected Music $model)
    {
    }

    public function getAll(array $params): Collection
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
                $query->where('name', 'LIKE', "%{$name}%");
            })
            ->get();
    }

    public function create(array $data): Music
    {
        return $this->model->create($data);
    }

    public function findOne(int $id): Music
    {
        return $this->model->findOrFail($id);
    }

    public function update(int $id, array $data): bool
    {
        $music = $this->model->findOrFail($id);
        return $music->update($data);
    }

    public function delete(int $id): bool
    {
        return $this->model->findOrFail($id)->delete();
    }
}
