<?php

namespace Tests\Feature\Music;

use Domain\Music\Requests\MutationMusicRequest;
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

    public function test_should_not_create_a_new_music_if_validations_failed(): void
    {
        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest);

        $this->assertEquals(true, $fails);
    }

    public function test_should_not_create_a_new_music_if_the_thumbnail_is_not_an_image(): void
    {
        $file = UploadedFile::fake()->create('document.pdf');

        $data = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }

    public function test_should_not_create_music_if_the_thumbnail_is_not_jpg_or_png_image(): void
    {
        $file = UploadedFile::fake()->image('image.gif');

        $data = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }
}
