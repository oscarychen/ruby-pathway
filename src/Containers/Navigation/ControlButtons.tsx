import { makeStyles } from "@mui/styles";
import Chip, { ChipProps } from "@mui/material/Chip";
import Select, { SelectProps, SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DistributiveOmit } from "@mui/types";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "Store/appStore";

import {
  selectPathwayAgeRange,
  setPathwayAge,
  selectPathwayAgeDropdownOpen,
  setPathwayAgeDropdownOpen,
  AgeRange,
} from "Store/slices/carePathway";

interface BreadcrumbPropsType {
  activated: boolean;
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

export const CustomBreadcrumb = (
  props: BreadcrumbPropsType & DistributiveOmit<ChipProps, keyof BreadcrumbPropsType>
) => {
  const { activated, ...other } = props;
  const classes = useStyles(props);

  return <Chip className={classes.button} {...other} />;
};

export const CustomBreadcrumbWithDropdown = (
  props: BreadcrumbPropsType & DistributiveOmit<SelectProps & ChipProps, keyof BreadcrumbPropsType>
) => {
  const { activated, ...other } = props;
  const classes = useStyles(props);

  const dispatch = useAppDispatch();
  const ageRange = useAppSelector(selectPathwayAgeRange) as string;
  const ageSelectDropdownOpen = useAppSelector(selectPathwayAgeDropdownOpen);

  const handleAgeRangeChange = (event: SelectChangeEvent) => {
    const age = event.target.value as AgeRange;
    dispatch(setPathwayAge(age));
  };
  const handleDropdownOpen = () => {
    dispatch(setPathwayAgeDropdownOpen(true));
  };
  const handleDropdownClose = () => {
    dispatch(setPathwayAgeDropdownOpen(false));
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
        open={ageSelectDropdownOpen}
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
