const Logo = ({
  className,
  height,
  width,
}: {
  className?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <img
      src={"/alinea_logo.png"}
      style={{
        height: height ? `${height}px` : "auto",
        width: width ? `${width}px` : "auto",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      className={`${className}`}
      alt="Alinea logo"
    />
  );
};

export default Logo;
