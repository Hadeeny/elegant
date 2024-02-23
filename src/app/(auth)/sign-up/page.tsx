"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  TRegisterSchema,
} from "@/lib/validators/account-credentials-validators";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { register as signUp } from "@/action/register";

const SignUpPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (formData: TRegisterSchema) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signUp(formData).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full flex items-center overflow-hidden justify-center md:w-1/2 h-[40vh] md:h-screen bg-[#f3f5f7]">
        <h2 className="absolute top-5 font-bold text-2xl">Elegant</h2>
        <Image
          src="/images/authchair.png"
          width={450}
          height={450}
          alt="chair"
        />
      </div>
      <div className="w-full md:w-1/2 flex px-8 md:px-20 items-center justify-center h-[60vh] md:h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <h2 className="text-2xl font-bold">Sign up</h2>
          <p>
            Already have an account?{" "}
            <Link className="font-bold" href={"/sign-in"}>
              Sign in
            </Link>
          </p>
          <Input
            variant="underlined"
            disabled={isPending}
            {...register("name")}
            placeholder="Your name"
          />
          <Input
            variant="underlined"
            disabled={isPending}
            {...register("username")}
            placeholder="Username"
          />
          <div>
            <Input
              variant="underlined"
              disabled={isPending}
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              variant="underlined"
              disabled={isPending}
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled={isPending} id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-normal text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree with{" "}
              <Link className="text-black font-medium" href={"/"}>
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="text-black font-medium" href={"/"}>
                Terms of use
              </Link>
            </label>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="w-full">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
