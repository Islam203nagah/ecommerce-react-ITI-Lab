import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuthStore } from "@/store/useThemeStore"

export function LoginForm({
  
  className,
  ...props
}) {
  const { login } = useAuthStore()
  
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password is required"),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })



  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const fakeToken = "fake-jwt-token-123"; // simulate API response
    login(fakeToken);
    localStorage.setItem("token", fakeToken);
    alert("Login successful!");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" {...register("email",{required:true,pattern:/^\S+@\S+\.\S+$/})}/>
                {errors.email && (
                <FieldDescription className="ml-auto inline-block text-sm text-red-500">
                  {errors.email.message}
                </FieldDescription>)}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  
                </div>
                <Input id="password" type="password"{...register("password",{required:true,minLength:8,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/})} />
                {errors.password && (
                <FieldDescription className="ml-auto inline-block text-sm text-red-500">
                  {errors.password.message}
                </FieldDescription>)}
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
