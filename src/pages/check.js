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

  /// state
  const [isModalShow, setModalShow] = useState(false);
  const [checkState, setCheckState] = useState('detect');

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
              <buttton onClick={()=>setModalShow(true)} className="button">检测</buttton>
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
      <div className={clsx("modal", !isModalShow && "hidden")}>
        <div className="modal-container">
          <div className="modal-header">
            <button onClick={() => setModalShow(false)}>
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Close</title>
                <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="盗版检测_正在检测_1" transform="translate(-1101.000000, -385.000000)" className="stroke-[#C3C5CC] hover:stroke-[#b3b5bC]" stroke-width="2">
                    <g id="pop" transform="translate(775.000000, 365.000000)">
                      <g id="popup_del" transform="translate(324.186292, 18.686292)">
                        <g id="编组-2" transform="translate(13.313708, 13.313708) rotate(-315.000000) translate(-13.313708, -13.313708) translate(3.899495, 3.899495)">
                          <line x1="-3.63797881e-12" y1="9.41421356" x2="18.8284271" y2="9.41421356" id="路径-3"></line>
                          <line x1="9.41421356" y1="3.63797881e-12" x2="9.41421356" y2="18.8284271" id="路径-3"></line>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <div className="modal-inner">
            <Image src="/images/check/check-detection.svg" width={110} height={110} className={clsx(checkState=="fail" && "hidden")}/>
            <Image src="/images/check/check-detection-lose.svg" width={110} height={110} className={clsx(checkState !="fail" && "hidden")}/>
            <p className={clsx("text-4 text-dark", checkState=="fail" && "text-danger" )}>正在检测请勿关闭窗口…</p>
            <p className="text-base text-center">本功能纯前端页面检测，没有请求任何接口！<br/>可以抓包查证,保证数据安全不会泄露域名！<br/>如果检测失败请多次尝试！</p>
          </div>
        </div>
      </div>
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
