import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Enrollment {
    enrollment_id: number;
    tenant_id: number;
    student_id: number;
    course_id: number;
    enrollment_date: string;
}

interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
}

interface Course {
    course_id: number;
    course_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Enrollments',
        href: '/enrollments',
    },
];

const emptyForm = {
    student_id: '',
    course_id: '',
    enrollment_date: '',
};

type FormState = typeof emptyForm & { id?: number };

export default function EnrollmentIndex() {
    const { enrollments, students, courses } = usePage<{
        enrollments?: Enrollment[];
        students?: Student[];
        courses?: Course[];
    }>().props;
    const enrollmentList = enrollments ?? [];
    const studentList = students ?? [];
    const courseList = courses ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (enrollment: Enrollment) => {
        setForm({
            id: enrollment.enrollment_id,
            student_id: String(enrollment.student_id),
            course_id: String(enrollment.course_id),
            enrollment_date: enrollment.enrollment_date,
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...form, student_id: Number(form.student_id), course_id: Number(form.course_id) };
        if (isEdit && form.id) {
            router.put(`/enrollments/${form.id}`, payload, {
                onSuccess: handleClose,
            });
        } else {
            router.post(`/enrollments`, payload, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this enrollment?')) {
            router.delete(`/enrollments/${id}`);
        }
    };

    const getStudentName = (student_id: number) => {
        const student = studentList.find((s) => s.student_id === student_id);
        return student ? `${student.first_name} ${student.last_name}` : student_id;
    };

    const getCourseName = (course_id: number) => {
        const course = courseList.find((c) => c.course_id === course_id);
        return course ? course.course_name : course_id;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mt-6 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Enrollments</h1>
                    <Button onClick={handleOpenAdd}>Add Enrollment</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Student</th>
                                <th className="px-4 py-2 text-left font-semibold">Course</th>
                                <th className="px-4 py-2 text-left font-semibold">Enrollment Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollmentList.map((enrollment) => (
                                <tr key={enrollment.enrollment_id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                    <td className="px-4 py-2">{enrollment.enrollment_id}</td>
                                    <td className="px-4 py-2">{getStudentName(enrollment.student_id)}</td>
                                    <td className="px-4 py-2">{getCourseName(enrollment.course_id)}</td>
                                    <td className="px-4 py-2">{enrollment.enrollment_date}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Button size="sm" variant="outline" onClick={() => handleOpenEdit(enrollment)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(enrollment.enrollment_id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEdit ? 'Update Enrollment' : 'Add Enrollment'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="student_id">Student</Label>
                                <Select value={form.student_id} onValueChange={(value) => setForm({ ...form, student_id: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a student" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {studentList.map((student) => (
                                            <SelectItem key={student.student_id} value={String(student.student_id)}>
                                                {student.first_name} {student.last_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="course_id">Course</Label>
                                <Select value={form.course_id} onValueChange={(value) => setForm({ ...form, course_id: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courseList.map((course) => (
                                            <SelectItem key={course.course_id} value={String(course.course_id)}>
                                                {course.course_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="enrollment_date">Enrollment Date</Label>
                                <Input
                                    type="date"
                                    id="enrollment_date"
                                    name="enrollment_date"
                                    value={form.enrollment_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">{isEdit ? 'Update' : 'Add'}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Card>
        </AppLayout>
    );
}
