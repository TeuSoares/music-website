<?php

namespace Tests\Feature\Auth;

use Carbon\Carbon;
use Domain\User\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_verification_should_return_success(): void
    {
        $user = User::newFactory()->create();

        Sanctum::actingAs($user);

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
        $user = User::newFactory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => $user->id,
            'hash' => sha1($user->email)
        ]));

        $response->assertStatus(403)
            ->assertSee('Invalid signature.');
    }

    public function test_if_id_and_hash_incorrect_not_should_verify_email(): void
    {
        $user = User::newFactory()->create();

        Sanctum::actingAs($user);

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => 'id-incorrect',
            'hash' => 'email-incorrect'
        ]));

        $response->assertStatus(403);
    }

    public function test_if_user_not_authenticated_not_should_verify_email(): void
    {
        $user = User::newFactory()->create();

        $response = $this->getJson(route('auth.verification.verify', [
            'id' => $user->id,
            'hash' => sha1($user->email)
        ]));

        $response->assertStatus(401);
    }

    public function test_should_send_email(): void
    {
        Notification::fake();

        $user = User::newFactory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson(route('auth.verification.send'));

        $response->assertStatus(200)
            ->assertSee('E-mail resend success.');

        Notification::assertSentTo(
            [$user],
            VerifyEmail::class
        );
    }
}
