<?php

namespace Domain\Music\Requests;

use App\Core\Request;

class UpdateMusicRequest extends Request
{
    public function rules()
    {
        return [
            'artist'       => 'required|string',
            'genre'        => 'required|string',
            'name'         => 'required|string',
            'link_youtube' => 'required',
            'thumbnail'    => 'nullable|file|mimes:jpg,png'
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
