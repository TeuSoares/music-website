<?php

namespace Domain\Music\Controllers;

use Illuminate\Http\JsonResponse;

use App\Core\Controller;

use Domain\Music\Models\Music;
use Domain\Music\Requests\CreateMusicRequest;
use Domain\Music\Services\MusicService;
use Domain\Music\Resources\MusicResource;

class MusicController extends Controller
{
    public function __construct(
        private MusicService $service,
        protected $resource = MusicResource::class
    ) {
    }

    public function index(): JsonResponse
    {
        $rows = Music::where('user_id', auth()->user()->id)->get();

        return $this->responseDataWithResource($rows);
    }

    public function store(CreateMusicRequest $request): JsonResponse
    {
        $this->service->createMusic($request->all());

        return $this->responseMessage('Music created with success.', 201);
    }
}