"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";

export default function SwiperPage() {
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  return (
    <Swiper
      slidesPerView={1}
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
      }}
      onTouchStart={(swiper) => {
        console.log("onTouchStart", swiper.realIndex);
      }}
      onTouchEnd={(swiper) => {
        console.log("onTouchEnd", swiper.realIndex);
      }}
      onRealIndexChange={(swiper) => {
        console.log("onRealIndexChange", swiper.realIndex);
      }}
      onSlideChangeTransitionStart={(swiper) => {
        swiper.disable();
        console.log("slide start", swiper.realIndex);
      }}
      onSlideChangeTransitionEnd={(swiper) => {
        console.log("slide end", swiper.realIndex);
        alert(swiper.realIndex);
        swiper.enable();
      }}
      onTransitionStart={(swiper) => {
        console.log("start");
      }}
      onTransitionEnd={(swiper) => {
        console.log("end", swiper.realIndex);
      }}
      className={styles.demo}
    >
      <SwiperSlide className={styles.item}>Slide 1</SwiperSlide>
      <SwiperSlide className={styles.item}>Slide 2</SwiperSlide>
      <SwiperSlide className={styles.item}>Slide 3</SwiperSlide>
      <SwiperSlide className={styles.item}>Slide 4</SwiperSlide>
    </Swiper>
  );
}
