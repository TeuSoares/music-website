<?php

namespace App\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as ModelCore;

abstract class Model extends ModelCore
{
    use HasFactory;
}
