"use client";
import { useState } from "react";
export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [errors, setErrors] = useState({});

  const nameRegex = /^[A-Za-z0-9_]{7,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  const validate = () => {
    let newErrors = {};

    if (!nameRegex.test(userName)) {
      newErrors.nameError = "Имя: минимум 7, максимум 8 символов, буквы, цифры и _";
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

  return {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    validate,
  };
};
