<?php

namespace Tests\Feature;

use Domain\Auth\Requests\RegisterUserRequest;
use Domain\User\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user_retun_success(): void
    {
        $this->withoutExceptionHandling();

        Event::fake();

        $data = [
            'name' => "Mateus",
            'email' => "teste@teste.com",
            'password' => 12345678,
            'password_confirmation' => 12345678
        ];

        $response = $this->postJson(route('auth.register-user'), $data);

        $response
            ->assertStatus(201)
            ->assertJson(['message' => 'User created successfully.']);

        Event::assertDispatched(Registered::class);

        $this->assertDatabaseHas('users', ['email' => $data['email']]);
    }

    public function test_validation_rules_at_create_new_user(): void
    {
        $request = new RegisterUserRequest();
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

        $request = new RegisterUserRequest();
        $rules = $request->rules();
        $validator = Validator::make($data, $rules);
        $fails = $validator->fails();

        $this->assertEquals(true, $fails);
    }
}
