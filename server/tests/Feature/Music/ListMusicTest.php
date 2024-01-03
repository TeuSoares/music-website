<?php

namespace Tests\Feature\Music;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
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
            ->assertJson(function (AssertableJson $json) {
                $json->has('data');
            });

        $content = $response->decodeResponseJson();

        $this->assertContains($content['data'], [
            [],
            [
                'id',
                'user_id',
                'artist',
                'genre',
                'name',
                'link',
                'thumbnail'
            ]
        ]);
        // $response->assertStatus(200)
        //     ->assertJsonStructure([
        //         'data' => []
        //     ]);
    }
}
