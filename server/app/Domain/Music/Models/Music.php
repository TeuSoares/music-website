<?php

namespace Domain\Music\Models;

use App\Core\Model;
use Domain\User\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Music extends Model
{
    protected $table = 'musics';
    protected $guarded = ['id'];

    protected function link(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => 'https://www.youtube.com/embed/' . $value,
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
