import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";
import type { PathwayData } from "../services/carePathway";

export enum AgeRange {
  YOUNG = "young",
  AVERAGE = "average",
  OLDER = "older",
}

type CarePathwayState = {
  data: PathwayData | undefined;
  activeChapter: number;
  ageRange: AgeRange | null;
  ageRangeDropdownOpen: boolean;
};

export const carePathwayinitialState: CarePathwayState = {
  data: undefined,
  activeChapter: 0,
  ageRange: AgeRange.YOUNG,
  ageRangeDropdownOpen: false,
};

export const carePathwaySlice = createSlice({
  name: "carePathway",
  initialState: carePathwayinitialState,
  reducers: {
    setPathwayData: (state, action: PayloadAction<PathwayData>) => {
      state.data = action.payload;
    },
    setPathwayChapter: (state, action: PayloadAction<number>) => {
      state.activeChapter = action.payload;
    },
    setPathwayAge: (state, action: PayloadAction<AgeRange>) => {
      state.ageRange = action.payload;
    },
    setPathwayAgeDropdownOpen: (state, action: PayloadAction<boolean>) => {
      state.ageRangeDropdownOpen = action.payload;
    },
  },
});

export const { setPathwayData, setPathwayChapter, setPathwayAge, setPathwayAgeDropdownOpen } = carePathwaySlice.actions;

export const selectPathwayData = (state: RootState) => state.carePathway.data;
export const selectPathwayActiveChapter = (state: RootState) => state.carePathway.activeChapter;
export const selectPathwayAgeRange = (state: RootState) => state.carePathway.ageRange;
export const selectPathwayAgeDropdownOpen = (state: RootState) => state.carePathway.ageRangeDropdownOpen;
