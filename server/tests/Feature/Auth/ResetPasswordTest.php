<?php

namespace Tests\Feature\Auth;

use Domain\Auth\Notifications\ResetPasswordNotification;
use Domain\User\Models\User;
use Domain\Auth\Requests\ResetPasswordRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ResetPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_if_mail_is_valid_it_send_mail_to_reset_password(): void
    {
        Notification::fake();

        $user = User::newFactory()->create();

        $response = $this->postJson('/api/forgot-password', [
            'email' => $user->email
        ]);

        $response->assertStatus(200);

        Notification::assertSentTo(
            [$user],
            ResetPasswordNotification::class
        );
    }

    public function test_if_mail_not_is_valid_should_not_send_notification(): void
    {
        Notification::fake();

        $response = $this->postJson('/api/forgot-password', [
            'email' => 'email@invalid.com'
        ]);

        $response->assertStatus(422)
            ->assertExactJson([
                'message' => 'The selected email is invalid.',
                'errors' => [
                    'email' => ['The selected email is invalid.']
                ]
            ]);

        Notification::assertNothingSent();
    }

    public function test_validation_rules_at_reset_password(): void
    {
        $request = new ResetPasswordRequest();
        $rules = $request->rules();
        $validator = Validator::make([], $rules);
        $fails = $validator->fails();

        $this->assertEquals(true, $fails);
    }

    public function test_should_throw_exception_if_mail_is_invalid(): void
    {
        $user = User::newFactory()->create();

        $token = Password::createToken($user);

        $data = [
            'token' => $token,
            'email' => 'email@invalid.com',
            'password' => 12345678,
            'password_confirmation' => 12345678
        ];

        $request = new ResetPasswordRequest();
        $rules = $request->rules();
        $validator = Validator::make($data, $rules);
        $fails = $validator->fails();

        $this->assertEquals(true, $fails);
    }

    public function test_if_token_is_invalid_not_should_reset_password(): void
    {
        $user = User::newFactory()->create();

        $response = $this->postJson('/api/reset-password', [
            'token' => 'token-invalid',
            'email' => $user->email,
            'password' => 12345678,
            'password_confirmation' => 12345678
        ]);

        $response->assertStatus(422)
            ->assertExactJson([
                'message' => 'The token selected is invalid.',
                'errors' => [
                    'token' => ['The token selected is invalid.']
                ]
            ]);
    }

    public function test_should_reset_password_if_token_and_email_is_valid(): void
    {
        $user = User::newFactory()->create();

        $token = Password::createToken($user);

        $response = $this->postJson('/api/reset-password', [
            'token' => $token,
            'email' => $user->email,
            'password' => 12345678,
            'password_confirmation' => 12345678
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Password reset successfully.']);
    }
}
