import FormBuilder, { type FormBuilderInput } from "./FormBuilder";

const LoginForm = () => {
  const loginFormFields: FormBuilderInput[] = [
    {
      name: "email",
      label: "Correo electrónico",
      placeholder: "Ingresa tu correo electrónico",
    },
    {
      name: "password",
      label: "Contraseña",
      placeholder: "Ingrese su contraseña",
      type: "password",
    },
  ];

  return (
    <div className="form w-[296px] mb-2">
      <FormBuilder formInputs={loginFormFields} />
    </div>
  );
};

export default LoginForm;
