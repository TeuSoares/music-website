<?php

namespace Domain\Auth\Requests;

use App\Core\Request;

class ForgotPasswordRequest extends Request
{
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users',
        ];
    }
}
