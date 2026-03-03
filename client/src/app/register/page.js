"use client";
//registration page
import { useRouter } from "next/navigation";
import AuthorForm from "../components/UI/AuthForm";
import { useAuthApi } from "../components/hooks/useAuthApi";
import { useAuthForm } from "../components/hooks/useAuthForm";
import Link from "next/link";
import { useEffect } from "react";

export default function Register() {
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

  const { register } = useAuthApi();

  const handlRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = await register({
        userEmail: email,
        userPassword: password,
        userName: userName,
      });

      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/home");
      }
    } catch (error) {
      console.log(error.messsage);
    }
  };
  return (
    <>
      <AuthorForm
        titleH1="Registragion"
        titleBtn="Sing In"
        onSubmit={handlRegister}
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
          Уже есть аккаунт?{" "}
          <Link href={"/login"} className="text-violet-600">
            Войти
          </Link>
        </p>
      </AuthorForm>
    </>
  );
}
