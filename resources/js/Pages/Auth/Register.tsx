import Link from "next/link";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { InputPassword } from "@/Components/ui/input-password";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onError: (error) => {
                console.error("Erreur lors de l'enregistrement:", error);
            },
        });
    };

    const isPasswordMatching = data.password === data.password_confirmation && data.password !== '';

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <Head title="Register" />
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>
                    Please fill in the details below to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit}>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <div className="text-red-600 mt-2">{errors.name}</div>}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="text-red-600 mt-2">{errors.email}</div>}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>
                        <InputPassword
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <div className="text-red-600 mt-2">{errors.password}</div>}
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <InputPassword
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                        {errors.password_confirmation && <div className="text-red-600 mt-2">{errors.password_confirmation}</div>}
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                    <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>
                    </div>

                    <div className="mt-4 w-full">
                        <Button className="w-full" disabled={processing || !isPasswordMatching}>
                            Register
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        </div>
    );
}
