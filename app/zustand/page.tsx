"use client"; // This is a client component
import useVideoStore from "../hooks/useVideoStore";
import StepOne from "../components/Com/StepOne";
import StepTwo from "../components/Com/StepTwo";

// import { useChapterModalType, useSetChapterModalType } from "../hooks/episode";
import { useTrackedStore } from "../hooks/episode";

export default function Zustand() {
  const chapterList = useVideoStore((state) => (state as any).chapterList);
  const setChapterList = useVideoStore(
    (state) => (state as any).setChapterList
  );

  // const chapterModalType = useChapterModalType();
  // const setChapterModalType = useSetChapterModalType();
  const { chapterModalType, setChapterModalType } = useTrackedStore();

  const handleAddList = () => {
    setChapterList([...chapterList, chapterList.length + 1]);
  };

  console.log("render===> Zustand", chapterList);
  console.log("render===> Zustand", chapterModalType);
  return (
    <div>
      <div onClick={() => setChapterModalType(!chapterModalType)}>
        setChapterModalType
      </div>
      <div onClick={handleAddList}>addPageList</div>
      {chapterList.map((i: any) => (
        <div key={i}>{i}</div>
      ))}
      <StepOne />
      <StepTwo />
    </div>
  );
}
