import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const toggle = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    const navItems = [
        { to: "/posts", label: "Posts" },
        { to: "/profile", label: "Profile" },
        { to: "/addOrg", label: "Organization" },
        { to: "/", label: "Map" },
        { to: "/signup", label: "Signup" },
        { to: "/logout", label: "Logout", danger: true },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FFFACD] dark:bg-neutral-800 shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                <Link
                    to="/dashboard"
                    className="text-2xl sm:text-3xl font-extrabold text-[#002d1f] dark:text-lime-300"
                >
                    VanaEcho
                </Link>

                <nav className="hidden md:flex gap-4 lg:gap-6 text-lg font-semibold text-[#002d1f] dark:text-neutral-100">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={closeMenu}
                            extra={item.danger ? "hover:bg-red-500 hover:text-white dark:hover:text-white" : ""}
                            isActive={location.pathname === item.to}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Hamburger */}
                <button
                    onClick={toggle}
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                    <span className="sr-only">Toggle menu</span>
                    <motion.div
                        initial={false}
                        animate={open ? "open" : "closed"}
                        className="relative w-6 h-6"
                    >
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: 45, y: 6 },
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute h-0.5 w-full bg-black dark:bg-white top-1"
                        />
                        <motion.span
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute h-0.5 w-full bg-black dark:bg-white top-2.5"
                        />
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: -45, y: -6 },
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute h-0.5 w-full bg-black dark:bg-white top-4"
                        />
                    </motion.div>
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#FFFACD] dark:bg-neutral-800 overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-2 flex flex-col gap-2 text-lg font-semibold text-[#002d1f] dark:text-neutral-100">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMenu}
                                    mobile
                                    extra={item.danger ? "hover:bg-red-500 hover:text-white dark:hover:text-white" : ""}
                                    isActive={location.pathname === item.to}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    extra?: string;
    onClick?: () => void;
    mobile?: boolean;
    isActive?: boolean;
}

const NavLink = ({
    to,
    children,
    extra = "",
    onClick,
    mobile = false,
    isActive = false,
}: NavLinkProps) => (
    <Link
        to={to}
        onClick={onClick}
        className={`rounded-3xl px-4 py-2 lg:px-6 lg:py-2 transition-colors ${mobile ? "block w-full" : "text-center"
            } ${isActive ? "bg-[#002d1f]/10 dark:bg-lime-600/20" : ""} hover:bg-[#002d1f]/10 dark:hover:bg-lime-700/30 ${extra}`}
    >
        {children}
    </Link>
);

export default NavBar;
