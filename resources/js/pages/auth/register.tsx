import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <Form
    {...RegisteredUserController.store.form()}
    resetOnSuccess={['password', 'password_confirmation']}
    disableWhileProcessing
    className="flex flex-col gap-6"
>
    {({ processing, errors }) => (
        <>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" required autoFocus name="name" placeholder="Full name" />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" required name="email" placeholder="email@example.com" />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required name="password" placeholder="Password" />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>
                    <Input id="password_confirmation" type="password" required name="password_confirmation" placeholder="Confirm password" />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="school_name">School Name</Label>
                    <Input id="school_name" type="text" required name="school_name" placeholder="School name" />
                    <InputError message={errors.school_name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="address">School Address</Label>
                    <Input id="address" type="text" required name="address" placeholder="School address" />
                    <InputError message={errors.address} />
                </div>

                <Button type="submit" className="mt-2 w-full">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Create account
                </Button>
            </div>
        </>
    )}
</Form>

        </AuthLayout>
    );
}
