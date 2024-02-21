<?php

namespace Tests\Feature\Music;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Tests\Traits\MusicTrait;
use Tests\Traits\UserTrait;

class DeleteTest extends TestCase
{
    use UserTrait, MusicTrait, RefreshDatabase;

    public function test_should_return_success_when_delete_a_music(): void
    {
        $this->userAuthenticated();

        Storage::fake();

        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $path = Storage::putFile('musics', $file);

        $music = $this->createNewMusic();

        $music->thumbnail = $path;
        $music->save();

        $response = $this->deleteJson(route('music.destroy', ['id' => $music->id]));

        $response->assertStatus(200)
            ->assertSee('Music deleted successfully.');

        Storage::assertMissing($music->thumbnail);
        $this->assertDatabaseMissing('musics', $music->toArray());
    }

    public function test_should_return_forbidden_if_the_music_userId_is_different_from_the_logged_user(): void
    {
        $user = $this->userAuthenticated();

        $music = $this->createNewMusic();

        $user->id = 10;

        $response = $this->deleteJson(route('music.destroy', ['id' => $music->id]));

        $response->assertStatus(403);
    }

    public function test_should_not_delete_a_song_if_you_are_not_logged_in_as_a_user(): void
    {
        $this->createNewUser();

        $music = $this->createNewMusic();

        $response = $this->deleteJson(route('music.destroy', ['id' => $music->id]));

        $response->assertStatus(401);
    }

    public function test_should_return_not_found_if_a_song_does_not_exist(): void
    {
        $this->userAuthenticated();

        $response = $this->deleteJson(route('music.destroy', ['id' => 50]));

        $response->assertStatus(404)
            ->assertJson(['errors' => ['request' => ['Not Found.']]]);
    }
}
