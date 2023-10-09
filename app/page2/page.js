"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useRef, useEffect, useLayoutEffect } from "react";
import './page2.css'

import Image from "next/image";
import Caesarea from "./../../public/photos/Caesarea Maritima_Maddie Hunt31.webp"
import Caesarea2 from "./../../public/photos/Caesarea Maritima_Maddie Hunt79.webp"
import OldCity from "./../../public/photos/OldCity_MaddieHuntPhoto1.webp"
import Promenade from "./../../public/photos/promenade.webp"
import NimrodsFortress from "./../../public/photos/Nimrods Fortress_Maddie Hunt65 (1).jpg"
import Excursion from "./../../public/photos/excursion.jpg"


gsap.registerPlugin(ScrollTrigger);



const Component = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        "#wrapper-a p",
        { opacity: 0, y: 100 }, //fromの設定
        {
          //toの設定
          opacity: 1,
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: "#wrapper-a",
            start: "50% 50%",
            end: "50% top",
            scrub: true,
            //markers: true,
            pin: true,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        "#wrapper-b p",
        { opacity: 0, y: 100 }, //fromの設定
        {
          //toの設定
          opacity: 1,
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: "#wrapper-b",
            start: "top 75%",
            end: "50% 25%",
            scrub: true,
            pin: true,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.to(
        "#photo",
        {
          //toの設定
          x: () => -(document.querySelector("#photo").clientWidth * 6),
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: "#photogallery",
            start: "top 10%",
            end: () => `+=${document.querySelector("#photo").clientWidth * 5}`,
            scrub: 2.5,
            pin: true,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        "#photo",
        { opacity: 0, y: 100 }, //fromの設定
        {
          opacity: 1,
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: "#photogallery",
            start: "top 50%",
            end: "top top",
            scrub: true,
          },
        }
      );
      ['#title1', '#title2', '#title3', '#title4', '#title5'].map(elem => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 100 }, //fromの設定
          {
            opacity: 1,
            y: 0,
            duration: 2,
            scrollTrigger: {
              trigger: elem,
              start: "top bottom",
            },
          }
        );
      })
      
      // gsap.to("#photogallery", {
      //   x: () => -("#photogallery".clientWidth - pagesWrapperElement.clientWidth),
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: '#horizontal-scroll-section',
      //     start: 'top top',
      //     end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth}`,
      //     scrub: true,
      //     pin: true,
      //     anticipatePin: 1,
      //     invalidateOnRefresh: true,
      //   },
      // })
    })
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div id="title1" className="text-center text-2xl my-60">
        <p>神のなさることは、</p>
        <p>すべて時にかなって美しい</p>
      </div>
      <div className="scrolldown4"><span>Scroll</span></div>
      <div id="title2" className="text-center text-2xl my-96">
        <p>今あたえられているお仕事が</p>
        <p>これからさらに主に用いられるように</p>
      </div>
      <div id="title3" className="text-center text-2xl my-96">
        <p>いまはまだ</p>
        <p>学んでいることをアウトプットする</p>
        <p>遊び場のような</p>
      </div>
      <div id="title4" className="text-center text-2xl my-96">
        <p>たとえばフォトギャラリーをつくって</p>
        <p>イスラエルのことを発信したり</p>
      </div>
      <section className="side-scroll section">
        <div id="photogallery" className="w-full relative">
          <div id="photo" className="absolute flex">
            <Image src={Caesarea} className="mx-10"></Image>
            <Image src={Caesarea2} className="mx-10"></Image>
            <Image src={OldCity} className="mx-10"></Image>
            <Image src={Promenade} className="mx-10"></Image>
            <Image src={NimrodsFortress} className="mx-10"></Image>
            {/* <Image src={Excursion}></Image> */}
          </div></div>
      </section>
      <div id="title5" className="text-center text-2xl my-96">
        <p>まだまだ発展途上</p>
        <p>これから育てていくんだ</p>
      </div>
    </>
  );
}

export default Component
