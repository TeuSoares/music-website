<?php

namespace Tests\Feature\Music;

use Domain\Music\Requests\ListMusicRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\MusicTrait;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class ListMusicTest extends TestCase
{
    use UserTrait, MusicTrait, ValidationTrait, RefreshDatabase;

    public function test_should_list_all_music_of_user_logged(): void
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
                        'link',
                        'thumbnail'
                    ]
                ]
            ]);
    }

    public function test_filter_validation_to_list_music(): void
    {
        $fails = $this->checkIfExistsValidationError(new ListMusicRequest, [
            'genre' => 'Rock',
            'artist' => 4687897,
            'name' => 'Music'
        ]);

        $this->assertEquals(true, $fails);
    }

    public function test_should_return_forbidden_if_user_is_different_from_logged(): void
    {
        $this->userAuthenticated();

        $this->createNewMusic();

        auth()->user()->id = 10;

        $response = $this->getJson(route('music.index'));

        $response->assertStatus(403);
    }
}
