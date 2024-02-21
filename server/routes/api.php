<?php

use Domain\Auth\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::as('auth.')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    Route::post('register-user', [AuthController::class, 'registerUser'])->name('register-user');
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware(['auth:sanctum', 'signed'])->name('verification.verify');
    Route::post('/email/verification-notification', [AuthController::class, 'verificationSend'])->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');
});

Route::apiResource('music', 'Music\Controllers\MusicController')->parameter('music', 'id')->middleware(['auth:sanctum, verified']);
