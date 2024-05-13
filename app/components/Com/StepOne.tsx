import { memo } from "react";
import useVideoStore, { useTrackedStore } from "../../hooks/useVideoStore";

const StepOne = () => {
  // const { chapterModalType, setChapterModalType } = useVideoStore() as any;
  // const chapterModalType = useVideoStore(
  //   (state) => (state as any).chapterModalType
  // );
  // const setChapterModalType = useVideoStore(
  //   (state) => (state as any).setChapterModalType
  // );
  const { chapterModalType, setChapterModalType } = useTrackedStore();

  const handleSetChapterModalType = () => {
    setChapterModalType(!chapterModalType);
  };

  console.log("render====>StepOne chapterModalType", chapterModalType);
  return (
    <div>
      <h2>StepOne</h2>
      <div onClick={handleSetChapterModalType}>setChapterModalType</div>
    </div>
  );
};

export default memo(StepOne);
