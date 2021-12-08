import { SyntheticEvent } from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "Store/appStore";
import { selectPathwayActiveChapter, setPathwayChapter } from "Store/slices/carePathway";

export default function Controls() {
  const dispatch = useAppDispatch();
  const activeChapter = useAppSelector(selectPathwayActiveChapter);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(setPathwayChapter(newValue));
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={activeChapter}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="tabs"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        <Tab label="Risk Asessment" />
        <Tab label="Clinical Assessment" />
        <Tab label="New Diagnosis of DCIS" />
        <Tab label="New Diagnosis of Young Age Breast Cancer" />
        <Tab label="New Diagnosis of Average Age Breast Cancer" />
        <Tab label="New Diagnosis of Older Age Breast Cancer" />
        <Tab label="Pregnancy-Associated Breast Cancer" />
      </Tabs>
    </Box>
  );
}
