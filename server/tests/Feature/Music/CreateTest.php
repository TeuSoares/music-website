<?php

namespace Tests\Feature\Music;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class CreateTest extends TestCase
{
    use RefreshDatabase, UserTrait, ValidationTrait;

    public function test_should_insert_a_music_with_success(): void
    {
        $user = $this->userAuthenticated();

        Storage::fake();

        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $data = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/watch?v=7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $response = $this->postJson(route('music.store'), $data);

        $response->assertStatus(201)
            ->assertSee('Music created with success.');

        $path = 'musics/' . $user->id . '/' . $file->hashName();

        Storage::disk();
        Storage::assertExists($path);

        $this->assertDatabaseHas('musics', [
            'artist'     => 'Imagine Dragons',
            'genre'      => 'Rock',
            'name'       => 'Believer',
            'youtube_id' => '7wtfhZwyrcc',
            'thumbnail'  => $path
        ]);
    }

    public function test_should_not_insert_a_song_if_the_user_is_not_authenticated(): void
    {
        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $data = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $response = $this->postJson(route('music.store'), $data);

        $response->assertStatus(401);

        $this->assertDatabaseMissing('musics', [
            'artist'     => 'Imagine Dragons',
            'genre'      => 'Rock',
            'name'       => 'Believer',
            'youtube_id' => '7wtfhZwyrcc'
        ]);
    }
}
