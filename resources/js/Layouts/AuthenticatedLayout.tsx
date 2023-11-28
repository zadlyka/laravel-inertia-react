import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Menu } from "lucide-react";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white">
                <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <Button
                                variant={"ghost"}
                                size="icon"
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                            >
                                <Menu className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                            <div className="flex items-center flex-shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="block w-auto h-5 fill-current" />
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link
                                        href="#"
                                        className="px-3 py-2 text-sm font-medium rounded-md hover:text-white hover:bg-gray-900"
                                        aria-current="page"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent collisionPadding={10}>
                                    <DropdownMenuLabel>
                                        {user.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link href="/profile">
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <DropdownMenuItem>
                                            Logout
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "sm:hidden",
                        !showingNavigationDropdown ? "hidden" : "block"
                    )}
                    id="mobile-menu"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="#"
                            className="block px-3 py-2 text-base font-medium rounded-md hover:text-white hover:bg-gray-900"
                            aria-current="page"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
