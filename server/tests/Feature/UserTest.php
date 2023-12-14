<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user_retun_success(): void
    {
        $this->withoutExceptionHandling();

        $data = [
            'name' => "Mateus",
            'email' => "teste@teste.com",
            'password' => 12345678,
            'password_confirmation' => 12345678
        ];

        $response = $this->postJson('/api/user', $data);

        $response
            ->assertStatus(201)
            ->assertJson(['message' => 'user created successfully']);

        $this->assertDatabaseHas('users', ['email' => $data['email']]);
    }

    public function test_if_creating_new_user_fails_return_error(): void
    {
        $data = [
            'name' => "",
            'email' => "teste@teste.com",
            'password' => 12345678,
            'password_confirmation' => 12345678
        ];

        $response = $this->postJson('/api/user', $data);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('users', ['email' => $data['email']]);
    }
}
