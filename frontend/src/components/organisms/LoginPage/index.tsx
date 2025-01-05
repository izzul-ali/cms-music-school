import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { Button } from "@mui/material"
import { toast } from "react-toastify"
import { signIn } from "next-auth/react"
import InputEmailForm from "@/components/atoms/Forms/EmailInputForm"
import InputPasswordForm from "@/components/atoms/Forms/PasswordInputForm"

// Yup Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter your email address!")
    .email("Wrong email format"),
  password: Yup.string().required("Enter your password!").min(8),
})

export type FormLoginSchema = Yup.InferType<typeof validationSchema>

export default function LoginPage() {
  const router = useRouter()

  // Form Validation with react-hook-form
  const { handleSubmit, control, setError } = useForm<FormLoginSchema>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorResponse, setErrorResponse] = useState<{
    type: "not_registered" | "email_passowrd"
    message: string
  }>()

  // Handle login request
  async function onSubmit(value: { email: string; password: string }) {
    setIsLoading(true)

    const resp = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
    })

    if (!resp?.ok || resp.error) {
      if (resp?.error === "Incorrect email or password!") {
        const message = "Email or Password wrong"
        setErrorResponse({ message, type: "email_passowrd" })
        setError("password", { message, type: "onChange" })
        setError("email", { message, type: "onChange" })
      } else {
        toast.error("Failed to login")
      }

      setIsLoading(false)
      return
    }

    // Redirected to the dashboard page on successful login
    router.replace("/")
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-[450px] w-full mx-5">
        <h1 className="font-bold text-xl">Login to your account</h1>
        <p className="text-xs font-medium text-neutral70 mt-1">
          Enter your email & password to login
        </p>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputEmailForm
            useAbsoluteError
            control={control}
            label="Email"
            name="email"
            htmlFor="email"
            placeholder="example@mail.com"
            allowAutoComplete
            hideError={errorResponse?.type === "email_passowrd"}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(onSubmit)()
            }}
          />

          <div className="mt-2">
            <InputPasswordForm
              control={control}
              label="Password"
              name="password"
              htmlFor="password"
              placeholder="Enter password"
              useAbsoluteError
              allowAutoComplete
              hideError={errorResponse?.type === "not_registered"}
              showLockIcon
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(onSubmit)()
              }}
            />

            <div className="flex justify-end">
              <Link href="/#" className="w-fit">
                <p className="text-right text-xs font-semibold text-primary mt-3">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            color="primary"
            variant="contained"
            className="rounded-md p-3 flex-1 text-sm w-full mt-7"
          >
            Login
          </Button>
        </form>
      </div>
    </section>
  )
}
