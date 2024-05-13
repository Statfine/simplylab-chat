"use client"; // This is a client component
import { useEffect, useRef } from "react";

const key = 'count';
export default function Auth() {
  const countRef = useRef<number>(0);

  useEffect(() => {
    setInterval(() => {
      countRef.current += 1;
      localStorage.setItem(key, countRef.current.toString());
    }, 500);
  }, []);

  const handleClick = () => {
    console.log('0', countRef.current)
    console.log('1', localStorage.getItem(key));
    setTimeout(() => {
      console.log('2', localStorage.getItem(key));
    }, 500)
    setInterval(() => {
      console.log('===>', localStorage.getItem(key));
    }, 100);
  }


  return (
    <div>
      <div onClick={handleClick} style={{ color: '#000' }}>get</div>
    </div>
  );
}
