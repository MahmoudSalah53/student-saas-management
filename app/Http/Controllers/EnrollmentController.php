<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $enrollments = Enrollment::where('tenant_id', $tenantId)->get();
        $students = Student::where('tenant_id', $tenantId)->get(['student_id', 'first_name', 'last_name']);
        $courses = Course::where('tenant_id', $tenantId)->get(['course_id', 'course_name']);

        return Inertia::render('enrollment/index',[
            'tenant_id' => $tenantId,
            'enrollments' => $enrollments,
            'students' => $students,
            'courses' => $courses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;
        Enrollment::create($validated);
        return Redirect::route('enrollments.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $enrollment = Enrollment::where('tenant_id', Auth::user()->tenant_id)->findOrFail($id);
        $enrollment->update($validated);
        return Redirect::route('enrollments.index');
    }

    public function destroy($id)
    {
        $course = Enrollment::where('tenant_id', Auth::user()->tenant_id)->findOrFail($id);
        $course->delete();
        return Redirect::route('enrollments.index');
    }
}
