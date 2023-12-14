<?php

namespace App\Core\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

trait HttpResponse
{
    protected int $per_page = 10;

    protected function responseBuilder(Builder $query, bool $transform = true, int $http_code = 200): JsonResponse
    {
        $data = $this->service->filter($query, request()->all())->get();

        if (!$transform) {
            return response()->json(['data' => $data], $http_code);
        }

        return $this->resource::collection($data)->response()->setStatusCode($http_code);
    }

    protected function responseBuilderWithPagination(Builder $query, bool $transform = true, int $http_code = 200): JsonResponse
    {
        $per_page = (int)request()->per_page > 0 ? request()->per_page : $this->per_page;

        $data = $this->service->filter($query, request()->all())->paginate($per_page);

        if (!$transform) {
            return response()->json(['data' => $data], $http_code);
        }

        return $this->resource::collection($data)->response()->setStatusCode($http_code);
    }

    protected function responseBuilderRow(Builder $query, bool $transform = true, int $http_code = 200): JsonResponse
    {
        $data = $query->first();

        if (!$transform) {
            return response()->json(['data' => $data], $http_code);
        }

        return (new $this->resource($data))->response()->setStatusCode($http_code);
    }

    protected function responseMessage(string $message, int $http_code = 200): JsonResponse
    {
        return response()->json(['message' => $message], $http_code);
    }

    protected function responseNoContent(): Response
    {
        return response([], 204);
    }
}
