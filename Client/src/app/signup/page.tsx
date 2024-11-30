"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSignUp } from "../hooks/auth/useAuth";
import { UserForm } from "../components/Forms/useForm";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const signUpMutation = useSignUp();

  const onSignUpSubmit = async (data: any) => {
    try {
      await signUpMutation.mutateAsync(data);
      router.push("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader>
          <h2 className="text-center text-3xl font-bold">Sign Up</h2>
        </CardHeader>
        <CardContent>
          <UserForm onSubmit={onSignUpSubmit} />
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
