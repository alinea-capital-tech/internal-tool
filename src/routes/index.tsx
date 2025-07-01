import { createFileRoute, useRouter } from "@tanstack/react-router";
import "../App.css";
import Logo from "@/components/Logo";
import { FormProvider, useForm } from "react-hook-form";
import LoginForm from "@/components/LoginForm";
import { Button } from "antd";
import { useMutation } from "@apollo/client";
import { SIGN_IN_ADMIN } from "@/lib/mutations/user.mutations";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const [signInAdmin, { data, loading, error }] = useMutation(SIGN_IN_ADMIN);
  const router = useRouter();
  const methods = useForm({
    mode: "all",
  });
  const handleLogin = async () => {
    // Handle login logic here
    signInAdmin({
      variables: {
        email: methods.getValues("email"),
      },
    });
    console.log(methods.getValues());
    console.log("Login submitted");
  };

  useEffect(() => {
    if (data) {
      console.log("Login successful", data);
      router.navigate({
        to: "/dashboard",
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Login error", error);
      // Optionally, you can show an error message to the user
      alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  }, [error]);

  return (
    <>
      {/* <LocaleSwitch /> */}
      <div className="px-8 max-w-md mx-auto p-10">
        <div className="flex flex-col items-center">
          <Logo className="mb-12 mx-auto w-24 sm:w-32 md:w-40" />
          <h1 className="text-2xl font-bold mb-8">Inicio de sesión</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <LoginForm />
              <Button
                loading={loading}
                htmlType="submit"
                size="large"
                type="primary"
                className="w-full font-bold"
                // loading={loading}
              >
                Iniciar sesión
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
