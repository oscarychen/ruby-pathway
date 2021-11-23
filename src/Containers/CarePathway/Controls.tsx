import React, { Dispatch } from "react";
import { makeStyles } from "@mui/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip, { ChipProps } from "@mui/material/Chip";
import Select, { SelectProps, SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HealingIcon from "@mui/icons-material/Healing";
import { DistributiveOmit } from "@mui/types";
import clsx from "clsx";
import { AgeRange, CarePathwayActionTypes } from "Store/Actions/carePathway";
import { connect, RootStateOrAny } from "react-redux";
import { CarePathwayData } from "Store/Reducers/carePathway";
import * as actions from "Store/Actions/index";

type PropsType = {
  activeChapter: number;
  ageRange: AgeRange;
  ageRangeDropdownOpen: boolean;
  setActiveChapter: (chapter: number) => void;
  setAgeRange: (ageRange: AgeRange) => void;
  setAgeRangeDropdownOpen: (open: boolean) => void;
};

interface BreadcrumbPropsType {
  activated: boolean;
  ageRange: AgeRange;
  setAgeRange: (ageRange: AgeRange) => void;
  ageRangeDropdownOpen: boolean;
  setAgeRangeDropdownOpen: (open: boolean) => void;
}

const useStyles = makeStyles({
  button: {
    background: (props: BreadcrumbPropsType) =>
      props.activated
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 5,
    boxShadow: (props: BreadcrumbPropsType) =>
      props.activated ? "0 3px 5px 2px rgba(255, 105, 135, .3)" : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 32,
    padding: "0 10px",
    margin: 5,
  },
  buttonLeft: {
    paddingRight: 0,
    marginLeft: 0,
    margin: "auto",
    verticalAlign: "middle",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRight: {
    paddingRight: 0,
    marginLeft: 0,
    verticalAlign: "middle",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    fontSize: "0.5rem",
  },
});

const CustomBreadcrumb = (props: BreadcrumbPropsType & DistributiveOmit<ChipProps, keyof BreadcrumbPropsType>) => {
  const { activated, ageRange, setAgeRange, ageRangeDropdownOpen, setAgeRangeDropdownOpen, ...other } = props;
  const classes = useStyles(props);
  return <Chip className={classes.button} {...other} />;
};

const BreadcrumbWithDropdown = (
  props: BreadcrumbPropsType & DistributiveOmit<SelectProps & ChipProps, keyof BreadcrumbPropsType>
) => {
  const { activated, ageRange, setAgeRange, ageRangeDropdownOpen, setAgeRangeDropdownOpen, ...other } = props;
  const classes = useStyles(props);

  const handleAgeRangeChange = (event: SelectChangeEvent) => {
    const age = event.target.value as AgeRange;
    setAgeRange(age);
  };
  const handleDropdownOpen = () => {
    setAgeRangeDropdownOpen(true);
  };
  const handleDropdownClose = () => {
    setAgeRangeDropdownOpen(false);
  };
  return (
    <div>
      <Chip className={clsx(classes.button, classes.buttonLeft)} {...other} />
      <Select
        className={clsx(classes.button, classes.buttonRight)}
        {...other}
        disableUnderline
        value={ageRange}
        defaultValue="select"
        open={ageRangeDropdownOpen}
        onChange={handleAgeRangeChange}
        onOpen={handleDropdownOpen}
        onClose={handleDropdownClose}
      >
        <MenuItem value="na" disabled>
          Select age
        </MenuItem>
        <MenuItem value="young">Young</MenuItem>
        <MenuItem value="average">Average</MenuItem>
        <MenuItem value="older">Older</MenuItem>
      </Select>
    </div>
  );
};

function Controls(props: PropsType) {
  const { activeChapter, setActiveChapter, ...other } = props;

  const updateActiveChapterOnAgeChange = () => {
    if (props.ageRange === AgeRange.YOUNG) {
      setActiveChapter(3);
    } else if (props.ageRange === AgeRange.AVERAGE) {
      setActiveChapter(4);
    } else if (props.ageRange === AgeRange.OLDER) {
      setActiveChapter(5);
    }
  };

  React.useEffect(() => {
    updateActiveChapterOnAgeChange();
  }, [props.ageRange]);

  const handleClick = (chapter: number) => (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setActiveChapter(chapter);
  };

  const handleClickForAgeSelection = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    updateActiveChapterOnAgeChange();
  };

  const isChipActivated = (chipNumber: number | Array<Number>) => {
    if (typeof chipNumber === "number") {
      return chipNumber === props.activeChapter;
    } else if (chipNumber instanceof Array) {
      return chipNumber.includes(props.activeChapter);
    } else {
      return false;
    }
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="››">
      <CustomBreadcrumb
        activated={isChipActivated(0)}
        label="Risk Assessment"
        icon={<HomeOutlinedIcon fontSize="small" />}
        onClick={handleClick(0)}
        {...other}
      />

      <CustomBreadcrumb
        activated={isChipActivated(1)}
        label="Clinical Assessment"
        icon={<YoutubeSearchedForIcon fontSize="small" />}
        onClick={handleClick(1)}
        {...other}
      />

      <CustomBreadcrumb
        activated={isChipActivated(2)}
        label="New Diagnosis of DCIS"
        icon={<HealingIcon fontSize="small" />}
        onClick={handleClick(2)}
        {...other}
      />

      <BreadcrumbWithDropdown
        activated={isChipActivated([3, 4, 5])}
        label={"New Diagnosis of Breast Cancer"}
        icon={<LocalHospitalOutlinedIcon fontSize="small" />}
        onClick={handleClickForAgeSelection}
        {...other}
      />

      <CustomBreadcrumb
        activated={isChipActivated(6)}
        label="Pregnancy-Associated Breast Cancer"
        icon={<HomeOutlinedIcon fontSize="small" />}
        onClick={handleClick(6)}
        {...other}
      />
    </Breadcrumbs>
  );
}

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    pathwayData: state.carePathway.data,
    activeChapter: state.carePathway.activeChapter,
    ageRange: state.carePathway.ageRange,
    ageRangeDropdownOpen: state.carePathway.ageRangeDropdownOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CarePathwayActionTypes>) => {
  return {
    setPathwayData: (data: CarePathwayData) => dispatch(actions.setDataCarePathway(data)),
    setActiveChapter: (chapter: number) => dispatch(actions.setActiveChapterCarePathway(chapter)),
    setAgeRange: (ageRange: AgeRange) => dispatch(actions.setAgeRangeCarePathway(ageRange)),
    setAgeRangeDropdownOpen: (open: boolean) => dispatch(actions.setAgeRangeDropdownOpenCarePathway(open)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Controls);
