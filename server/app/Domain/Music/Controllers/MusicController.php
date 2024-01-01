<?php

namespace Domain\Music\Controllers;

use App\Core\Controller;
use Domain\Music\Requests\CreateMusicRequest;
use Domain\Music\Services\MusicService;
use Illuminate\Http\JsonResponse;

class MusicController extends Controller
{
    public function __construct(private MusicService $service)
    {
    }

    public function store(CreateMusicRequest $request): JsonResponse
    {
        $this->service->createMusic($request->all());

        return $this->responseMessage('Music created with success.', 201);
    }
}
