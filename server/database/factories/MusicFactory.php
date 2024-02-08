<?php

namespace Database\Factories;

use Domain\Music\Models\Music;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Music\Models\Music>
 */
class MusicFactory extends Factory
{
    protected $model = Music::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'artist' => fake()->firstName(),
            'genre' => 'Rock',
            'name' => fake()->sentence(),
            'youtube_id' => 'https://www.youtube.com/watch?v=8AHCfZTRGiI',
            'thumbnail' => 'musics/1/thumbnail.jpg',
        ];
    }
}
