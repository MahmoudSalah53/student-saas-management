import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { Users, BookOpen, UserCheck, Calendar, GraduationCap } from 'lucide-react';

interface DashboardProps {
    schoolName: string;
    totalStudents: number;
    totalCourses: number;
    totalTeachers: number;
    totalSubjects: number;
    totalEnrollments: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { 
        schoolName,
        totalStudents, 
        totalCourses, 
        totalTeachers, 
        totalSubjects, 
        totalEnrollments 
    } = usePage<DashboardProps>().props;

    const stats = [
        {
            title: 'Total Students',
            count: totalStudents,
            icon: Users,
            link: '/students',
            bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
        },
        {
            title: 'Total Teachers',
            count: totalTeachers,
            icon: UserCheck,
            link: '/teachers',
            bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
        },
        {
            title: 'Total Courses',
            count: totalCourses,
            icon: BookOpen,
            link: '/courses',
            bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
        },
        {
            title: 'Total Subjects',
            count: totalSubjects,
            icon: GraduationCap,
            link: '/teachers',
            bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
        },
        {
            title: 'Total Enrollments',
            count: totalEnrollments,
            icon: Calendar,
            link: '/enrollments',
            bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {schoolName}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        School Management Dashboard
                    </p>
                </div>

                {/* Stats Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                        Overview Statistics
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Link key={index} href={stat.link}>
                                    <Card className={`${stat.bgColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden`}>
                                        <div className="p-6 relative">
                                            <div className="flex items-center justify-between relative z-10">
                                                <div>
                                                    <p className="text-white/90 text-sm font-medium mb-2">
                                                        {stat.title}
                                                    </p>
                                                    <p className="text-3xl font-bold text-white">
                                                        {stat.count}
                                                    </p>
                                                </div>
                                                <div className="text-white/80">
                                                    <Icon className="h-10 w-10" />
                                                </div>
                                            </div>
                                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                                <Icon className="h-20 w-20" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Summary */}
                <Card className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {totalEnrollments}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Active Enrollments
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {totalTeachers > 0 ? Math.round(totalStudents / totalTeachers) : 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Students per Teacher
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {totalCourses > 0 ? Math.round(totalEnrollments / totalCourses) : 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Enrollments per Course
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}