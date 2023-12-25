<?php

namespace Domain\Auth\Requests;

use App\Core\Request;

class RegisterUserRequest extends Request
{
    public function rules()
    {
        return [
            'name'                  => 'required|string',
            'email'                 => 'required|email|unique:Domain\User\Models\User',
            'password'              => 'required|min:6|max:12|confirmed',
            'password_confirmation' => 'required|min:6|max:12|'
        ];
    }
}
