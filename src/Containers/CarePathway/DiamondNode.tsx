import React, { memo } from "react";
import { Handle, Position, Node } from "react-flow-renderer";
import { Popover } from "antd";

const nodeStyles = {};

const diamondShapeStyles = {
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 3,
  borderColor: "#9673A6",
  backgroundColor: "#E1D5E7",
  margin: "auto",
  textAlign: "center" as const,
  width: 80,
  height: 80,
  transform: "rotate(45deg)",
};

const textStyles = {
  display: "table-cell",
  height: 80,
  transform: "rotate(-45deg)",
  verticalAlign: "middle",
  width: 80,
};

export const StandardDiamond = memo((props: Node) => {
  const popoverContent = (
    <div>
      <p>{props.data?.content}</p>
    </div>
  );

  return (
    <Popover content={popoverContent} title={props.data?.label}>
      <div style={nodeStyles}>
        <div style={diamondShapeStyles}>
          <div style={textStyles}>{props.data.label}</div>
        </div>
        <Handle type="target" position={Position.Left} id="target-left" style={{ left: -16 }} />
        <Handle type="target" position={Position.Top} id="target-top" style={{ top: -16 }} />
        <Handle type="target" position={Position.Right} id="target-right" style={{ right: -16 }} />
        <Handle type="target" position={Position.Bottom} id="target-bottom" style={{ bottom: -16 }} />

        <Handle type="source" position={Position.Left} id="source-left" style={{ left: -16 }} />
        <Handle type="source" position={Position.Top} id="source-top" style={{ top: -16 }} />
        <Handle type="source" position={Position.Right} id="source-right" style={{ right: -16 }} />
        <Handle type="source" position={Position.Bottom} id="source-bottom" style={{ bottom: -16 }} />
      </div>
    </Popover>
  );
});
