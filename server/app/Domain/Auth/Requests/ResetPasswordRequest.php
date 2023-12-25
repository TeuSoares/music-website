<?php

namespace Domain\Auth\Requests;

use App\Core\Request;

class ResetPasswordRequest extends Request
{
    public function rules()
    {
        return [
            'token'                 => 'required',
            'email'                 => 'required|email|exists:users',
            'password'              => 'required|min:6|max:12|confirmed',
            'password_confirmation' => 'required|min:6|max:12|'
        ];
    }
}
