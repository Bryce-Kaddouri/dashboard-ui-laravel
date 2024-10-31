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
import { InputPassword } from "@/Components/ui/input-password";
import { Label } from "@/Components/ui/label";
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertClose,
  AlertDescription,
  AlertTitle,
} from "@/Components/ui/alert";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [errorAlert, setErrorAlert] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            onError: (errors: any) => {
               
                setErrorAlert(errors.email);
            },
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <Card className="mx-auto max-w-sm">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    {errorAlert && (
                <Alert variant="destructive_dismissible" className="mb-4" >
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {errorAlert}
                    </AlertDescription>
                    <AlertClose />
                </Alert>
            )}
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href={route('password.request')} className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <InputPassword
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <div className="text-red-600 mt-2">{errors.password}</div>
                            </div>
                            <Button type="submit" className="w-full" disabled={processing}>
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href={route('register')} className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Card>
        </div>
    );
}
