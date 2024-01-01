<?php

namespace Domain\Music\Requests;

use App\Core\Request;

class CreateMusicRequest extends Request
{
    public function rules()
    {
        return [
            'artist'           => 'required|string',
            'genre'            => 'required|string',
            'name'             => 'required|string',
            'music_id_youtube' => 'required',
            'thumbnail'        => 'required|file|mimes:jpg,png'
        ];
    }

    public function messages()
    {
        return [
            'music_id_youtube.required' => 'The field ID of Music YouTube is required',
            'thumbnail.file'            => 'The thumb must be a image',
            'thumbnail.mimes'           => 'The thumb must be a image of type jpg, png',
        ];
    }
}
