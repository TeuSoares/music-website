<?php

namespace App\Core\Traits;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

trait HttpResponse
{
    protected function responseData(array $data): JsonResponse
    {
        return response()->json(['data' => $data]);
    }

    protected function responseDataWithCollectionResource(Collection $data): JsonResponse
    {
        return $this->resource::collection($data)->response();
    }

    protected function responseDataWithResource(Model $data): JsonResponse
    {
        return (new $this->resource($data))->response();
    }

    protected function responseMessage(string $message, int $http_code = 200): JsonResponse
    {
        return response()->json(['message' => $message], $http_code);
    }

    protected function responseMessageWithData(string $message, array $data, int $http_code = 200): JsonResponse
    {
        return response()->json(['message' => $message, 'data' => $data], $http_code);
    }

    protected function responseNoContent(): Response
    {
        return response()->noContent();
    }
}
