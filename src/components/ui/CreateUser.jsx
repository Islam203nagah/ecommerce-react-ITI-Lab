import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";
import { createUser } from "@/service/api";

const userSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  username: z.string().min(3, "Username required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone required"),
  age: z.number().min(1, "Age required"),
  gender: z.string().min(1, "Gender required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  // watch values for preview
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const username = watch("username");
  const email = watch("email");
  const phone = watch("phone");
  const age = watch("age");
  const gender = watch("gender");

  const onSubmit = async (data) => {
    try {
      await createUser(data)

      toast.success("User created successfully", {
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });
    } catch {
      toast.error("Failed to create user", {
        style: {
          background: "#dc2626",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 my-10">
      
      {/* FORM */}
      <Card className="col-span-2 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <h2 className="text-xl font-bold">Create User</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input placeholder="First Name" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Input placeholder="Last Name" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <Input placeholder="Username" {...register("username")} />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Age"
              {...register("age", { valueAsNumber: true })}
            />

            <select
              {...register("gender")}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <Input placeholder="Phone" {...register("phone")} />

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          <Button type="submit" className="w-full">
            Create User
          </Button>
        </form>
      </Card>

      {/* LIVE PREVIEW */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Live Preview</h3>

        <div className="border rounded-lg p-4 space-y-2">
          <p>
            <strong>Name:</strong>{" "}
            {firstName || "First"} {lastName || "Last"}
          </p>

          <p>
            <strong>Username:</strong> {username || "username"}
          </p>

          <p>
            <strong>Email:</strong> {email || "example@email.com"}
          </p>

          <p>
            <strong>Phone:</strong> {phone || "+000000"}
          </p>

          <p>
            <strong>Age:</strong> {age || "0"}
          </p>

          <p>
            <strong>Gender:</strong> {gender || "unknown"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CreateUser;