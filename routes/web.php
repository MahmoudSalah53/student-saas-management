<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Teacher Controller
    Route::resource('teachers', TeacherController::class);
    // Student Controller
    Route::resource('students', StudentController::class);
    // Course Controller
    Route::resource('courses', CourseController::class);
    // Enrollment Controller
    Route::resource('enrollments', EnrollmentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
