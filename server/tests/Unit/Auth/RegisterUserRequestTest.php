<?php

namespace Tests\Unit\Auth;

use Domain\Auth\Requests\RegisterUserRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class RegisterUserRequestTest extends TestCase
{
    use ValidationTrait, WithFaker, UserTrait, RefreshDatabase;

    public function test_validation_should_fail_if_payload_is_incorrect(): void
    {
        $invalidData = [
            'name' => $this->faker->name,
            'email' => 'invalid-email',
            'password' => '123456',
            'password_confirmation' => '15489'
        ];

        $fails = $this->checkIfExistsValidationError(new RegisterUserRequest, $invalidData);

        $this->assertEquals(true, $fails);
    }

    public function test_validation_must_pass_if_the_payload_is_correct(): void
    {
        $password = $this->faker->password(6, 12);

        $validData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $password,
            'password_confirmation' => $password
        ];

        $fails = $this->checkIfExistsValidationError(new RegisterUserRequest, $validData);

        $this->assertEquals(false, $fails);
    }

    public function test_validation_should_fail_if_email_already_exists(): void
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
