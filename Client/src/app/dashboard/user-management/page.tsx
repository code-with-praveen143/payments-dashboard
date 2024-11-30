"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSignUp } from "@/app/hooks/auth/useAuth";
import { useGetUsers } from "@/app/hooks/userMangementData/useGetUsers";
import { UserForm } from "@/app/components/Forms/useForm";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["admin", "accountant"]),
});

type SignupRequest = z.infer<typeof signUpSchema>;

export default function UserManagementComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<SignupRequest>({
    resolver: zodResolver(signUpSchema),
  });

  const { data: users, isLoading } = useGetUsers();

  const signUpMutation = useSignUp();

  const onSignUpSubmit = async (data: any) => {
    try {
      await signUpMutation.mutateAsync(data);
      toast.success("User has been added successfully.");
      setIsModalOpen(false);
      resetForm();
      router.refresh();
    } catch (error) {
      setError("Signup failed. Please try again.");
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[28px] heading text-neutral-900">
          User Management
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          className="gap-1 bg-blue-500 hover:bg-blue-600 rounded-full px-6"
        >
          Add
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#EBF3FA]">
              <TableHead className="w-[100px] border-x border-b">
                S.No
              </TableHead>
              <TableHead className="border-x border-b">Staff Code</TableHead>
              <TableHead className="border-x border-b">
                Accountant Name
              </TableHead>
              <TableHead className="border-x border-b">E-mail id</TableHead>
              <TableHead className="border-x border-b">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="even:bg-[#EBF3FA]/30">
                    <TableCell className="border-x">
                      <div className="h-4 w-8 skeleton bg-gray-300 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="border-x">
                      <div className="h-4 w-16 skeleton bg-gray-300 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="border-x">
                      <div className="h-4 w-24 skeleton bg-gray-300 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="border-x">
                      <div className="h-4 w-32 skeleton bg-gray-300 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="border-x">
                      <div className="h-4 w-20 skeleton bg-gray-300 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              : users?.map((user, index) => (
                  <TableRow key={user._id} className="even:bg-[#EBF3FA]/30">
                    <TableCell className="font-medium border-x">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-x">{user._id}</TableCell>
                    <TableCell className="border-x">{user.name}</TableCell>
                    <TableCell className="border-x">{user.email}</TableCell>
                    <TableCell className="border-x">{user.role}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4"
            >
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <UserForm onSubmit={onSignUpSubmit} />
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
