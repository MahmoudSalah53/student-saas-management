<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $primaryKey = 'teacher_id';

    public $timestamps = false;

    protected $fillable = [
        'tenant_id',
        'first_name',
        'last_name',
        'subject',
    ];
}
