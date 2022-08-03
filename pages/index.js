import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setError, setUser, authSelector } from "../redux/Slices/authSlice";
import { TextInput } from "../components/TextInput";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  password: Yup.string().required("Password required"),
  email: Yup.string().email().required("Enter valid email address"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
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
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const details = {
        ...values,
        redirect: false,
      };

      const result = await signIn("credentials", details);

      if (!result.error) {
        const session = await getSession();
        dispatch(setUser(session));
        router.replace("/dashboard");
      } else {
        dispatch(setError(result.error));
        setErrorMessage(result.error);
      }
    },
  });

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black flex-col">
      <h2 className="text-white mb-3 text-[24px]">Signin</h2>
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
        <div className="flex items-center flex-col justify-between">
          <button
            className="bg-sky-800 hover:bg-sky-600 font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
          >
            Sign In
          </button>
          <Link href="/register">
            <a className="font-bold text-sm text-sky-800  hover:text-blue-600 mt-4">
              Register
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
