<?php

namespace Tests\Feature\Auth;

use Domain\Auth\Requests\LoginRequest;
use Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = User::newFactory()->create([
            'password' => bcrypt($password = '12345678')
        ]);

        $response = $this->postJson(route('auth.login'), [
            'email' => $user->email,
            'password' => $password
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data'
            ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_login_with_incorrect_password(): void
    {
        $user = User::newFactory()->create();

        $response = $this->postJson(route('auth.login'), [
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

    public function test_if_user_for_disconnected_with_success(): void
    {
        $user = User::newFactory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson(route('auth.logout'));

        $response->assertStatus(200)
            ->assertSee('User logged out with success.');

        $this->refreshApplication();

        $this->assertGuest();
    }

    public function test_a_user_not_can_logout_if_no_authenticate(): void
    {
        $response = $this->postJson(route('auth.logout'));

        $response->assertStatus(401)
            ->assertExactJson([
                'message' => 'Unauthenticated.'
            ]);

        $this->assertGuest();
    }
}
