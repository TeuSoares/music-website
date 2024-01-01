<?php

namespace Tests\Feature\Music;

use Domain\Music\Requests\CreateMusicRequest;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class CreateMusicTest extends TestCase
{
    use RefreshDatabase, UserTrait, ValidationTrait;

    public function test_should_insert_a_music_with_success(): void
    {
        $this->userAuthenticated();

        Storage::fake();

        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $data = [
            'artist'           => 'Imagine Dragons',
            'genre'            => 'Rock',
            'name'             => 'Believer',
            'music_id_youtube' => '7wtfhZwyrcc',
            'thumbnail'        => $file
        ];

        $response = $this->postJson(route('music.store'), $data);

        $response->assertStatus(201)
            ->assertSee('Music created with success.');

        $path = 'musics/' . $file->hashName();

        Storage::disk();
        Storage::assertExists($path);

        $this->assertDatabaseHas('musics', [
            'artist'    => 'Imagine Dragons',
            'genre'     => 'Rock',
            'name'      => 'Believer',
            'link'      => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail' => $path
        ]);
    }

    public function test_not_should_insert_a_music_if_user_not_authenticated(): void
    {
        Storage::fake();

        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $data = [
            'artist'           => 'Imagine Dragons',
            'genre'            => 'Rock',
            'name'             => 'Believer',
            'music_id_youtube' => '7wtfhZwyrcc',
            'thumbnail'        => $file
        ];

        $response = $this->postJson(route('music.store'), $data);

        $response->assertStatus(401);

        $path = 'musics/' . $file->hashName();

        Storage::disk();
        Storage::assertMissing($path);

        $this->assertDatabaseMissing('musics', [
            'artist'    => 'Imagine Dragons',
            'genre'     => 'Rock',
            'name'      => 'Believer',
            'link'      => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail' => $path
        ]);
    }

    public function test_not_should_create_a_new_music_if_validations_failed(): void
    {
        $fails = $this->checkIfExistsValidationError(new CreateMusicRequest);

        $this->assertEquals(true, $fails);
    }

    public function test_not_should_create_a_new_music_if_the_thumbnail_not_of_a_image(): void
    {
        $file = UploadedFile::fake()->create('document.pdf');

        $data = [
            'artist'           => 'Imagine Dragons',
            'genre'            => 'Rock',
            'name'             => 'Believer',
            'music_id_youtube' => '7wtfhZwyrcc',
            'thumbnail'        => $file
        ];

        $fails = $this->checkIfExistsValidationError(new CreateMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }

    public function test_not_should_create_a_new_music_if_the_thumbnail_not_a_image_of_type_jpg_or_png(): void
    {
        $file = UploadedFile::fake()->image('image.gif');

        $data = [
            'artist'           => 'Imagine Dragons',
            'genre'            => 'Rock',
            'name'             => 'Believer',
            'music_id_youtube' => '7wtfhZwyrcc',
            'thumbnail'        => $file
        ];

        $fails = $this->checkIfExistsValidationError(new CreateMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }
}
