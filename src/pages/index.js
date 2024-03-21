import config from "@/config/config.json";
import useTranslation from "@/hooks/useTranslation";
import useOutsideAlerter from "@/hooks/useOutsideAlterter";
import CopyToClipboard from "@/hooks/useClipboard";
import { markdownify } from "@/lib/utils/textConverter";
import dynamic from 'next/dynamic'
import Base from "@/layouts/Baseof";
import { getDataFromContent } from "@/lib/contentParser";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Store } from "react-notifications-component";

export default function Home({ data }) {
  const { locale } = useTranslation();
  const router = useRouter();

  // static data
  let c_data = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(c_data);
  //
  let { banner } = frontmatter;
  const { general } = config;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    // animate
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.6 }
      )
        .fromTo(
          ".banner-content",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          ">-0.4"
        )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.3"
        )
        .fromTo(
          ".top-graph",
          { y: 0, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          ">-0.2"
        );
    });

    return () => {
      ctx.revert();
    };
  }, [locale, data, router.asPath, router.events]);

  return (
    <Base>
      <section>
        <div className="container">
          {/* banner title */}
          <div className="flex flex-col md:flex-row">
            {markdownify(banner.title1, "h1", "")}
            {markdownify(banner.title2, "h1", "")}
          </div>
          {/* banner subtitle */}
          {markdownify(banner.subtitle, "", "text-text text-[17px] md:text-[24px] pt-[14px] md:pt-[18px]")}
          {/* description */}
          {markdownify(banner.description, "p", "pt-5 md:pt-4")}

          {/* download link */}
          <div className="mt-[35px] md:mt-[120px] md:h-[220px] flex flex-col lg:flex-row items-end lg:gap-x-5 gap-y-4">
            <div className="relative banner-download group">
              <Link href="https://www.maccms.la/down/maccms10.zip" className="banner-download-icon-cover">
                <div className="download-icon"></div>
              </Link>
              <span className="download-text">Github源站</span>
            </div>
            <div className="relative banner-download group">
              <Link href="https://hub.fastgit.org/magicblack/maccms_down/" target="_blank" className="banner-download-icon-cover">
                <div className="download-icon"></div>
              </Link>
              <span className="download-text">Github加速</span>
            </div>
            <div className="relative banner-download group">
              <Link href="https://www.maccms.la/down/maccms10.zip" target="_blank" className="banner-download-icon-cover">
                <div className="download-icon"></div>
              </Link>
              <span className="download-text">官方V10</span>
            </div>
          </div>

          {/* Ads */}
          <div className="flex flex-col lg:flex-wrap">
            
          </div>
        </div>
      </section>
    </Base>
  );
}

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/home");
  return {
    props: {
      data,
    },
  };
};
