<?php

namespace Tests\Feature\Auth;

use Domain\Auth\Notifications\ResetPasswordNotification;
use Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
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
}
