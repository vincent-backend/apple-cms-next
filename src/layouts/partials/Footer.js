import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Logo from "@/layouts/components/Logo";
import CopyToClipboard from "@/hooks/useClipboard";
import useTranslation from "@/hooks/useTranslation";
import useOutsideAlerter from "@/hooks/useOutsideAlterter";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const { locale, setLocale } = useTranslation();
  const { footer } = menu;
  const [isTelegramMenu, setTelegramMenu] = useState(false);

  const telegramMenuRef = useRef(null);
  useOutsideAlerter(telegramMenuRef, setTelegramMenu);

  const [isTwitterMenu, setTwitterMenu] = useState(false);
  const twitterMenuRef = useRef(null);
  useOutsideAlerter(twitterMenuRef, setTwitterMenu);

  const [isShowTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    CopyToClipboard("https://avav.meme", locale);
    setShowTooltip(true);
  };

  useEffect(() => {
    if (isShowTooltip)
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
  }, [isShowTooltip]);

  return (
    <footer className="relative w-full h-[372px] md:h-[169px] bg-footer">
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between pt-[10px] md:pt-[34px]">
          <div className="flex flex-col w-full md:flex-row justify-between items-center md:items-start mt-[20px] md:mt-0">
            {/* Logo */}
            <Logo lang={locale} />
            {/* More */}
            <div className="flex flex-col justify-center md:justify-start items-center md:items-start w-full max-w-[200px] gap-1">
              dsf
            </div>
          </div>

          <div className="relative md:flex flex-col items-end w-full gap-1">
            dsf
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
