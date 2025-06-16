import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type InputTypes = "text" | "password" | "textarea";

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  rows = 1,
  rules,
}: {
  name: string;
  placeholder?: string;
  label?: string;
  type?: InputTypes;
  rows?: number;
  rules?: {
    [key: string]: string;
  };
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm px-2">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) =>
          inputType === "textarea" ? (
            <TextArea
              status={fieldState.error?.message ? "error" : ""}
              {...field}
              placeholder={placeholder}
              size="large"
              variant="filled"
              {...(type === "textarea" && { rows })}
            />
          ) : (
            <Input
              status={fieldState.error?.message ? "error" : ""}
              type={inputType}
              {...field}
              placeholder={placeholder}
              size="large"
              variant="filled"
              {...(type === "textarea" && { rows })}
              suffix={
                type === "password" && (
                  <div
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {inputType === "password" ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </div>
                )
              }
            />
          )
        }
      />
      {errors?.[name]?.message && (
        <label
          style={{
            color: "var(--error-color)",
          }}
          className="text-sm px-2"
        >
          {typeof errors?.[name]?.message === "string"
            ? errors[name].message
            : ""}
        </label>
      )}
    </div>
  );
};

export default FormInput;
