"use client";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const AuthorForm = (props) => {
  const [passType, setPassType] = useState("password");
  const iconPass = () => {
    if (passType === "password") {
      setPassType("text");
    } else {
      setPassType("password");
    }
  };
  const {
    titleH1,
    titleBtn,
    onSubmit,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    nameValue,
    emailValue,
    passwordValue,
    errors,
  } = props;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/bg-register.jpg)] bg-cover bg-center">
      <form
        onSubmit={onSubmit}
        className="px-[15px] flex justify-between gap-6 flex-col w-[430px] min-h-[390px]"
      >
        <h1 className="text-4xl font-bold text-center">{titleH1}</h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <input
              onChange={onNameChange}
              value={nameValue}
              placeholder="name"
              className={`bg-white text-lg w-full px-[10px] border-b-3 focus:outline-none rounded-lg min-h-[50px] ${errors?.nameError ? "border-red-500" : "border-violet-600"}`}
            />
            {errors?.nameError && (
              <p className="text-red-500 text-sm">{errors.nameError}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <input
              onChange={onEmailChange}
              value={emailValue}
              placeholder="email"
              className={`bg-white text-lg w-full px-[10px] border-b-3 focus:outline-none rounded-lg min-h-[50px] ${errors?.emailError ? "border-red-500" : "border-violet-600"}`}
            />
            {errors?.emailError && (
              <p className="text-red-500 text-sm">{errors.emailError}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <input
                type={passType}
                onChange={onPasswordChange}
                placeholder="password"
                value={passwordValue}
                className={`bg-white text-lg w-full px-[10px] border-b-3 focus:outline-none rounded-lg min-h-[50px] ${errors?.passwordError ? "border-red-500" : "border-violet-600"}`}
              />
              {passType === "password" ? (
                <AiOutlineEye
                  size={28}
                  onClick={iconPass}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-violet-600 hover:text-violet-800 transition"
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={28}
                  onClick={iconPass}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-violet-600 hover:text-violet-800 transition"
                />
              )}
            </div>
            {errors?.passwordError && (
              <p className="text-red-500 text-sm">{errors.passwordError}</p>
            )}
          </div>
        </div>

        <button
          className="w-full bg-violet-600 hover:bg-violet-400 text-white text-2xl font-bold px-[10px] rounded-lg transition duration-400 min-h-[50px] cursor-pointer"
          type="submit"
        >
          {titleBtn}
        </button>
      </form>
    </div>
  );
};
export default AuthorForm;
