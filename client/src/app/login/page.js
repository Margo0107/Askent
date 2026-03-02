"use client";
//login page
import AuthorForm from "../components/UI/AuthForm";
import { useAuthForm } from "../components/hooks/useAuthForm";

export default function Login() {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    validate,
  } = useAuthForm;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/author/login", {
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
      />
    </>
  );
}
