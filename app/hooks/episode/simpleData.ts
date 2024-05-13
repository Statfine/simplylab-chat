import { create, StateCreator } from "zustand";

const initialState = {
  /** 分享弹窗状态 */
  shareModalType: null,
  /** 剧集弹窗状态 */
  chapterModalType: false,
  /** 快捷支付弹窗 */
  fastPaymentOpen: false,
  /** 调用获取章节接口*/
  getUnlockInfoFunType: false,
  /** PC端下载app弹窗状态 */
  downloadAppModalType: false,
  /** 显示预告片 */
  showPreview: false,
  /** 快捷支付最大优化比例 */
  maxOptimizeRatio: 0,
};

const createSimpleSlice: any = (set: any, get: any) => ({
  ...initialState,

  setShareModalType: (params: any) => {
    set(() => {
      const { book_id, chapter_id } = params;
      const _shareModalType =
        book_id && chapter_id ? { book_id, chapter_id } : null;
      return { shareModalType: _shareModalType };
    });
  },

  setChapterModalType: (type: any) => {
    set(() => ({ chapterModalType: type }));
  },
  setFastPaymentOpen: (open: any) => {
    set(() => ({ fastPaymentOpen: open }));
  },
  getUnlockInfoFun: (type: any) => {
    set(() => ({ getUnlockInfoFunType: type }));
  },
  setDownloadAppType: (type: any) => {
    set(() => ({ downloadAppModalType: type }));
  },
  showTrailer: (show: any) => {
    set(() => ({ showPreview: show }));
  },
  setMaxOptimizeRatio: (ratio: any) => {
    set(() => ({ maxOptimizeRatio: ratio }));
  },
});

export default createSimpleSlice;
