import ImageFallback from "./ImageFallback";
import config from "@/config/config.json";
import Link from "next/link";

const Logo = ({ src, lang }) => {
  // destructuring items from config object
  const { logo, width, height, title } = config.site;

  return (
    <Link href={`/`} className="navbar-brand block">
      <div className="flex flex-row items-center h-[60px]">
        <ImageFallback
          width={width}
          height={height}
          src={src ? src : logo}
          alt={title}
          priority
          className={`min-w-[36px] min-h-[36px]`}
        />
        <span className="ml-[10px] text-[17px] md:text-[24px] text-dark">{title}</span>
      </div>
    </Link>
  );
};

export default Logo;
