import { memo } from "react";
import { NodeComponentProps } from "react-flow-renderer";
import PopCard from "Containers/PopCard/PopCard";

const nodeStyles = {};

/**
 * Inject two new attributes to the NodeComponentProps
 * isActive: is switched true/false when user clicks on the node
 * preview: is siwtched true/false when user mouseover on the node
 */
interface CustomNodeComponentProps extends NodeComponentProps {
  isActive: boolean;
  preview: boolean;
}

export const IconNode = memo((props: CustomNodeComponentProps) => {
  const nodeContent = (
    <div
      style={{
        ...nodeStyles,
        filter: props.data?.isActive || props.data?.preview ? "" : "blur(1px)",
        opacity: props.data?.isActive || props.data?.preview ? 1 : 0.5,
      }}
    >
      <img src="/sphere_icon.png" width="30" alt="research project" />
    </div>
  );

  return props.data && props.data.popover ? <PopCard popover={props.data.popover}>{nodeContent}</PopCard> : nodeContent;
});
