<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey = 'course_id';
    public $timestamps = false;

    protected $fillable = [
        'tenant_id',
        'course_name',
        'teacher_id',
    ];
}
