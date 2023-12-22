<?php

namespace Tests\Feature;

use Domain\Auth\Requests\LoginRequest;
use Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
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

        $response->assertStatus(422)
            ->assertExactJson([
                'message' => 'Email or password is incorrect',
                'errors' => [
                    'authetication' => ['Email or password is incorrect']
                ]
            ]);

        $this->assertGuest();
    }

    public function test_validation_rules_at_attempt_login(): void
    {
        $request = new LoginRequest();
        $rules = $request->rules();
        $validator = Validator::make([], $rules);
        $fails = $validator->fails();

        $this->assertEquals(true, $fails);
    }

    public function test_if_mail_is_valid_it_send_mail_to_reset_password(): void
    {
        Notification::fake();

        $user = User::newFactory()->create();

        $response = $this->postJson('/api/forgot-password', [
            'email' => $user->email
        ]);

        $response->assertStatus(200);
        // ->assertSee('Reset Password')
        // ->assertSee('E-Mail Address')
        // ->assertSee('Send Password Reset Link');
    }
}
