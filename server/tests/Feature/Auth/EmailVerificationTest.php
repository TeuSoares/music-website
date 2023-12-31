<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use Tests\Traits\UserTrait;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;

use Carbon\Carbon;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase, UserTrait;

    public function test_email_verification_should_return_success(): void
    {
        $user = $this->userAuthenticated();

        $url_signed = URL::temporarySignedRoute(
            'auth.verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $user->getKey(),
                'hash' => sha1($user->getEmailForVerification()),
            ]
        );

        $response = $this->getJson($url_signed);

        $response->assertStatus(200)
            ->assertSee('E-mail verification successfully.');

        $this->assertDatabaseHas('users', [
            'email_verified_at' => now(),
        ]);
    }

    public function test_if_not_exists_signature_should_return_error(): void
    {
        $user = $this->userAuthenticated();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => $user->id,
            'hash' => sha1($user->email)
        ]));

        $response->assertStatus(403)
            ->assertSee('Invalid signature.');
    }

    public function test_if_id_and_hash_incorrect_not_should_verify_email(): void
    {
        $this->userAuthenticated();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => 'id-incorrect',
            'hash' => 'email-incorrect'
        ]));

        $response->assertStatus(403);
    }

    public function test_if_user_not_authenticated_not_should_verify_email(): void
    {
        $user = $this->createNewUser();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => $user->id,
            'hash' => sha1($user->email)
        ]));

        $response->assertStatus(401);
    }

    public function test_should_send_email(): void
    {
        Notification::fake();

        $user = $this->userAuthenticated();

        $response = $this->postJson(route('auth.verification.send'));

        $response->assertStatus(200)
            ->assertSee('E-mail resend success.');

        Notification::assertSentTo(
            [$user],
            VerifyEmail::class
        );
    }
}
