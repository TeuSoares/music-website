<?php

namespace Domain\Music\Controllers;

use Illuminate\Http\JsonResponse;

use App\Core\Controller;

use Domain\Music\Repositories\MusicRepositoryInterface;
use Domain\Music\Requests\CreateMusicRequest;
use Domain\Music\Requests\ListMusicRequest;
use Domain\Music\Services\MusicService;
use Domain\Music\Resources\MusicResource;

class MusicController extends Controller
{
    public function __construct(
        private MusicService $service,
        private MusicRepositoryInterface $repository,
        protected $resource = MusicResource::class
    ) {
    }

    public function index(ListMusicRequest $request): JsonResponse
    {
        $rows = $this->service->listAllMusics($request->all());

        return $this->responseDataWithResource($rows);
    }

    public function store(CreateMusicRequest $request): JsonResponse
    {
        $this->service->createMusic($request->all());

        return $this->responseMessage('Music created with success.', 201);
    }

    public function show(int $id): JsonResponse
    {
        $music = $this->repository->findMusicById($id);

        $this->authorize('view', $music);

        return $this->responseData($music);
    }
}
