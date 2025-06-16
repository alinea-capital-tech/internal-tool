import { type ConfigProviderProps } from "antd";

export const customAntDTheme: ConfigProviderProps["theme"] = {
  components: {
    Input: {
      controlHeightLG: 48,
    },
    Button: {
      controlHeightLG: 48,
      colorPrimary: "#495057",
      algorithm: true,
      defaultBorderColor: "#495057",
      fontWeight: 700,
    },
    Tag: {
      colorSuccess: "#005243",
      colorSuccessBg: "#E6FAEE",
      colorBorder: "#fafafa",
      colorSuccessBorder: "#E6FAEE",
    },
    Radio: {
      colorPrimary: "#495057",
      controlHeight: 48,
      borderRadius: 24,
      padding: 32,
      buttonSolidCheckedBg: "#28456E",
      buttonSolidCheckedHoverBg: "#28456E",
    },
    Tabs: {
      horizontalItemPadding: "12px 54px 12px 54px",
      itemActiveColor: "#000",
      inkBarColor: "#000",
      itemSelectedColor: "#000",
      itemHoverColor: "#000",
      itemColor: "#495057",
      horizontalItemGutter: 0,
    },
  },
};
