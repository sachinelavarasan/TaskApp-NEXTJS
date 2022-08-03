import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { authSelector } from "../redux/Slices/authSlice";
import { TextInput } from "../components/TextInput";

const signupSchema = Yup.object().shape({
  password: Yup.string().required("Password required"),
  name: Yup.string().required("Name required"),
  email: Yup.string().email().required("Enter valid email address"),
});

const Register = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useSelector(authSelector);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    onSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const details = {
        ...values,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "success") {
        return router.push("/");
      }
      if (data.error) {
        setErrorMessage(data.error);
      }
    },
  });

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black flex-col">
      <h2 className="text-white mb-3 text-[24px]">SignUp</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-[400px]">
        <div>
          {errorMessage && (
            <p className="text-red-500 text-[16px] capitalize font-medium">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="mb-2">
          <TextInput
            id="name"
            label="Name"
            placeholder="Enter your name"
            type="text"
            errorMessage={errors?.name}
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="mb-2">
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter your email address"
            type="text"
            errorMessage={errors?.email}
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="mb-4">
          <TextInput
            id="password"
            label="Password"
            placeholder="Enter Passsword"
            type="password"
            errorMessage={errors?.password}
            onChange={handleChange}
            value={values.password}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-sky-800 hover:bg-sky-600 font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
          >
            Register
          </button>
          <Link href="/">
            <a className="font-bold text-sm text-sky-800  hover:text-blue-600 mt-4">
              Already Have an Account ?
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
