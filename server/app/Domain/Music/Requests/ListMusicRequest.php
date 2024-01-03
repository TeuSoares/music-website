<?php

namespace Domain\Music\Requests;

use App\Core\Request;

class ListMusicRequest extends Request
{
    public function rules()
    {
        return [
            'artist' => 'nullable|string|alpha',
            'genre'  => 'nullable|string|alpha',
            'name'   => 'nullable|string|alpha',
        ];
    }
}
