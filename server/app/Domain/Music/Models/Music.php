<?php

namespace Domain\Music\Models;

use App\Core\Model;
use Database\Factories\MusicFactory;
use Domain\User\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Music extends Model
{
    protected $table = 'musics';
    protected $guarded = ['id'];

    protected function youtubeId(): Attribute
    {
        return Attribute::make(
            set: function (string $value) {
                $id_youtube = explode('v=', $value)[1];
                return $id_youtube;
            },
        );
    }

    protected static function newFactory(): MusicFactory
    {
        return MusicFactory::new();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
