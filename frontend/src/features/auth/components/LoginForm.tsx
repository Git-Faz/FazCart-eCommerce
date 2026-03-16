import type { JSX } from "react";
import { useEffect, useState } from "react";
import type { LoginReq } from "../types";
import { toast } from "sonner";
import { Button } from "../../../shared/components/ui/button";
import { Spinner } from "../../../shared/components/ui/spinner";
import { useAppDispatch } from "@/app/hooks";
import { useAuth } from "@/features/auth/useAuth";
import { login } from "@/features/auth/authSlice"

type FormErrors = Partial<Record<keyof LoginReq, string>>;

const initialForm: LoginReq = {
    username: "",
    password: "",
};

export const LoginForm = (): JSX.Element => {

    const [formData, setFormData] = useState<LoginReq>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});

    const { isLoading, error } = useAuth();
    const dispatch = useAppDispatch()

    useEffect(() => {
      if (error) toast.error(error)
    }, [error])    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = (data: LoginReq): FormErrors => {
        const errs: FormErrors = {};

        if (data.username.length < 3) {
            errs.username = "Enter a valid username";
        }
        if (data.password.length < 6) {
            errs.password = "Password must be at least 6 characters";
        }
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate(formData);

        if (Object.keys(errs).length) {
            setErrors(errs);
            toast.error(errors.password || errors.username)
            return;
        }
        setErrors({});

        dispatch(login(formData))
    };

/*     if(isLoading){
        return <Loading message="Signing in..."/>
    } */

    return (
        <form
  onSubmit={handleSubmit}
  className="authForm flex flex-col gap-6"
>
  <h1 className="text-2xl font-bold text-center">Sign in</h1>

  <div className="flex flex-col gap-1">
    <label className="authFormLabel">
      Username
    </label>

    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      className="authFormInput"
    />

    {errors.username && (
      <p className="text-sm text-red-500">{errors.username}</p>
    )}
  </div>

  <div className="flex flex-col gap-1">
    <label className="authFormLabel">
      Password
    </label>

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="authFormInput"
    />

    {errors.password && (
      <p className="text-sm text-red-500">{errors.password}</p>
    )}
  </div>

  <Button
    type="submit"
    disabled={isLoading}
    className="w-full rounded-md bg-blue-600 py-2 my-2 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
  >
    {isLoading ? (
      <>
        <Spinner className="mr-2 h-4 w-4" />
        Signing in...
      </>
    ) : (
      "Sign in"
    )}
  </Button>
</form>
    )
}