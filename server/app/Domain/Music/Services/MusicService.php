<?php

namespace Domain\Music\Services;

use App\Core\Traits\ThrowException;
use Domain\Music\Repositories\MusicRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class MusicService
{
    use ThrowException;

    public function __construct(protected MusicRepositoryInterface $repository)
    {
    }

    public function listAllMusics(array $params)
    {
        $params['genre'] = (string)($params['genre'] ?? '');

        return $this->repository->listAllMusicsWithFilters($params);
    }

    public function createMusic(array $data): void
    {
        $path = $data['thumbnail']->store('musics');

        if (!Storage::exists($path)) {
            $this->throwExceptionHttpResponse('Failed to create a new music. Please try again.');
        }

        try {
            $this->repository->createNewMusic([
                'user_id'   => auth()->user()->id,
                'artist'    => $data['artist'],
                'genre'     => $data['genre'],
                'name'      => $data['name'],
                'link'      => $data['music_id_youtube'],
                'thumbnail' => $path
            ]);
        } catch (\Exception $e) {
            Storage::delete($path);
            $this->throwExceptionHttpResponse('Failed to create a new music. Please try again.');
        }
    }
}
