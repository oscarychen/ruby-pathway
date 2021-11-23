import React, { Dispatch } from "react";
import ReactFlow, {
  Elements,
  Node,
  FlowElement,
  ReactFlowProvider,
  OnLoadParams,
  isNode,
  FlowTransform,
  MiniMap,
  Controls,
} from "react-flow-renderer";
// import { StandardDiamond } from "./DiamondNode";
import { InvisibleNode } from "./InvisibleNode";
import { CustomNode } from "./CustomNodes";
import { IconNode } from "./IconNode";
import CustomEdge from "./CustomEdge";
import {
  getElementsWithUpdatedVisibilityOnUserAction as getElementsWithUpdatedVisibilityOnNodeFocus,
  getShowAllElements,
} from "./helpers";
import { Easing, Tween, update } from "@tweenjs/tween.js";
import * as actions from "Store/Actions/index";
import { connect, ConnectedProps, RootStateOrAny } from "react-redux";
import { debounce } from "lodash";
// import useCursorPosition from "Components/Hooks/cursor";
// import useWindowResize from "Components/Hooks/viewport";

const nodeTypes = {
  // diamond: StandardDiamond,
  custom: CustomNode,
  icon: IconNode,
  invisible: InvisibleNode,
};

/**
 * To use a custom edge with text, set "type" attribute,
 * and then "data" attribute with an object that contains "text". ie:
 * "type": "custom",
 * "data": { "text": "Hello" }
 */
const edgeTypes = {
  custom: CustomEdge,
};

type PropsType = ConnectedProps<typeof connector> & {
  data: any;
  dataKey?: string;
  groupRelationsKey?: string;
  // dataSetter: (data: any) => void;
  setChapterFunc?: (chapter: number) => void;
  transform?: { x: number; y: number; zoom: number };
  autoscroll?: boolean;
};

function PathwayDiagram(props: PropsType) {
  const [elements, setElements] = React.useState<Elements>([]);
  const [rfInstance, setRfInstance] = React.useState<OnLoadParams>();
  const onLoad = (reactFlowInstance: OnLoadParams) => {
    setRfInstance(reactFlowInstance);
    // refocus(null);
  };

  // const [width, height] = useWindowResize();
  // const cursorPosition = useCursorPosition();
  // React.useEffect(() => {
  //   console.log("Window w/h: ", width, height);
  //   console.log(cursorPosition);
  //   const panLeft = cursorPosition.x < 200;
  //   const panRight = width - cursorPosition.x < 200;

  //   if (rfInstance) {
  //     const [curX, curY] = rfInstance.toObject().position;
  //     let newX: number = 0;
  //     if (panLeft) {
  //       newX = curX + 200;
  //     } else if (panRight) {
  //       newX = curX - 200;
  //     }
  //     transform({ x: newX });
  //   }
  // }, [cursorPosition, width, height]);

  /**
   * Set up tweenjs
   */
  React.useEffect(() => {
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      update(time);
    };
    const requestId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, []);

  React.useEffect(() => {
    if (props.data) {
      const data = props.dataKey ? props.data[props.dataKey] : props.data["data_elements"];
      setElements(getShowAllElements(data) || []);
    }
  }, [props]);

  React.useEffect(() => {
    if (rfInstance && elements) {
      rfInstance.fitView();
      if (props.transform) {
        transform(props.transform, 1000);
      }
    }
  }, [rfInstance]);

  const groupRelations = props.groupRelationsKey ? props.data[props.groupRelationsKey] : props.data["group_ancestors"];

  /**
   * Action when element is clicked on
   */
  const onElementClicked = (event: React.MouseEvent<Element, MouseEvent>, element: FlowElement) => {
    console.info(`Clicked on element "${element.id}" of "${element.data?.group}"`);

    if (element.data?.onClickLink) {
      // clicking on a node with behavior to open a link on-click
      window.open(element.data.onClickLink, "_blank");
      setElements(getElementsWithUpdatedVisibilityOnNodeFocus(elements, element, groupRelations, false, true));
    } else if (element.data?.onClickGoTo && props.setChapterFunc) {
      // clicking on a node that switches chapter
      props.setChapterFunc(element.data.onClickGoTo);
      setElements(getElementsWithUpdatedVisibilityOnNodeFocus(elements, element, groupRelations, false, true));
    } else if (element.type === "icon") {
      setElements(getElementsWithUpdatedVisibilityOnNodeFocus(elements, element, groupRelations, false, true));
    } else {
      // default node onclick behavior
      setElements(getElementsWithUpdatedVisibilityOnNodeFocus(elements, element, groupRelations, false));
    }
  };

  const onNodeMouseEnter = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
    if (!node.data?.isActive) {
      setElements(getElementsWithUpdatedVisibilityOnNodeFocus(elements, node, groupRelations, true, true));
    }
  };

  const debounceMouseEnter = debounce(onNodeMouseEnter, 250);

  const onNodeMouseLeave = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
    debounceMouseEnter.cancel();
    if (!node.data?.isActive && node.data?.preview) {
      setElements(getElementsWithUpdatedVisibilityOnNodeFocus(elements, node, groupRelations, true, false));
    }
  };

  /**
   * Focus canvas on a given Node
   */
  const transformToNode = (element: FlowElement | null, delay: number = 0) => {
    if (element && isNode(element)) {
      const newX = -element.position.x / 2;
      const newY = -element.position.y / 2;
      transform({ x: newX, y: newY }, delay);
    }
  };

  /**
   * transform to given x,y coordinates and zoom
   */
  const transform = (transform: { x?: number; y?: number; zoom?: number }, delay: number = 0) => {
    if (rfInstance) {
      const {
        position: [x, y],
        zoom,
      } = rfInstance.toObject();

      const transformTo = { ...{ x, y, zoom }, ...transform };

      new Tween({ x, y, zoom })
        .to(transformTo, 500)
        .easing(Easing.Quadratic.Out)
        .onUpdate(({ x, y, zoom }: FlowTransform) => {
          rfInstance.setTransform({ x, y, zoom });
        })
        .delay(delay)
        .start();
    }
  };

  return (
    <div style={{ height: "calc(100vh - 42px)", width: "100vw", margin: "auto" }}>
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnDoubleClick={false}
          onElementClick={onElementClicked}
          onNodeMouseEnter={debounceMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          // onPaneClick={() => rfInstance?.fitView()}
          maxZoom={2}
          minZoom={0.2}
          // defaultPosition={[200, 150]}
          onLoad={onLoad}
          zoomOnScroll={false}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    pathwayData: state.carePathway.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setPathwayData: (data: any) => dispatch(actions.setDataCarePathway(data)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PathwayDiagram);
