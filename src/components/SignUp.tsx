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
  loginUrl?: `http://localhost:5173/login`;
}

const SignUp = ({
  heading = "Signup",
  subheading = "Create a new account",
  logo = {
    url: "#",
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "#",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "http://localhost:5173/login",
}: Signup2Props) => {

  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [, setError] = useState("")
  const navigate = useNavigate()


  const HandleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL
      await axios.post(`${BASE_URL}/api/auth/register`, form, { withCredentials: true })
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href="#">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12"
                />
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>
          <div className="flex w-full flex-col gap-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
            <form onSubmit={Submit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="bg-white"
                    value={form.email}
                    onChange={HandleChanges}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Username</Label>
                  <Input
                    type="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    className="bg-white"
                    value={form.username}
                    onChange={HandleChanges}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="bg-white"
                    value={form.password}
                    onChange={HandleChanges}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="mt-2 w-full">
                    {signupText}
                  </Button>
                  <Button className="w-full">
                    <FcGoogle className="mr-2 size-5" />
                    {googleText}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="font-medium text-primary hover:underline"
            >
              login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SignUp };
