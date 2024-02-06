<?php

namespace Domain\Music\Requests;

use App\Core\Request;

class MutationMusicRequest extends Request
{
    public function rules()
    {
        $rules = [
            'artist'       => 'required|string',
            'genre'        => 'required|string',
            'name'         => 'required|string',
            'link_youtube' => 'required',
            'thumbnail'    => 'file|mimes:jpg,png'
        ];

        if (request()->method() == 'POST') {
            $rules['thumbnail'] = 'required|' . $rules['thumbnail'];
        }

        return $rules;
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
