import gidaAjaniLogo from "@/assets/gida-ajani-logo.svg";

type GidaAjaniBrandProps = {
  label: string;
  logoHeight?: number;
  className?: string;
};

export function GidaAjaniBrand({
  label,
  logoHeight = 20,
  className = "",
}: GidaAjaniBrandProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={gidaAjaniLogo}
        alt=""
        aria-hidden="true"
        className="w-auto flex-shrink-0"
        style={{ height: logoHeight }}
      />
      <span>{label}</span>
    </span>
  );
}
