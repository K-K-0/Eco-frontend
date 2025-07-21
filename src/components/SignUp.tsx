import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Signup2Props {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: ``;
}

const SignUp = ({
  heading = "Sign Up",
  subheading = "Create a new account to get started",
  logo = {
    url: "#",
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "Logo",
    title: "App Logo",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "http://localhost:5173/login",
}: Signup2Props) => {

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [, setError] = useState("");
  const navigate = useNavigate();

  const HandleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${BASE_URL}/api/auth/register`, form, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-muted flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          {/* Logo */}
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} title={logo.title} className="mx-auto h-12" />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{heading}</h1>
          <p className="text-sm text-muted-foreground">{subheading}</p>
        </div>

        <div className="bg-white rounded-lg shadow px-6 py-8 space-y-6">
          <form onSubmit={Submit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={HandleChanges}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Choose a username"
                required
                value={form.username}
                onChange={HandleChanges}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={HandleChanges}
              />
            </div>
            <Button type="submit" className="w-full">
              {signupText}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button className="w-full flex items-center justify-center gap-2" variant="outline">
            <FcGoogle className="text-xl" />
            {googleText}
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {loginText}
          <a href={loginUrl} className="ml-1 font-medium text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export { SignUp };
