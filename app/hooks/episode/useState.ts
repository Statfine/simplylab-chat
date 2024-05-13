import { useVideoStore } from "./createStore";

/** simple */
export const useShareModalType = () =>
  useVideoStore((state) => state.shareModalType);
export const useSetShareModalType = () =>
  useVideoStore((state) => state.setShareModalType);

export const useChapterModalType = () =>
  useVideoStore((state) => state.chapterModalType);
export const useSetChapterModalType = () =>
  useVideoStore((state) => state.setChapterModalType);

export const useFastPaymentOpen = () =>
  useVideoStore((state) => state.fastPaymentOpen);
export const useSetFastPaymentOpen = () =>
  useVideoStore((state) => state.setFastPaymentOpen);

export const useGetUnlockInfoFunType = () =>
  useVideoStore((state) => state.getUnlockInfoFunType);
export const useGetUnlockInfoFun = () =>
  useVideoStore((state) => state.getUnlockInfoFun);

export const useDownloadAppModalType = () =>
  useVideoStore((state) => state.downloadAppModalType);
export const useSetDownloadAppType = () =>
  useVideoStore((state) => state.setDownloadAppType);

export const useShowPreview = () => useVideoStore((state) => state.showPreview);
export const useShowTrailer = () => useVideoStore((state) => state.showTrailer);

export const useMaxOptimizeRatio = () =>
  useVideoStore((state) => state.maxOptimizeRatio);
export const useSetMaxOptimizeRatio = () =>
  useVideoStore((state) => state.setMaxOptimizeRatio);

/** sourceData */
export const useChapterList = () => useVideoStore((state) => state.chapterList);
export const useSetChapterList = () =>
  useVideoStore((state) => state.setChapterList);

export const useBookDetail = () => useVideoStore((state) => state.bookDetail);
export const useSetBookDetail = () =>
  useVideoStore((state) => state.setBookDetail);

export const useChapterDetail = () =>
  useVideoStore((state) => state.chapterDetail);
export const useSetChapterDetail = () =>
  useVideoStore((state) => state.setChapterDetail);

export const useHistoryList = () => useVideoStore((state) => state.historyList);
export const useSetHist = () => useVideoStore((state) => state.setHist);
export const useResetHist = () => useVideoStore((state) => state.resetHist);
export const useDelHist = () => useVideoStore((state) => state.delHist);

export const useHistPlayTime = () =>
  useVideoStore((state) => state.histPlayTime);
export const useSetPlaytime = () => useVideoStore((state) => state.setPlaytime);

export const useCloseBook = () => useVideoStore((state) => state.closeBook);
export const useUpdateHistCollect = () =>
  useVideoStore((state) => state.updateHistCollect);
export const useLikeChapter = () => useVideoStore((state) => state.likeChapter);
