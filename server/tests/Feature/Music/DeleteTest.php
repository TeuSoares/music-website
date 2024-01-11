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

    public function test_should_return_forbidden_if_userId_of_music_is_different_from_user_logged(): void
    {
        $user = $this->userAuthenticated();

        $music = $this->createNewMusic();

        $user->id = 10;

        $response = $this->deleteJson(route('music.destroy', ['id' => $music->id]));

        $response->assertStatus(403);
    }

    public function test_not_should_delete_a_music_if_user_not_logged(): void
    {
        $this->createNewUser();

        $music = $this->createNewMusic();

        $response = $this->deleteJson(route('music.destroy', ['id' => $music->id]));

        $response->assertStatus(401);
    }

    public function test_should_return_not_found_if_music_not_exists(): void
    {
        $this->userAuthenticated();

        $response = $this->deleteJson(route('music.destroy', ['id' => 50]));

        $response->assertStatus(404)
            ->assertJson(['error' => ['request' => 'Not Found.']]);
    }
}
