import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HealingIcon from "@mui/icons-material/Healing";
import { CustomBreadcrumb, CustomBreadcrumbWithDropdown } from "Containers/BreadCrumbNavigation/ControlButtons";

import { useAppDispatch, useAppSelector } from "Store/appStore";

import { selectPathwayActiveChapter, setPathwayChapter } from "Store/slices/carePathway";

export default function Controls() {
  const dispatch = useAppDispatch();
  const activeChapter = useAppSelector(selectPathwayActiveChapter);

  const handleClick = (chapter: number) => (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    dispatch(setPathwayChapter(chapter));
  };

  const isChipActivated = (chipNumber: number | Array<Number>) => {
    if (typeof chipNumber === "number") {
      return chipNumber === activeChapter;
    } else if (chipNumber instanceof Array) {
      return chipNumber.includes(activeChapter);
    } else {
      return false;
    }
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      <CustomBreadcrumb
        activated={isChipActivated(0)}
        label="Risk Assessment"
        icon={<HomeOutlinedIcon fontSize="small" />}
        onClick={handleClick(0)}
      />

      <CustomBreadcrumb
        activated={isChipActivated(1)}
        label="Clinical Assessment"
        icon={<YoutubeSearchedForIcon fontSize="small" />}
        onClick={handleClick(1)}
      />

      <CustomBreadcrumb
        activated={isChipActivated(2)}
        label="New Diagnosis of DCIS"
        icon={<HealingIcon fontSize="small" />}
        onClick={handleClick(2)}
      />

      <CustomBreadcrumbWithDropdown
        activated={isChipActivated([3, 4, 5])}
        label={"New Diagnosis of Breast Cancer"}
        icon={<LocalHospitalOutlinedIcon fontSize="small" />}
      />

      <CustomBreadcrumb
        activated={isChipActivated(6)}
        label="Pregnancy-Associated Breast Cancer"
        icon={<HomeOutlinedIcon fontSize="small" />}
        onClick={handleClick(6)}
      />
    </Breadcrumbs>
  );
}
