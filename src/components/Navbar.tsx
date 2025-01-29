import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">To-Do App</h1>
            <div>
                <Link href="/">Home</Link>
                <Link href="/api/auth/login" className="ml-4">
                    Login
                </Link>
                <Link href="/api/auth/signup" className="ml-4">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}
