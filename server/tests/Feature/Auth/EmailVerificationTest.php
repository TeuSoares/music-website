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

    public function test_should_return_success_when_sending_verification_email(): void
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

    public function test_should_return_error_if_there_is_no_signature(): void
    {
        $user = $this->userAuthenticated();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => $user->id,
            'hash' => sha1($user->email)
        ]));

        $response->assertStatus(403)
            ->assertSee('Invalid signature.');
    }

    public function test_email_verification_should_fail_when_id_and_hash_are_incorrect(): void
    {
        $this->userAuthenticated();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => 'id-incorrect',
            'hash' => 'email-incorrect'
        ]));

        $response->assertStatus(403);
    }

    public function test_email_verification_should_fail_when_user_is_not_logged_in(): void
    {
        $user = $this->createNewUser();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => $user->id,
            'hash' => sha1($user->email)
        ]));

        $response->assertStatus(401);
    }

    public function test_should_send_email_successfully(): void
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
