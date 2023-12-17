<?php

namespace Tests\Feature;

use Domain\User\Models\User;
use Domain\User\Requests\UserRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
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

    public function test_validation_rules_at_create_new_user(): void
    {
        $request = new UserRequest();
        $rules = $request->rules();
        $validator = Validator::make([], $rules);
        $fails = $validator->fails();

        $this->assertEquals(true, $fails);
    }

    public function test_if_email_already_exist_return_error(): void
    {
        $user = User::newFactory()->create()->toArray();

        $data = [
            'name' => 'test',
            'email' => $user['email'],
            'password' => 12345678,
            'password_confirmation' => 12345678
        ];

        $request = new UserRequest();
        $rules = $request->rules();
        $validator = Validator::make($data, $rules);
        $fails = $validator->fails();

        $this->assertEquals(true, $fails);
    }
}
