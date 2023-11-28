import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>();
    const currentPasswordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={cn("space-y-6", className)}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div className="grid items-center w-full gap-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input
                        id="current_password"
                        type="password"
                        name="current_password"
                        placeholder="Current Password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="grid items-center w-full gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing}>
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
