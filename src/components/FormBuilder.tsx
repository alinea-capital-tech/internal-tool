import FormInput, { type InputTypes } from "./FormInput";

export type FormBuilderInput = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: InputTypes;
  rows?: number;
  rules?: {
    [key: string]: string;
  };
};

const FormBuilder = ({ formInputs }: { formInputs: FormBuilderInput[] }) => {
  return (
    <>
      {formInputs.map((input) => (
        <FormInput key={input.name} {...input} />
      ))}
    </>
  );
};

export default FormBuilder;
