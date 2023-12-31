<?php

namespace Tests\Traits;

use Illuminate\Support\Facades\Validator;

trait ValidationTrait
{
    public function checkIfExistsValidationError(object $formRequest, $data = []): bool
    {
        $rules = $formRequest->rules();
        $validator = Validator::make($data, $rules);
        return $validator->fails();
    }
}
