import { useState, ReactNode, MouseEvent } from "react";
import Popper from "@mui/material/Popper";
import { uniqueId } from "lodash";

import Card, { CardProps } from "./Card";

interface PopCardProps {
  children: ReactNode;
  popover: CardProps;
}

export default function PopCard(props: PopCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? uniqueId("popcard-") : undefined;

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 1030 }} placement="top-start">
        <Card {...props.popover} />
      </Popper>
      {props.children}
    </div>
  );
}
