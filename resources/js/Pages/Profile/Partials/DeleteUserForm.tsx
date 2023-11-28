import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Dialog>
                <DialogTrigger
                    className={cn(buttonVariants({ variant: "destructive" }))}
                >
                    Delete Account
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Please enter
                            your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={deleteUser} className="space-y-6">
                        <div className="grid items-center w-full gap-2">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>
                        <DialogFooter className="flex gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant={"secondary"}>
                                    Close
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={processing}
                                variant="destructive"
                            >
                                Delete Account
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
