<?php

namespace Domain\Music\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MusicResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'user_id'    => $this->user_id,
            'artist'     => $this->artist,
            'genre'      => $this->genre,
            'name'       => $this->name,
            'youtube_id' => $this->youtube_id,
            'thumbnail'  => $this->thumbnail
        ];
    }
}
