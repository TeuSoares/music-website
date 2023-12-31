<?php

namespace Domain\Music\Requests;

use App\Core\Request;

class CreateMusicRequest extends Request
{
    public function rules()
    {
        return [
            'artist'       => 'required|string',
            'genre'        => 'required|string',
            'name'         => 'required|string',
            'link_youtube' => 'required',
            'thumbnail'    => 'required|file|mimes:jpg,png'
        ];
    }

    public function messages()
    {
        return [
            'link_youtube.required' => 'The link of YouTube is required',
            'thumbnail.file'        => 'The thumb must be a image',
            'thumbnail.mimes'       => 'The thumb must be a image of type jpg, png',
        ];
    }
}
