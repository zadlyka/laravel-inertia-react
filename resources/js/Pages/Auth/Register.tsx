import { FormEventHandler, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit} className="space-y-6">
                <div className="grid items-center w-full gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

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
                    Register
                </Button>

                <div className="flex items-center justify-center">
                    <p className="text-sm">
                        Already have an account ?{" "}
                        <a className="font-bold" href="/login">
                            Login
                        </a>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
