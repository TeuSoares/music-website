<?php

namespace Domain\Music\Services;

use App\Core\Traits\ThrowException;
use Domain\Music\Models\Music;
use Domain\Music\Repositories\MusicRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class MusicService
{
    use ThrowException;

    public function __construct(protected MusicRepositoryInterface $repository)
    {
    }

    public function getAllMusic(array $params): Collection
    {
        $params['genre'] = (string)($params['genre'] ?? '');
        $params['artist'] = (string)($params['artist'] ?? '');
        $params['name'] = (string)($params['name'] ?? '');

        return $this->repository->getAll($params);
    }

    public function createMusic(array $data): void
    {
        $path = $data['thumbnail']->store('musics');

        if (!Storage::exists($path)) {
            $this->throwExceptionHttpResponse('Failed to create a new music. Please try again.');
        }

        try {
            $this->repository->create([
                'user_id'    => auth()->user()->id,
                'artist'     => $data['artist'],
                'genre'      => $data['genre'],
                'name'       => $data['name'],
                'youtube_id' => $data['link_youtube'],
                'thumbnail'  => $path
            ]);
        } catch (\Exception $e) {
            Storage::delete($path);
            $this->throwExceptionHttpResponse('Failed to create a new music. Please try again.');
        }
    }

    public function updateMusic(int $id, array $data): void
    {
        if (isset($data['thumbnail'])) {
            $music = $this->repository->findOne($id);

            Storage::delete($music['thumbnail']);

            $path = $data['thumbnail']->store('musics');

            if (!Storage::exists($path)) {
                $this->throwExceptionHttpResponse('Failed to update music. Please try again.');
            }

            $data['thumbnail'] = $path;
        }

        try {
            $this->repository->update($id, [
                ...$data,
                'youtube_id' => $data['link_youtube'],
            ]);
        } catch (\Exception $e) {
            Storage::delete($path);
            $this->throwExceptionHttpResponse('Failed to update music. Please try again.');
        }
    }

    public function deleteMusic(Music $music): void
    {
        Storage::delete($music->thumbnail);

        $this->repository->delete($music->id);
    }
}
