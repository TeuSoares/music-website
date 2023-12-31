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

    public function test_create_user_retun_success(): void
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

    public function test_validation_rules_at_create_new_user(): void
    {
        $fails = $this->checkIfExistsValidationError(new RegisterUserRequest);

        $this->assertEquals(true, $fails);
    }

    public function test_if_email_already_exist_return_error(): void
    {
        $user = $this->createNewUser();

        $password = $this->faker->password(6, 12);

        $data = [
            'name' => $this->faker->name,
            'email' => $user->email,
            'password' => $password,
            'password_confirmation' => $password
        ];

        $fails = $this->checkIfExistsValidationError(new RegisterUserRequest, $data);

        $this->assertEquals(true, $fails);
    }
}
