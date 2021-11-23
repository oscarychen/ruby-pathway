import React, { memo } from "react";
import { Node, Handle, Position } from "react-flow-renderer";

const nodeStyles = {
  border: "2px solid #b1b1b7",
};

const handleStyle = {
  border: 0,
  background: 0,
};

export const InvisibleNode = memo((props: Node) => {
  return (
    <div style={nodeStyles}>
      <Handle type="target" id="left" position={Position.Left} style={handleStyle} />
      <Handle type="target" id="top" position={Position.Top} style={handleStyle} />
      <Handle type="target" id="right" position={Position.Right} style={handleStyle} />
      <Handle type="target" id="bottom" position={Position.Bottom} style={handleStyle} />
      <Handle type="source" id="left" position={Position.Left} style={handleStyle} />
      <Handle type="source" id="top" position={Position.Top} style={handleStyle} />
      <Handle type="source" id="right" position={Position.Right} style={handleStyle} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={handleStyle} />
    </div>
  );
});
