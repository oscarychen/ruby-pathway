import React, { memo } from "react";
import { Node, NodeComponentProps } from "react-flow-renderer";
import { Card, Popover } from "antd";
import Interweave from "interweave";

const nodeStyles = {};

const popoverContentStyles = {
  maxWidth: 600,
  padding: 0,
  margin: -12,
};

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

  const popoverContent = (popover: { header?: string; body?: string; link?: string; coverImg?: string }) => (
    <Card
      title={popover.header}
      bordered={false}
      size="small"
      extra={
        popover.link && (
          <a target="_blank" rel="noopener noreferrer nofollow" href={popover.link}>
            More info
          </a>
        )
      }
      style={popoverContentStyles}
      cover={<img alt="" src={popover.coverImg} />}
    >
      <Interweave content={popover.body} />
    </Card>
  );

  return props.data && props.data.popover ? (
    <Popover content={popoverContent(props.data.popover)} title={props.data?.label}>
      {nodeContent}
    </Popover>
  ) : (
    nodeContent
  );
});
