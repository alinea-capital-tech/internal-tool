import { Button } from "antd";
// import { useRouter, usePathname } from "next/navigation";

const LocaleSwitch = () => {
  const options = [
    {
      label: "Inglés",
      value: "en",
      emoji: "🇺🇸",
      desc: "Inglés",
    },
    {
      label: "Español",
      value: "es",
      emoji: "🇲🇽",
      desc: "Español",
    },
  ];

  const handlerLocale = async () => {
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 500);
  };

  return (
    <div className="locale-switch___login">
      <Button>
        <img
          src="/world.svg"
          style={{ width: 20, height: 20 }}
          alt={"Cambiar idioma"}
        />
        {"Cambiar idioma"}
      </Button>
      {options.map((option) => (
        <Button
          key={option.value}
          style={{
            fontSize: 14,
            fontWeight: 700,
            border: "1px solid transparent",
            lineHeight: 1,
            padding: "12px",
          }}
          onClick={() => handlerLocale()}
        >
          {option.emoji} {option.label}
        </Button>
      ))}
    </div>
  );
};

export default LocaleSwitch;
