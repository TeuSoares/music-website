<?php

namespace Tests\Feature\Music;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\UserTrait;

class ListMusicTest extends TestCase
{
    use UserTrait, RefreshDatabase;

    public function test_should_list_all_music_of_user_logged(): void
    {
        $this->userAuthenticated();

        $response = $this->getJson(route('music.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'user_id',
                    'artist',
                    'genre',
                    'name',
                    'link',
                    'thumbnail'
                ]
            ]);
    }
}
