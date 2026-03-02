"use client";

import { useState } from "react";
import AuthorForm from "../components/UI/AuthForm";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const nameRegex = /^[A-Za-z0-9_]{1,8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  const handlRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/author/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userEmail: email,
        userPassword: password,
        userName: userName,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!nameRegex.test(userName)) {
      newErrors.nameError = "Имя: максимум 8 символов, буквы, цифры и _";
    }
    if (!emailRegex.test(email)) {
      newErrors.emailError = "Некорректный email";
    }
    if (!passwordRegex.test(password)) {
      newErrors.passwordError =
        "Пароль: 8+ символов, A-Z, a-z, цифра и спецсимвол";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      />
    </>
  );
}
