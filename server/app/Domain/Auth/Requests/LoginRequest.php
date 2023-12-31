<?php

namespace Domain\Auth\Requests;

use App\Core\Request;

class LoginRequest extends Request
{
    public function rules()
    {
        return [
            'email'     => 'required|email',
            'password'  => 'required',
        ];
    }
}
