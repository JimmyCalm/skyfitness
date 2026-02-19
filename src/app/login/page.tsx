"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { loginUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/api/types";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { token, user } = await loginUser(data.email, data.password);
      login(token, user);
      toast.success("Успешный вход!", {
        description: "Добро пожаловать обратно!",
      });
      router.push("/profile");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Неверный email или пароль";
      toast.error("Ошибка входа", {
      description: errorMessage,
    });
    }
  };

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>Ввойдите в свой аккаунт</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Пароль"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
