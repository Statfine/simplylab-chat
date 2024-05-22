"use client";

import { memo } from "react";

const Com = () => {
  console.log("render======>Com");
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

export default Com;
// export default memo(Com);
