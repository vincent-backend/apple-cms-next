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

  useEffect(() => {

  });

  return (
    <footer className="relative w-full pt-[30px] md:pt-[10px] bg-footer">
      <div className="container">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-[20px] md:mt-0 lg:pl-[170px]">          
          {/* More */}
          <div className="flex flex-wrap justify-center items-center w-full gap-3">
            <Link href="https://magicblack.github.io/" target="_blank" className="footer-link">苹果cms</Link>
            <div className="h-[14px] min-w-[2px] bg-[#D9E6E7]" />
            <Link href="https://github.com/magicblack/maccms8" target="_blank" className="footer-link">苹果cmsV8</Link>
            <div className="h-[14px] min-w-[2px] bg-[#D9E6E7]" />
            <Link href="https://github.com/magicblack/maccms10" target="_blank" className="footer-link">苹果cmsV10</Link>
            <div className="h-[14px] min-w-[2px] bg-[#D9E6E7]" />
            <Link href="https://github.com/magicblack/maccms_down" target="_blank" className="footer-link">苹果cms下载</Link>
            <div className="h-[14px] min-w-[2px] bg-[#D9E6E7]" />
            <Link href="https://www.maccms.plus/" target="_blank" className="footer-link">苹果cms在线手册</Link>
          </div>
          <div className="relative flex flex-row items-center justify-center gap-1 w-full md:w-[200px]">
            <Image alt="5.1-logo" src="/images/home/51-la.png" width={74} height={74} />
            <span>提供CDN赞助</span>
          </div>
        </div>
        <div className="w-full justify-center flex flex-col items-center my-[20px] md:my-[60px] gap-4">
          <p>© 2020 #5CMS or MACCMS MIT license</p>
          <p>声明：本站所开发的相关程序请在遵守法律的前提下使用，对用户在使用过程中的信息内容本站不负任何责任！</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
