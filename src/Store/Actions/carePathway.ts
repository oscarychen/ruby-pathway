import * as actionTypes from "./actionTypes";
import { CarePathwayData } from "../Reducers/carePathway";

interface SetDataCarePathway {
  type: typeof actionTypes.SET_DATA_CARE_PATHWAY;
  data: CarePathwayData;
}

interface SetActiveChapterCarePathway {
  type: typeof actionTypes.SET_ACTIVE_CHAPTER_CARE_PATHWAY;
  chapter: number;
}

// export type AgeRange = "young" | "average" | "older";
export enum AgeRange {
  YOUNG = "young",
  AVERAGE = "average",
  OLDER = "older",
}

interface SetAgeRangeCarePathway {
  type: typeof actionTypes.SET_AGE_RANGE_CARE_PATHWAY;
  ageRange: AgeRange;
}

interface SetAgeRangeDropdownOpenCarePathway {
  type: typeof actionTypes.SET_AGE_RANGE_DROPDOWN_OPEN_CARE_PATHWAY;
  ageRangeDropdownOpen: boolean;
}

export const setDataCarePathway = (data: CarePathwayData): SetDataCarePathway => {
  return {
    type: actionTypes.SET_DATA_CARE_PATHWAY,
    data,
  };
};

export const setActiveChapterCarePathway = (chapter: number): SetActiveChapterCarePathway => {
  return {
    type: actionTypes.SET_ACTIVE_CHAPTER_CARE_PATHWAY,
    chapter,
  };
};

export const setAgeRangeCarePathway = (ageRange: AgeRange): SetAgeRangeCarePathway => {
  return {
    type: actionTypes.SET_AGE_RANGE_CARE_PATHWAY,
    ageRange,
  };
};

export const setAgeRangeDropdownOpenCarePathway = (
  ageRangeDropdownOpen: boolean
): SetAgeRangeDropdownOpenCarePathway => {
  return {
    type: actionTypes.SET_AGE_RANGE_DROPDOWN_OPEN_CARE_PATHWAY,
    ageRangeDropdownOpen,
  };
};

export type CarePathwayActionTypes =
  | SetDataCarePathway
  | SetActiveChapterCarePathway
  | SetAgeRangeCarePathway
  | SetAgeRangeDropdownOpenCarePathway;
