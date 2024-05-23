<?php

namespace Tests\Feature\Music;

use Domain\Music\Requests\ListMusicRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\MusicTrait;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class ListTest extends TestCase
{
    use UserTrait, MusicTrait, ValidationTrait, RefreshDatabase;

    public function test_should_list_all_music_of_logged_in_user(): void
    {
        $this->userAuthenticated();

        $this->createNewMusic();

        $response = $this->getJson(route('music.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'user_id',
                        'artist',
                        'genre',
                        'name',
                        'youtube_id',
                        'thumbnail'
                    ]
                ]
            ]);
    }

    public function test_get_a_single_music(): void
    {
        $this->userAuthenticated();

        $music = $this->createNewMusic();

        $response = $this->getJson(route('music.show', ['id' => $music->id]));

        $response->assertStatus(200);
    }

    public function test_should_return_forbidden_if_the_music_userId_is_different_from_the_logged_user(): void
    {
        $user = $this->userAuthenticated();

        $music = $this->createNewMusic();

        $user->id = 10;

        $response = $this->getJson(route('music.show', ['id' => $music->id]));

        $response->assertStatus(403);
    }
}
