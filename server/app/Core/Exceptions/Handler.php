<?php

namespace App\Core\Exceptions;

use App\Core\Traits\ThrowException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ThrowException;

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (QueryException $e) {
            $this->throwExceptionHttpResponse('There was an error making your request. Please try again.');
        });

        $this->renderable(function (NotFoundHttpException $e) {
            $this->throwExceptionHttpResponse('Not Found.', 404);
        });
    }
}
