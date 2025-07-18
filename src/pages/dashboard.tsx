import { Link, Navigate } from "react-router-dom";
import image from "../assets/undraw_connected-world_anke.svg";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/loader";

/**
 * Dashboard Page – responsive redesign (mobile‑first, dark‑mode aware) ❄️
 * ⚠️ Logic untouched; Tailwind classes only.
 */

const Dashboard = () => {
    const auth = useAuth();
    const { isAuthenticated, loading } = auth ?? {};

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader />
        </div>
    );

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFACD] text-gray-800 dark:bg-neutral-900 dark:text-neutral-100">
            {/* ───── Top Nav ───── */}
            <nav className="sticky top-0 z-50 w-full bg-[#FFFACD]/80 dark:bg-neutral-800/80 backdrop-blur shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-4">
                    <a
                        href="/dashboard"
                        className="text-2xl sm:text-3xl font-extrabold text-[#002d1f] dark:text-green-400"
                    >
                        VanaEcho
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex gap-4 sm:gap-6 items-center text-lg sm:text-xl font-medium">
                        <NavLink to="/posts" label="Posts" />
                        <NavLink to="/profile" label="Profile" />
                        <NavLink to="/addOrg" label="Organization" />
                        <NavLink to="/" label="Map" />
                        <NavLink to="/signup" label="Signup" />
                        <NavLink
                            to="/logout"
                            label="Logout"
                            extra="hover:bg-red-500 hover:text-white dark:hover:text-white"
                        />
                    </div>

                    {/* Mobile hamburger */}
                    <input id="nav-toggle" type="checkbox" className="peer hidden" title="Toggle navigation menu" />
                    <label
                        htmlFor="nav-toggle"
                        className="md:hidden flex flex-col gap-[6px] cursor-pointer"
                    >
                        <span className="w-6 h-[3px] bg-current"></span>
                        <span className="w-6 h-[3px] bg-current"></span>
                        <span className="w-6 h-[3px] bg-current"></span>
                    </label>

                    {/* Mobile drawer */}
                    <div className="peer-checked:max-h-64 max-h-0 overflow-hidden transition-all duration-300 w-full md:hidden">
                        <div className="flex flex-col gap-3 py-4 text-lg font-medium">
                            <NavLink to="/posts" label="Posts" mobile />
                            <NavLink to="/profile" label="Profile" mobile />
                            <NavLink to="/addOrg" label="Organization" mobile />
                            <NavLink to="/" label="Map" mobile />
                            <NavLink to="/signup" label="Signup" mobile />
                            <NavLink to="/logout" label="Logout" mobile extra="hover:bg-red-500 hover:text-white" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* ───── Hero Section ───── */}
            <main className="flex-1 bg-lime-300 dark:bg-lime-800">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 py-16 lg:py-24">
                    {/* Text side */}
                    <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#002d1f] dark:text-lime-200 leading-tight">
                            Let's create Earth
                            <span className="mt-4 inline-block bg-gray-700 dark:bg-neutral-900 text-[#FFFACD] px-4 py-3 rounded-xl">
                                FOR FUTURE
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl font-semibold max-w-prose mx-auto lg:mx-0">
                            Planting a tree might seem like a small act, but it’s a bold statement that you believe in the future of this planet.
                        </p>
                    </div>

                    {/* Illustration */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <img
                            src={image}
                            alt="Connected world illustration"
                            className="w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

/* ──────────────────────────────────── */
/** Small component to keep nav links DRY */
interface NavLinkProps {
    to: string;
    label: string;
    extra?: string;
    mobile?: boolean;
}
const NavLink = ({ to, label, extra = "", mobile = false }: NavLinkProps) => (
    <Link
        to={to}
        className={`rounded-3xl px-6 py-2 transition-colors ${mobile ? "text-left" : "text-center"
            } hover:bg-[#002d1f]/10 dark:hover:bg-lime-700/30 ${extra}`}
    >
        {label}
    </Link>
);

export default Dashboard;
