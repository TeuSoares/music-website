<?php

namespace App\Core;

use Illuminate\Foundation\Http\FormRequest;

abstract class Request extends FormRequest
{
    public function authorize()
    {
        return true;
    }
}
