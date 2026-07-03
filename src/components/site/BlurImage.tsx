import { useState, type ImgHTMLAttributes, type ReactEventHandler } from "react";

type BlurImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  placeholder?: string;
  placeholderColor?: string;
};

export function BlurImage({
  placeholder,
  placeholderColor,
  className = "",
  onLoad,
  loading = "lazy",
  decoding = "async",
  ...rest
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  return (
    <>
      {(placeholder || placeholderColor) && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundColor: placeholderColor,
            backgroundImage: placeholder ? `url(${placeholder})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: placeholder ? "blur(24px) saturate(1.2)" : undefined,
            transform: placeholder ? "scale(1.15)" : undefined,
          }}
        />
      )}
      <img
        {...rest}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        className={`${className} transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
