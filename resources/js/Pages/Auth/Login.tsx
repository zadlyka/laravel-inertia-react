import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={submit} className="space-y-6">
                <div className="grid items-center w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid items-center w-full gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <Button className="w-full" disabled={processing}>
                    Log in
                </Button>

                <div className="flex items-center justify-center">
                    <p className="text-sm">
                        Don`t have an account ?{" "}
                        <a className="font-bold" href="/register">
                            Register
                        </a>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
