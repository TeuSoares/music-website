<?php

namespace Tests\Feature;

use Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = User::newFactory()->create([
            'password' => bcrypt($password = '12345678')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => $password
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'message',
                    'token'
                ]
            ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_login_with_incorrect_password(): void
    {
        $user = User::newFactory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'invalid-password'
        ]);

        $response->assertStatus(422);

        $this->assertGuest();
    }
}
