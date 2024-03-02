"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, Spinner } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  LoginSchema,
  TLoginSchema,
  TRegisterSchema,
} from "@/lib/validators/account-credentials-validators";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { login } from "@/action/login";
import { Eye, EyeOff, Github, GoalIcon } from "lucide-react";
import { DEFAUTL_LOGIN_REDIRECT } from "@/all-routes";

const SignInPage = () => {
  const [isPending, startTransition] = useTransition();
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onAuthClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: DEFAUTL_LOGIN_REDIRECT,
    });
  };

  const onSubmit = (formData: TLoginSchema) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(formData).then((data) => {
        setError(data?.error);
      });
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full flex items-center overflow-hidden justify-center md:w-1/2 h-[40vh] md:h-screen bg-[#f3f5f7]">
        <Link href={"/"} className="absolute top-5 font-bold text-2xl">
          Elegant
        </Link>
        <Image
          src="/images/authchair.png"
          width={450}
          height={450}
          alt="chair"
        />
      </div>
      <div className="w-full md:w-1/2 flex px-8 md:px-20 items-center justify-center h-[60vh] md:h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link className="font-normal text-green-300" href={"/sign-up"}>
              Sign up
            </Link>
          </p>

          <div>
            <Input
              disabled={isPending}
              {...register("email")}
              variant="underlined"
              label="Email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              disabled={isPending}
              {...register("password")}
              type={togglePassword ? "text" : "password"}
              variant="underlined"
              label="Password"
              endContent={
                <button
                  type="button"
                  onClick={() => setTogglePassword(!togglePassword)}
                >
                  {togglePassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              }
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            size={"lg"}
            disabled={isPending}
            className="w-full font-semibold space-x-3"
          >
            {isPending && <Spinner color="white" size="sm" className="mr-4" />}
            Sign in
          </Button>
          <Button
            onClick={() => {
              onAuthClick("github");
            }}
            variant={"outline"}
            disabled={isPending}
            className="w-full space-x-3"
          >
            {isPending && <Spinner color="white" size="sm" className="mr-4" />}
            <Github />
          </Button>
          <Button
            onClick={() => {
              onAuthClick("google");
            }}
            variant={"outline"}
            disabled={isPending}
            className="w-full space-x-3"
          >
            {isPending && <Spinner color="white" size="sm" className="mr-4" />}
            <GoalIcon />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
