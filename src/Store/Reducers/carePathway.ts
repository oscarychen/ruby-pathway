import { AgeRange, CarePathwayActionTypes } from "Store/Actions/carePathway";
import * as actionTypes from "../Actions/actionTypes";

export interface PathDataElement {
  id: string;
  type: string;
  data: { [T: string]: any };
  position: { x: Number; y: number };
  targetPosition?: string;
  sourcePosition?: string;
  source?: string;
  target?: string;
  arrowHeadType?: string;
}
export interface CarePathwayData {
  [T: string]: Array<PathDataElement>;
}
export interface CarePathwayState {
  data: CarePathwayData;
  activeChapter: number;
  ageRange: AgeRange | null;
  ageRangeDropdownOpen: boolean;
}

const initialState = {
  data: undefined,
  activeChapter: 0,
  ageRange: null,
  ageRangeDropdownOpen: false,
};

const reducer = (state = initialState, action: CarePathwayActionTypes) => {
  switch (action.type) {
    case actionTypes.SET_DATA_CARE_PATHWAY:
      return { ...state, data: action.data };
    case actionTypes.SET_ACTIVE_CHAPTER_CARE_PATHWAY:
      return { ...state, activeChapter: action.chapter };
    case actionTypes.SET_AGE_RANGE_CARE_PATHWAY:
      return { ...state, ageRange: action.ageRange };
    case actionTypes.SET_AGE_RANGE_DROPDOWN_OPEN_CARE_PATHWAY:
      return { ...state, ageRangeDropdownOpen: action.ageRangeDropdownOpen };
    default:
      return state;
  }
};

export default reducer;
