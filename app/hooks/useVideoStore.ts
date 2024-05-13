import { create } from "zustand";
import { createTrackedSelector } from "react-tracked";

const initialState = {
  /** 剧集列表 */
  chapterList: [],
  /** 剧集弹窗状态 */
  chapterModalType: false,
  /**定位播放时间 */
  histPlayTime: {},
};

const useVideoStore = create((set, get: any) => ({
  ...initialState,

  setPlaytime: (params: any) => {
    set(() => {
      const defaultHistPlayTime = get().histPlayTime;
      const data: any = {};
      data[params.book_id] = {
        chapter_id: params.chapter_id,
        playtime: params.playtime,
        time: new Date().getTime(),
      };
      const newData = { ...data, ...defaultHistPlayTime };
      return { histPlayTime: newData };
    });
  },

  setChapterList: (list: any) => {
    set((state: any) => ({ chapterList: list, chapterModalType: true }));
  },

  setChapterModalType: (type: boolean) => {
    set((state: any) => ({ chapterModalType: type }));
  },
}));

export const useTrackedStore: any = createTrackedSelector(useVideoStore);

export default useVideoStore;
