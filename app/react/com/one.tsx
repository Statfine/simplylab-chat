"use client";

import { memo, useEffect, useState } from "react";

export interface IOne {
  detail: IDetail;
}

export interface IDetail {
  is_lock: number;
}

const One = (props: IOne) => {
  const { detail } = props;
  const [playInfo, setPlayInfo] = useState({ ...detail });

  useEffect(() => {
    setPlayInfo(detail);
  }, [detail]);

  console.log("props.detail", detail);
  console.log("state.playInfo", playInfo);
  return (
    <div>
      <div
        className="text-gray-700 flex flex-col align-center items-center mt-10 mb-20"
        id="element-to-print"
      >
        <h1>Com</h1>
      </div>
    </div>
  );
};

export default memo(One);
