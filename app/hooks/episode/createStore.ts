import { create } from "zustand";
import { createTrackedSelector } from "react-tracked";

import createSimpleSlice from "./simpleData";
import createSourceSlice from "./sourceData";

export const useVideoStore = create<any>()((...a) => ({
  ...createSimpleSlice(...a),
  ...createSourceSlice(...a),
}));

export const useTrackedStore: any = createTrackedSelector(useVideoStore);
