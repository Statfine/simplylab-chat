import { memo, useRef } from "react";
import useVideoStore from "../../hooks/useVideoStore";

const StepTwo = () => {
  const currentRef = useRef<number>(0);
  const histPlayTime = useVideoStore((state) => (state as any).histPlayTime);
  const setPlaytime = useVideoStore((state) => (state as any).setPlaytime);

  // const { histPlayTime, setPlaytime } = useVideoStore((state: any) => ({
  //   histPlayTime: state.histPlayTime,
  //   setPlaytime: state.setPlaytime,
  // }));

  const handleInterval = () => {
    setInterval(
      () => {
        currentRef.current = currentRef.current + 1;
        setPlaytime({
          book_id: currentRef.current,
          chapter_id: "chapter_id",
          playtime: 1,
        });
      },

      1000
    );
  };

  console.log("render====>StepTwo histPlayTime", histPlayTime);
  return (
    <div>
      <h2>StepTwo</h2>
      <div onClick={handleInterval}>setChapterModalType</div>
    </div>
  );
};

export default memo(StepTwo);
