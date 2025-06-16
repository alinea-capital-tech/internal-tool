import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";
import "../App.css";
import LocaleSwitch from "@/components/LocalSwitch";
import Logo from "@/components/Logo";
import { FormProvider, useForm } from "react-hook-form";
import LoginForm from "@/components/LoginForm";
import { Button } from "antd";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const methods = useForm({
    mode: "all",
  });
  const handleLogin = () => {
    // Handle login logic here
    console.log(methods.getValues());
    console.log("Login submitted");
  };
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
