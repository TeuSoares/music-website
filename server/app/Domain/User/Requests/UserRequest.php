<?php

namespace Domain\User\Requests;

use App\Core\Request;

class UserRequest extends Request
{
    public function rules()
    {
        return [
            'name'                  => 'required|string',
            'email'                 => 'required|email',
            'password'              => 'required|min:6|max:12|confirmed',
            'password_confirmation' => 'required|min:6|max:12|'
        ];
    }
}
