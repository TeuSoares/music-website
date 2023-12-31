<?php

namespace App\Core\Traits;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

trait ThrowException
{
    public function throwExceptionValidation(array $data): void
    {
        throw ValidationException::withMessages($data);
    }

    public function throwExceptionHttpResponse(string $message, int $status_code = 500): void
    {
        throw new HttpResponseException(response()->json(['error' => $message], $status_code));
    }
}
