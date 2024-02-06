<?php

namespace Tests\Feature\Auth;

use Domain\Auth\Requests\LoginRequest;

use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;
use Tests\Traits\UserTrait;
use Tests\Traits\ValidationTrait;

class LoginTest extends TestCase
{
    use RefreshDatabase, UserTrait, ValidationTrait;

    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = $this->createNewUserCustom([
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
        $user = $this->createNewUser();

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

    public function test_validation_rules_for_login_attempts(): void
    {
        $fails = $this->checkIfExistsValidationError(new LoginRequest);

        $this->assertEquals(true, $fails);
    }

    public function test_user_can_log_out_successfully(): void
    {
        $this->userAuthenticated();

        $response = $this->postJson(route('auth.logout'));

        $response->assertStatus(200)
            ->assertSee('User logged out with success.');

        $this->refreshApplication();

        $this->assertGuest();
    }

    public function test_user_cannot_log_out_if_not_authenticated(): void
    {
        $response = $this->postJson(route('auth.logout'));

        $response->assertStatus(401)
            ->assertExactJson([
                'message' => 'Unauthenticated.'
            ]);

        $this->assertGuest();
    }
}
