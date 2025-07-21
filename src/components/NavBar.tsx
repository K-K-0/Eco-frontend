import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#fdfce8] dark:bg-[#1c1f24] shadow-md backdrop-blur-lg transition-all">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                <a
                    href="/dashboard"
                    className="text-2xl sm:text-3xl font-extrabold text-[#002d1f] dark:text-lime-400"
                >
                    VanaEcho
                </a>

                <nav className="hidden md:flex gap-4 lg:gap-6 text-lg font-medium text-[#002d1f] dark:text-gray-100">
                    <NavLink to="/posts" onClick={closeMenu}>Posts</NavLink>
                    <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
                    <NavLink to="/addOrg" onClick={closeMenu}>Organization</NavLink>
                    <NavLink to="/" onClick={closeMenu}>Map</NavLink>
                    <NavLink to="/signup" onClick={closeMenu}>Signup</NavLink>
                    <NavLink
                        to="/logout"
                        onClick={closeMenu}
                        extra="hover:bg-red-500/90 hover:text-white"
                    >
                        Logout
                    </NavLink>
                </nav>

                <button
                    onClick={toggle}
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                >
                    <span className="sr-only">Open main menu</span>
                    {!open ? (
                        <svg className="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-[#fdfce8] dark:bg-[#22262c] shadow-inner"
                    >
                        <div className="px-4 pb-4 pt-2 flex flex-col gap-3 text-lg font-medium text-[#002d1f] dark:text-gray-100">
                            <NavLink to="/posts" onClick={closeMenu} mobile>Posts</NavLink>
                            <NavLink to="/profile" onClick={closeMenu} mobile>Profile</NavLink>
                            <NavLink to="/addOrg" onClick={closeMenu} mobile>Organization</NavLink>
                            <NavLink to="/" onClick={closeMenu} mobile>Map</NavLink>
                            <NavLink to="/signup" onClick={closeMenu} mobile>Signup</NavLink>
                            <NavLink
                                to="/logout"
                                onClick={closeMenu}
                                extra="hover:bg-red-500/90 hover:text-white"
                                mobile
                            >
                                Logout
                            </NavLink>
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
}

const NavLink = ({ to, children, extra = "", onClick, mobile = false }: NavLinkProps) => (
    <Link
        to={to}
        onClick={onClick}
        className={`
            rounded-xl px-4 py-2 lg:px-6 transition-all duration-200 ease-in-out
            ${mobile ? "block w-full text-left" : "text-center"}
            hover:bg-lime-300/30 dark:hover:bg-lime-600/20
            ${extra}
        `}
    >
        {children}
    </Link>
);

export default NavBar;
