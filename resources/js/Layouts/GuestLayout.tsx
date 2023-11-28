import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-0 bg-gray-100 sm:px-0">
            <div className="w-full p-8 bg-white border rounded-lg shadow-sm sm:max-w-md border-slate-200 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
                <div className="flex justify-center p-6">
                    <Link href="/">
                        <ApplicationLogo className="w-auto fill-current h-7" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
