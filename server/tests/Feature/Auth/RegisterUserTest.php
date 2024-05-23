<?php

namespace Tests\Feature;

use Domain\Auth\Requests\RegisterUserRequest;

use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;

use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase, UserTrait, WithFaker, ValidationTrait;

    public function test_create_user_should_return_success(): void
    {
        $this->withoutExceptionHandling();

        Event::fake();

        $password = $this->faker->password(6, 12);

        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $password,
            'password_confirmation' => $password
        ];

        $response = $this->postJson(route('auth.register-user'), $data);

        $response
            ->assertStatus(201)
            ->assertJson(['message' => 'User created successfully.']);

        Event::assertDispatched(Registered::class);

        $this->assertDatabaseHas('users', ['email' => $data['email']]);
    }
}
