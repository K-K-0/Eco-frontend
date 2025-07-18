import { Link } from "react-router-dom";
import { useState } from "react";



const NavBar = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#FFFACD] dark:bg-neutral-800 shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

                <a
                    href="/dashboard"
                    className="text-2xl sm:text-3xl font-extrabold text-[#002d1f] dark:text-lime-300"
                >
                    VanaEcho
                </a>

                
                <nav className="hidden md:flex gap-4 lg:gap-6 text-lg font-semibold text-[#002d1f] dark:text-neutral-100">
                    <NavLink to="/posts" onClick={closeMenu}>Posts</NavLink>
                    <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
                    <NavLink to="/addOrg" onClick={closeMenu}>Organization</NavLink>
                    <NavLink to="/" onClick={closeMenu}>Map</NavLink>
                    <NavLink to="/signup" onClick={closeMenu}>Signup</NavLink>
                    <NavLink
                        to="/logout"
                        onClick={closeMenu}
                        extra="hover:bg-red-500 hover:text-white dark:hover:text-white"
                    >
                        Logout
                    </NavLink>
                </nav>

                
                <button
                    onClick={toggle}
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className={`h-6 w-6 ${open ? "hidden" : "block"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg
                        className={`h-6 w-6 ${open ? "block" : "hidden"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            
            <nav
                className={`md:hidden overflow-hidden transition-max-h duration-300 ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="px-4 pb-4 flex flex-col gap-2 text-lg font-semibold text-[#002d1f] dark:text-neutral-100">
                    <NavLink to="/posts" onClick={closeMenu} mobile>Posts</NavLink>
                    <NavLink to="/profile" onClick={closeMenu} mobile>Profile</NavLink>
                    <NavLink to="/addOrg" onClick={closeMenu} mobile>Organization</NavLink>
                    <NavLink to="/" onClick={closeMenu} mobile>Map</NavLink>
                    <NavLink to="/signup" onClick={closeMenu} mobile>Signup</NavLink>
                    <NavLink
                        to="/logout"
                        onClick={closeMenu}
                        extra="hover:bg-red-500 hover:text-white dark:hover:text-white"
                        mobile
                    >
                        Logout
                    </NavLink>
                </div>
            </nav>
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
        className={`rounded-3xl px-4 py-2 lg:px-6 lg:py-2 transition-colors ${mobile ? "block w-full" : "text-center"
            } hover:bg-[#002d1f]/10 dark:hover:bg-lime-700/30 ${extra}`}
    >
        {children}
    </Link>
);

export default NavBar;
