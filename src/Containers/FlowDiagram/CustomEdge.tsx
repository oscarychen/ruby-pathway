import { ArrowHeadType, EdgeProps, getBezierPath } from "react-flow-renderer";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = { strokeWidth: 3 },
  arrowHeadType = "arrowclosed" as ArrowHeadType,
  data,
}: EdgeProps) {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  //create an unique id for path text annotation. This is needed when multiple diagrams have overlapping edge node ids.
  const pathId = `${id}-${Date.now()}`;

  return (
    <>
      {arrowHeadType === ArrowHeadType.ArrowClosed && (
        <marker
          id={"react-flow__triangle-arrow-path"}
          refX="7"
          refY="5"
          markerHeight="15"
          markerWidth="15"
          orient="auto"
        >
          <path d="M0,0 L0,10 L10,5 Z" style={{ fill: "#b1b1b7" }} />
        </marker>
      )}
      <path
        id={pathId}
        style={{
          ...style,
          filter: data?.isActive || data?.preview ? "" : "blur(1px)",
          opacity: data?.isActive || data?.preview ? 1 : 0.5,
          strokeWidth: data?.isActive || data?.preview ? 3 : 2,
          stroke: data?.isActive ? "#5793ab" : "#9faba2",
        }}
        className="react-flow__edge-path"
        d={edgePath}
        // markerEnd="url(#react-flow__triangle-arrow-path)"
      />
      {(data?.isActive || data?.preview) && (
        <text>
          <textPath
            href={`#${pathId}`}
            style={{ fontSize: "12px", textShadow: "0px 0px 3px white" }}
            startOffset="50%"
            textAnchor="middle"
          >
            {data?.text}
          </textPath>
        </text>
      )}
    </>
  );
}
