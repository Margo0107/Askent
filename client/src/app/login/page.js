"use client";
//login page

import { useRouter } from "next/navigation";
import AuthorForm from "../components/UI/AuthForm";
import { useAuthApi } from "../components/hooks/useAuthApi";
import { useAuthForm } from "../components/hooks/useAuthForm";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/home");
    }
  }, [router]);

  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    validate,
  } = useAuthForm();

  const { login } = useAuthApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = await login({
        userEmail: email,
        userPassword: password,
        userName: userName,
      });

      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        router.push("/home");
      }
    } catch (error) {
      console.log(error.messsage);
    }
  };

  return (
    <>
      <AuthorForm
        titleH1="Login"
        titleBtn="Sing In"
        onSubmit={handleLogin}
        nameValue={userName}
        emailValue={email}
        passwordValue={password}
        onNameChange={(e) => setUserName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        errors={errors}
      >
        {" "}
        <p className="text-center text-lg">
          Нет аккаунта?{" "}
          <Link href={"/register"} className="text-violet-600">
            Зарегистрироваться
          </Link>
        </p>{" "}
      </AuthorForm>
    </>
  );
}
