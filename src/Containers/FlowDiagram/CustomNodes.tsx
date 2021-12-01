import { memo, CSSProperties } from "react";
import { Handle, Position, NodeComponentProps } from "react-flow-renderer";
import Interweave from "interweave";
import PopCard from "Containers/PopCard/PopCard";
/**
 * Inject two new attributes to the NodeComponentProps
 * isActive: is switched true/false when user clicks on the node
 * preview: is siwtched true/false when user mouseover on the node
 */
interface CustomNodeComponentProps extends NodeComponentProps {
  isActive: boolean;
  preview: boolean;
}

const makeNodeStyle = (style: CSSProperties | undefined) => {
  const defaultStyle = {
    borderStyle: "solid",
    borderColor: "#6C8EBF",
    backgroundColor: "#DAE8FC",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    textAlign: "center" as const,
  };
  return { ...defaultStyle, ...style };
};

const handleStyle = {
  border: 0,
  background: 0,
};

const makeMultiLineLabels = (labels?: Array<string>) =>
  labels?.map((label, i) => (
    <div key={i}>
      <Interweave content={label} />
    </div>
  ));

const makeNodeContent = (props: CustomNodeComponentProps) => (
  <div
    style={{
      ...makeNodeStyle(props.data?.style),
      filter: props.data?.isActive || props.data?.preview ? "" : "blur(1px)",
      opacity: props.data?.isActive || props.data?.preview ? 1 : 0.5,
      borderColor: props.data?.isActive ? "#5793ab" : "#9faba2",
    }}
  >
    {makeMultiLineLabels(props.data?.labels)}
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <Handle type="source" position={Position.Right} style={handleStyle} />
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

export const CustomNode = memo((props: CustomNodeComponentProps) => {
  return props.data?.popover ? (
    <PopCard popover={props.data.popover}>{makeNodeContent(props)}</PopCard>
  ) : (
    makeNodeContent(props)
  );
});
