<?php

namespace App\Core\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponses
{
    protected int $per_page = 10;

    protected function responseBuilder(mixed $query, bool $transform = true, int $http_code = 200): JsonResponse
    {
        if (!$transform) {
            return response()->json(['data' => $query], $http_code);
        }

        $per_page = (int)request()->per_page > 0 ? request()->per_page : $this->per_page;

        $query = $this->service->filter($query, request()->all())->paginate($per_page);

        return $this->resource::collection($query)->response()->setStatusCode($http_code);
    }

    protected function responseBuilderWithoutPagination(mixed $query, bool $transform = true, int $http_code = 200): JsonResponse
    {
        if (!$transform) {
            return response()->json(['data' => $query], $http_code);
        }

        $query = $this->service->filter($query, request()->all())->get();

        return $this->resource::collection($query)->response()->setStatusCode($http_code);
    }

    protected function responseBuilderRow(mixed $data, bool $transform = true, int $http_code = 200): JsonResponse
    {
        if (!$transform) {
            return response()->json(['data' => $data], $http_code);
        }

        return (new $this->resource($data))->response()->setStatusCode($http_code);
    }

    protected function responseMessage(string|array $message, int $http_code = 200): JsonResponse
    {
        return response()->json($message, $http_code);
    }

    protected function responseNoContent()
    {
        return new JsonResponse([], 204);
    }
}
