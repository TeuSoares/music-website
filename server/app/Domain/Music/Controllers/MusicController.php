<?php

namespace Domain\Music\Controllers;

use Illuminate\Http\JsonResponse;

use App\Core\Controller;

use Domain\Music\Repositories\MusicRepositoryInterface;
use Domain\Music\Requests\CreateMusicRequest;
use Domain\Music\Requests\ListMusicRequest;
use Domain\Music\Requests\UpdateMusicRequest;
use Domain\Music\Services\MusicService;
use Domain\Music\Resources\MusicResource;

class MusicController extends Controller
{
    public function __construct(
        protected MusicService $service,
        protected MusicRepositoryInterface $repository,
        protected $resource = MusicResource::class
    ) {
    }

    public function index(ListMusicRequest $request): JsonResponse
    {
        $rows = $this->service->getAllMusic($request->all());

        return $this->responseDataWithCollectionResource($rows);
    }

    public function store(CreateMusicRequest $request): JsonResponse
    {
        $this->service->createMusic($request->all());

        return $this->responseMessage('Music created with success.', 201);
    }

    public function show(int $id): JsonResponse
    {
        $music = $this->repository->findOne($id);

        $this->authorize('view', $music);

        return $this->responseDataWithResource($music);
    }

    public function update(int $id, UpdateMusicRequest $request): JsonResponse
    {
        $music = $this->repository->findOne($id);

        $this->authorize('update', $music);

        $this->service->updateMusic($id, $request->all());

        return $this->responseMessage('Music update with success.');
    }

    public function destroy(int $id): JsonResponse
    {
        $music = $this->repository->findOne($id);

        $this->authorize('delete', $music);

        $this->service->deleteMusic($music);

        return $this->responseMessage('Music deleted successfully.');
    }
}
