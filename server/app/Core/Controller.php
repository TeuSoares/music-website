<?php

namespace App\Core;

use App\Core\Http\Controllers\Controller as ControllerCore;
use App\Core\Traits\HttpResponse;

abstract class Controller extends ControllerCore
{
    use HttpResponse;
}
