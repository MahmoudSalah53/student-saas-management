<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $primaryKey = 'enrollment_id';
    public $timestamps = false;

    protected $fillable = [
        'tenant_id',
        'student_id',
        'course_id',
        'enrollment_date',
    ];
}
