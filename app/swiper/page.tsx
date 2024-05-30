"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

export default function SwiperPage() {
  const swiperRef = useRef<any>();
  const indexRef = useRef<number>(0);

  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    <Swiper
      loop
      // slidesPerView={1}
      direction="vertical"
      // onSlideChange={(swiper) => console.log("slide change", swiper.realIndex)}
      // onSwiper={(swiper) => console.log(swiper)}
      style={size}
      preventInteractionOnTransition={false}
      edgeSwipeDetection={true}
      // edgeSwipeThreshold={10}
      // effect="fade"
      // fadeEffect={{ crossFade: true }}
      onAfterInit={(swiper) => {
        console.log("onAfterInit");
        swiperRef.current = swiper;
        indexRef.current = swiper.realIndex;
      }}
      onTouchStart={(swiper) => {
        console.log("onTouchStart", swiper.realIndex);
      }}
      onTouchMove={(swiper, event: any) => {
        // console.log("onTouchMove", swiper.swipeDirection, event.clientY);
        // if (event.clientY < 0)
      }}
      onTouchEnd={(swiper, event: any) => {
        console.log(
          "onTouchEnd",
          swiper.realIndex,
          swiperRef.current.activeIndex
        );
        // console.log("onTouchEnd", swiper.swipeDirection, event.clientY);
        // indexRef.current = swiper.realIndex;
        // if (event.clientY < 0) {
        // console.log("custom", swiper.realIndex);
        // indexRef.current = swiper.realIndex + 1;
        // swiperRef.current.slideTo(1);
        // }
      }}
      onSlideChange={(swiper) => {
        console.log("onSlideChange", swiper.realIndex);
      }}
      onRealIndexChange={(swiper) => {
        console.log("onRealIndexChange", swiper.realIndex);
      }}
      onSlideChangeTransitionStart={(swiper) => {
        // swiper.disable();
        console.log("onSlideChangeTransitionStart", swiper.realIndex);
      }}
      onSlideChangeTransitionEnd={(swiper) => {
        console.log("onSlideChangeTransitionEnd", swiper.realIndex);
        // alert(swiper.realIndex);
        // swiper.enable();
        console.log("<======分割线======>");
      }}
      onTransitionStart={(swiper) => {
        console.log("onTransitionStart");
      }}
      onTransitionEnd={(swiper) => {
        console.log("onTransitionEnd", swiper.realIndex);
      }}
      className={styles.demo}
    >
      <SwiperSlide className={styles.item} style={{ background: "red" }}>
        Slide 0
        {show && (
          <div style={{ width: 100, height: 100, background: "black" }}></div>
        )}
      </SwiperSlide>
      <SwiperSlide className={styles.item} style={{ background: "yellow" }}>
        Slide 1
      </SwiperSlide>
      <SwiperSlide className={styles.item} style={{ background: "blue" }}>
        Slide 2
      </SwiperSlide>
      {/* <SwiperSlide className={styles.item} style={{ background: "orange" }}>
        Slide 4
      </SwiperSlide> */}
    </Swiper>
  );
}
