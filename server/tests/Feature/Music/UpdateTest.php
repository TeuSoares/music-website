<?php

namespace Tests\Feature\Music;

use Domain\Music\Requests\MutationMusicRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use Tests\TestCase;
use Tests\Traits\MusicTrait;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class UpdateTest extends TestCase
{
    use RefreshDatabase, UserTrait, ValidationTrait, MusicTrait, WithFaker;

    public function test_should_update_a_music_with_success(): void
    {
        $this->userAuthenticated();

        $music = $this->createNewMusic();

        $data = [
            'artist'       => $this->faker->firstName(),
            'genre'        => $music->genre,
            'name'         => $this->faker->sentence(),
            'link_youtube' => 'https://www.youtube.com/watch?v='  . $music->youtube_id,
        ];

        $response = $this->putJson(route('music.update', ['id' => $music->id]), $data);

        $response->assertStatus(200)
            ->assertSee('Music update with success.');

        $this->assertDatabaseHas('musics', [
            'artist'     => $data['artist'],
            'genre'      => $data['genre'],
            'name'       => $data['name'],
            'youtube_id' => $music->youtube_id,
            'thumbnail'  => $music->thumbnail
        ]);
    }

    public function test_should_update_image_of_music_with_success(): void
    {
        $this->userAuthenticated();

        $music = $this->createNewMusic();

        Storage::fake();

        $file = UploadedFile::fake()->image('thumbnail_update.jpg');

        $data = [
            'artist'       => $music->artist,
            'genre'        => $music->genre,
            'name'         => $music->name,
            'link_youtube' => 'https://www.youtube.com/watch?v='  . $music->youtube_id,
            'thumbnail'    => $file
        ];

        $response = $this->putJson(route('music.update', ['id' => $music->id]), $data);

        $response->assertStatus(200)
            ->assertSee('Music update with success.');

        $path = 'musics/' . $file->hashName();

        Storage::disk();

        Storage::assertMissing($music->thumbnail);
        Storage::assertExists($path);

        $this->assertDatabaseHas('musics', [
            'artist'     => $music->artist,
            'genre'      => $music->genre,
            'name'       => $music->name,
            'youtube_id' => $music->youtube_id,
            'thumbnail'  => $path
        ]);
    }

    public function test_not_should_update_a_music_if_user_not_authenticated(): void
    {
        $this->createNewUser();

        $music = $this->createNewMusic();

        $data = [
            'artist'       => $this->faker->firstName(),
            'genre'        => $music->genre,
            'name'         => $this->faker->sentence(),
            'link_youtube' => 'https://www.youtube.com/watch?v='  . $music->youtube_id,
        ];

        $response = $this->putJson(route('music.update', ['id' => $music->id]), $data);

        $response->assertStatus(401);

        $this->assertDatabaseMissing('musics', [
            'artist'     => $data['artist'],
            'genre'      => $music->genre,
            'name'       => $data['name'],
            'youtube_id' => $music->youtube_id,
        ]);
    }

    public function test_not_should_update_music_if_validations_failed(): void
    {
        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest);

        $this->assertEquals(true, $fails);
    }

    public function test_not_should_update_music_if_the_thumbnail_not_of_a_image(): void
    {
        $file = UploadedFile::fake()->create('document.pdf');

        $data = [
            'artist'       => $this->faker->firstName(),
            'genre'        => 'Rock',
            'name'         => $this->faker->sentence(),
            'link_youtube' => '7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }

    public function test_not_should_update_music_if_the_thumbnail_not_a_image_of_type_jpg_or_png(): void
    {
        $file = UploadedFile::fake()->image('image.gif');

        $data = [
            'artist'       => $this->faker->firstName(),
            'genre'        => 'Rock',
            'name'         => $this->faker->sentence(),
            'link_youtube' => '7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }

    public function test_should_return_forbidden_if_userId_of_music_is_different_from_user_logged(): void
    {
        $user = $this->userAuthenticated();

        $music = $this->createNewMusic();

        $data = [
            'artist'       => $this->faker->firstName(),
            'genre'        => $music->genre,
            'name'         => $this->faker->sentence(),
            'link_youtube' => 'https://www.youtube.com/watch?v='  . $music->youtube_id,
        ];

        $user->id = 10;

        $response = $this->putJson(route('music.update', ['id' => $music->id]), $data);

        $response->assertStatus(403);
    }
}
