import { create } from "zustand";

const initialState = {
  /** 剧集列表 */
  chapterList: [],
  /**书籍信息 */
  bookDetail: null,
  /** 章节详情 */
  chapterDetail: null,
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
  /** 播放历史列表 */
  historyList: [],
  /**定位播放时间 */
  histPlayTime: {},
  /** 显示预告片 */
  showPreview: false,
  /** 快捷支付最大优化比例 */
  maxOptimizeRatio: 0,
};

// 本地历史字段 uid+ _hist
if (process.browser) {
  const uid = localStorage.getItem("uid") || "";
  initialState.historyList = JSON.parse(
    localStorage.getItem(`${uid}_hist`) || "[]"
  );
  initialState.histPlayTime = JSON.parse(
    localStorage.getItem(`${uid}_hist_playtime`) || "{}"
  );
}

/** 获取本地数据 */
const getLocalData = (): {
  _uid: string;
  _histPlayTime: any;
  _histList: any;
} => {
  let _uid = "";
  let _histPlayTime = {};
  let _histList = [];
  if (process.browser) {
    _uid = localStorage.getItem("uid") || "";
    _histPlayTime = JSON.parse(
      localStorage.getItem(`${_uid}_hist_playtime`) || "{}"
    );
    _histList = JSON.parse(localStorage.getItem(`${_uid}_hist`) || "[]");
  }
  return { _uid, _histPlayTime, _histList };
};

const useVideoStore = create((set, get: any) => ({
  ...initialState,

  setChapterList: (params: any) => {
    set(() => {
      const _chapterList = [...params.list];
      const defaultChapterDetail = get().chapterDetail;
      if (defaultChapterDetail) {
        const idx = _chapterList.findIndex(
          (item: any) => item.chapter_id === defaultChapterDetail?.chapter_id
        );
        if (idx !== -1) {
          // 假设详情接口先返回
          try {
            _chapterList[idx] = {
              ..._chapterList[idx],
              ...defaultChapterDetail,
            };
            defaultChapterDetail.preLoad?.forEach(
              (item: any, index: number) => {
                const c = _chapterList[idx + index + 1];
                if (item.chapter_id === c?.chapter_id) {
                  c.play_info = item.play_info;
                }
              }
            );
          } catch (error) {
            console.log(
              "%c [ error ]-92",
              "font-size:13px; background:pink; color:#bf2c9f;",
              error
            );
          }
        }
      }

      return { chapterList: _chapterList };
    });
  },

  setBookDetail: (detail: any) => {
    set(() => ({ bookDetail: detail }));
  },

  setChapterDetail: (params: any) => {
    set(() => {
      const _chapterData = params.chapterData || {};

      const defaultChapterList = get().chapterList;
      const _chapterList = [...defaultChapterList];

      const idx = _chapterList.findIndex(
        (item) => item.chapter_id === _chapterData.chapter_id
      );
      if (defaultChapterList.length !== 0 && idx !== -1) {
        // 假设列表接口先返回
        try {
          _chapterList[idx] = {
            ..._chapterList[idx],
            ..._chapterData,
          };
          _chapterData.preLoad?.forEach((item: any, index: number) => {
            const c = _chapterList[idx + index + 1];
            if (item.chapter_id === c?.chapter_id) {
              c.play_info = item.play_info;
            }
          });
        } catch (error) {
          console.log(
            "%c [ error ]-113",
            "font-size:13px; background:pink; color:#bf2c9f;",
            error
          );
        }
      }

      return { chapterDetail: _chapterData, chapterList: _chapterList };
    });
  },

  setShareModalType: (params: any) => {
    set(() => {
      const { book_id, chapter_id } = params;
      const _shareModalType =
        book_id && chapter_id ? { book_id, chapter_id } : null;
      return { shareModalType: _shareModalType };
    });
  },

  SET_CHAPTER_MODAL_TYPE: (type: any) => {
    set(() => ({ chapterModalType: type }));
  },
  SET_FAST_PAYMENT_OPEN: (open: any) => {
    set(() => ({ fastPaymentOpen: open }));
  },
  GET_UNLOCK_INFO_FUN: (type: any) => {
    set(() => ({ getUnlockInfoFunType: type }));
  },
  SET_DOWNLOAD_APP_TYPE: (type: any) => {
    set(() => ({ downloadAppModalType: type }));
  },

  SET_HIST: (histInfo: any) => {
    set(() => {
      const { _uid, _histList } = getLocalData();

      //传入书籍信息
      let hist = {
        book_id: histInfo.book_id,
        t_book_id: histInfo.t_book_id,
        book_pic: histInfo.book_pic,
        book_title: histInfo.book_title,
        is_collect: histInfo.is_collect,
        // 最后读的章节序号，预告片未0
        lastChapterIndex: histInfo.serial_number,
        // 最后读的章节id
        lastChapter: histInfo.chapter_id,
        chapter_count: histInfo.chapter_count,
        update_time: histInfo.update_time_text,
        // 播放百分比
        read_progress:
          Math.floor((histInfo.serial_number / histInfo.chapter_count) * 100) ||
          1,
      };
      const index = _histList.findIndex(
        (item: any) => item.book_id === histInfo.book_id
      );
      if (index !== -1) {
        //删除原历史放到最前面
        _histList.splice(index, 1);
      }
      _histList.unshift(hist);

      localStorage.setItem(`${_uid}_hist`, JSON.stringify(_histList));
      return { historyList: _histList };
    });
  },

  SET_PLAYTIME: (params: any) => {
    set(() => {
      const { _uid, _histList } = getLocalData();

      const { book_id = "", chapter_id = "", playtime = "" } = params;
      _histList[params.book_id] = {
        chapter_id,
        playtime,
        time: new Date().getTime(),
      };
      localStorage.setItem(`${_uid}_hist_playtime`, JSON.stringify(_histList));

      return { histPlayTime: _histList };
    });
  },

  RESET_HIST: (params: any) => {
    set(() => {
      const { _histList, _histPlayTime } = getLocalData();
      return {
        histPlayTime: _histPlayTime,
        historyList: _histList,
      };
    });
  },
  DEL_HIST: (params: any) => {
    set(() => {
      const { book_id = "", ids } = params;
      const { _histList, _histPlayTime, _uid } = getLocalData() as any;
      if (ids) {
        const list = ids.split(",");
        list.forEach((item: any) => {
          const index = _histList.findIndex((i: any) => i.book_id === item);
          if (index !== -1) {
            _histList.splice(index, 1);
            delete _histPlayTime[item];
          }
        });
      } else {
        delete _histPlayTime[book_id];
        let hi = _histList.findIndex((item: any) => item.book_id === book_id);
        hi !== -1 && _histList.splice(hi, 1);
      }
      localStorage.setItem(`${_uid}_hist`, JSON.stringify(_histList));
      localStorage.setItem(
        `${_uid}_hist_playtime`,
        JSON.stringify(_histPlayTime)
      );
      return {
        histPlayTime: _histPlayTime,
        historyList: _histList,
      };
    });
  },

  CLOSE_BOOK: () => {
    set(() => ({
      chapterList: [],
      bookDetail: null,
      chapterDetail: null,
      showPreview: false,
    }));
  },
  UPDATE_HIST_COLLECT: (params: any) => {
    set(() => {
      const { _histList, _uid } = getLocalData() as any;
      const { ids, isCollect } = params;
      const list = ids.split(",");

      list.forEach((item: any) => {
        const index = _histList.findIndex((i: any) => i.book_id === item);
        if (index !== -1) {
          _histList[index].is_collect = isCollect;
        }
      });
      localStorage.setItem(`${_uid}_hist`, JSON.stringify(_histList));
      return { historyList: _histList };
    });
  },
  LIKE_CHAPTER: (params: any) => {
    set(() => {
      const { is_like, chapter_id, like_count, callback } = params;
      const defaultChapterDetail = get().chapterDetail;
      const _chapterList = [...defaultChapterDetail];

      const idx = _chapterList?.findIndex(
        (item) => item.chapter_id === chapter_id
      );
      if (idx !== -1) {
        _chapterList[idx] = {
          ..._chapterList[idx],
          is_like,
          like_count,
        };
      }
      return { chapterList: _chapterList };
    });
  },
  SHOW_TRAILER: (info: any) => {
    set(() => ({ showPreview: info }));
  },
  SET_MAX_OPTIMIZE_RATIO: (ratio: any) => {
    set(() => ({ maxOptimizeRatio: ratio }));
  },
}));

export default useVideoStore;
