<?php

namespace Tests\Unit\Auth;

use Domain\Auth\Requests\ResetPasswordRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class ResetPasswordRequestTest extends TestCase
{
    use ValidationTrait, WithFaker, UserTrait, RefreshDatabase;

    public function test_validation_should_fail_if_payload_is_incorrect(): void
    {
        $invalidData = [
            'token' => '',
            'email' => 'invalid-email',
            'password' => '12345678',
            'password_confirmation' => '12345678'
        ];

        $fails = $this->checkIfExistsValidationError(new ResetPasswordRequest, $invalidData);

        $this->assertEquals(true, $fails);
    }

    public function test_validation_must_pass_if_the_payload_is_correct(): void
    {
        $user = $this->createNewUser();

        $token = Password::createToken($user);

        $password = $this->faker->password(6, 12);

        $validData = [
            'token' => $token,
            'email' => $user->email,
            'password' => $password,
            'password_confirmation' => $password
        ];

        $fails = $this->checkIfExistsValidationError(new ResetPasswordRequest, $validData);

        $this->assertEquals(false, $fails);
    }

    public function test_validation_should_fail_if_email_is_invalid(): void
    {
        $user = $this->createNewUser();

        $token = Password::createToken($user);

        $password = $this->faker->password(6, 12);

        $data = [
            'token' => $token,
            'email' => 'invalid-email',
            'password' => $password,
            'password_confirmation' => $password
        ];

        $fails = $this->checkIfExistsValidationError(new ResetPasswordRequest, $data);

        $this->assertEquals(true, $fails);
    }
}
