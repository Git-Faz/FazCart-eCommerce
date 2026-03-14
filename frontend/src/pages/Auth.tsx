import { useEffect, useState } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Body from "@/shared/components/layout/Body";

type AuthMode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.success(mode === "login" ? "Logged in!" : "Account created!");
      navigate("/");
    }
  }, [isLoggedIn, navigate, mode]);


  return (
    <Body>
    <div className="mt-6 flex min-h-fit items-center justify-center px-4 pb-4 sm:mt-10">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded ${mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400"
              }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className={`px-4 py-2 rounded ${mode === "register"
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400"
              }`}
          >
            Register
          </button>
        </div>

        {mode === "login" && <LoginForm />}
        {mode === "register" && <RegisterForm />}
      </div>
    </div>
    </Body>
  );
};

export default Auth;
