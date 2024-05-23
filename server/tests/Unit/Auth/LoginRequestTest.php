<?php

namespace Tests\Unit\Auth;

use Domain\Auth\Requests\LoginRequest;
use Tests\TestCase;
use Tests\Traits\ValidationTrait;

class LoginRequestTest extends TestCase
{
    use ValidationTrait;

    public function test_validation_should_fail_if_payload_is_incorrect(): void
    {
        $invalidData = [
            'email' => 'invalid-email',
            'password' => 'short',
        ];

        $fails = $this->checkIfExistsValidationError(new LoginRequest, $invalidData);

        $this->assertEquals(true, $fails);
    }

    public function test_validation_must_pass_if_the_payload_is_correct(): void
    {
        $validData = [
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        $fails = $this->checkIfExistsValidationError(new LoginRequest, $validData);

        $this->assertEquals(false, $fails);
    }
}
