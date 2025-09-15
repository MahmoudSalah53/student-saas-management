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

interface Course {
    course_id: number;
    tenant_id: number;
    course_name: string;
    teacher_id: number;
}

interface Teacher {
    teacher_id: number;
    first_name: string;
    last_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/courses',
    },
];

const emptyForm = {
    course_name: '',
    teacher_id: '',
};

type FormState = typeof emptyForm & { id?: number };

export default function CourseIndex() {
    const { courses, teachers } = usePage<{ courses?: Course[]; teachers?: Teacher[] }>().props;
    const courseList = courses ?? [];
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (course: Course) => {
        setForm({
            id: course.course_id,
            course_name: course.course_name,
            teacher_id: String(course.course_id),
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
        const payload = { ...form, teacher_id: Number(form.teacher_id) };
        if (isEdit && form.id) {
            router.put(`/courses/${form.id}`, payload, {
                onSuccess: handleClose,
            });
        } else {
            router.post(`/courses`, payload, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            router.delete(`/courses/${id}`);
        }
    };

    const getTeacherName = (teacher_id: number) => {
        const teacher = teacherList.find((t) => Number(t.teacher_id) === Number(teacher_id));
        return teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Unknown Teacher';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mt-6 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <Button onClick={handleOpenAdd}>Add Course</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Course Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Teacher</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList.map((course) => (
                                <tr key={course.course_id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                    <td className="px-4 py-2">{course.course_id}</td>
                                    <td className="px-4 py-2">{course.course_name}</td>
                                    <td className="px-4 py-2">{getTeacherName(course.teacher_id)}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Button size="sm" variant="outline" onClick={() => handleOpenEdit(course)}>
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(course.course_id)}>
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
                            <DialogTitle>{isEdit ? 'Update Course' : 'Add Course'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="course_name">Course Name</Label>
                                <Input id="course_name" name="course_name" value={form.course_name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="teacher_id">Teacher</Label>
                                <Select value={form.teacher_id} onValueChange={(value) => setForm({ ...form, teacher_id: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Teacher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teacherList.map((teacher) => (
                                            <SelectItem key={teacher.teacher_id} value={String(teacher.teacher_id)}>
                                                {teacher.first_name} {teacher.last_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
