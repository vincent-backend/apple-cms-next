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
import Advertise from "@/layouts/components/check/Advertise";

export default function Check({ data }) {
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
          <div className="flex w-full flex-wrap items-start md:items-center md:justify-center">
            {markdownify(banner.title1, "h1", "keep-all")}
            {markdownify(banner.title2, "h1", "keep-all")}
          </div>

          {/* Search bar */}
          <div className="w-full flex items-center justify-center my-[35px] md:my-[90px]">
            <div className="search-bar">
              <div className="mx-[14px] md:mx-[22px]">
                <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>pirate_ic_search@2x</title>
                  <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="盗版检测" transform="translate(-649.000000, -431.000000)" stroke="#4D5366" stroke-width="3">
                      <g id="输入框" transform="translate(625.000000, 411.000000)">
                        <g id="pirate_ic_search" transform="translate(24.000000, 20.000000)">
                          <circle id="椭圆形" cx="9.5" cy="9.5" r="8"></circle>
                          <line x1="15" y1="15" x2="20.5" y2="21" id="路径-6"></line>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <input className="input" type="search" placeholder="http://baidu.com"></input>
              <buttton className="button">检测</buttton>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mb-[60px] md:mb-[150px]">
          {/* Ads */}
          <Advertise />
        </div>
      </section>
    </Base>
  );
}

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("./src/content/check");
  return {
    props: {
      data,
    },
  };
};
