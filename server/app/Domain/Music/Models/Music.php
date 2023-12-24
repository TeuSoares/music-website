<?php

namespace Domain\Music\Models;

use App\Core\Model;
use Domain\User\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Music extends Model
{
    protected $guarded = ['id'];

    protected function link(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => 'https://www.youtube.com/embed/' . $value,
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
