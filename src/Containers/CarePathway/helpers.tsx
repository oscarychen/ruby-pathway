// element id must be in the following format:
// notes: string that represent an integer, ie "1", "2", "3", etc
// edges: string that start with 'e' followed by the source node number, "-", and finally target node number.
// ie: "e2-5", "e12-5", etc.
import { Elements, FlowElement, isEdge } from "react-flow-renderer";
import { get, transform } from "lodash";

export const regexElId = /^(\d+)|e(\d+)-(\d+)/;

/**
 * Check an element against a node element.
 * Return true if the edge comes from the node.
 * Return false if the edge goes to the node.
 * Return null if edge is not connected to the node.
 * @param node the node being queried
 * @param elementChecked the element for which to check the relation with regards to the querying node
 * @returns true if elementChecked is an edge that comes from the node, false if the elementChecked is an edge that goes to the node, otherwise null.
 */
export const isEdgeFromOrToNode = (node: FlowElement, elementChecked: FlowElement) => {
  const nodeId = node.id;

  if (isEdge(elementChecked)) {
    const edgeFrom = elementChecked.target;
    const edgeTo = elementChecked.source;

    if (nodeId === edgeFrom) {
      return false;
    } else if (nodeId === edgeTo) {
      return true;
    }
  }

  return null;
};

/**
 * Given list of elements and an edge, return elements that are directly connected to the edge.
 */
export const getNodesOfEdge = (elements: Elements, edge: FlowElement) => {
  const match = edge.id.match(regexElId);
  const edgeFrom = match ? match[2] : null;
  const edgeTo = match ? match[3] : null;
  return elements.filter((element) => element.id === edgeFrom || element.id === edgeTo);
};

/**
 * Get entire list of data elements (Nodes and Edges) with updated visibility attributes
 * @param elements entire list of data elements
 * @param elementClicked the element that user is interacting with
 * @param groupRelations a dictionary mapping group id to parent group id
 * @param mouseover true if the action is triggered by hoverover, false if triggered by click.
 * @param desiredStatus visibility status to switch to, true or false
 * @returns
 */
export const getElementsWithUpdatedVisibilityOnUserAction = (
  elements: Elements,
  elementClicked: FlowElement,
  groupRelations: { [key: string]: string },
  mouseover?: boolean,
  desiredStatus?: boolean
) => {
  // Do nothing if an edge is clicked
  if (isEdge(elementClicked)) {
    return elements;
  }

  const currentStatus = mouseover ? elementClicked.data?.preview : elementClicked.data?.isActive;
  const newStatus = desiredStatus || !currentStatus;

  // const currentStatus = elementClicked.data?.isActive || elementClicked.data?.preview;
  // const newStatus = desiredStatus || !currentStatus;

  const groupIdClicked = elementClicked.data?.group;
  const groupIds = getRelatedGroupIds([groupIdClicked], newStatus, mouseover, groupRelations);

  // elements that are in the same group with these adjacent nodes
  const groupNodes = elements.filter((item) => groupIds.has(item.data?.group));
  const groupNodeIds = groupNodes.map((item) => item.id);

  if (mouseover && mouseover === true) {
    //mouseover preview
    return elements.map((el) =>
      groupNodeIds.includes(el.id) ? { ...el, data: { ...el.data, preview: newStatus } } : el
    );
  } else {
    // clicking on elements
    return elements.map((el) =>
      groupNodeIds.includes(el.id) ? { ...el, data: { ...el.data, isActive: newStatus, preview: newStatus } } : el
    );
  }
};

/**
 * Get the group ids which need to have their status modified
 * @param groupIds triggering groups
 * @param newStatus new status desired
 * @param groupRelations a dictionary mapping group id to parent group id
 * @returns a set of group ids
 */
const getRelatedGroupIds = (
  groupIds: Array<string>,
  newStatus: boolean,
  mouseover: boolean = false,
  groupRelations: { [key: string]: string }
): Set<string> => {
  let groups: Array<string>;
  if (mouseover) {
    groups = Array.prototype.concat(groupIds, getAncestorGroupIds(groupIds, groupRelations));
  } else if (newStatus) {
    groups = Array.prototype.concat(groupIds, getAncestorGroupIds(groupIds, groupRelations));
  } else {
    groups = Array.prototype.concat(groupIds, getDescendentGroupIds(groupIds, groupRelations));
  }
  return new Set(groups);
};

/**
 * Get the ancestral group ids given a list of group ids
 * @param groupIds querying groups
 * @param groupRelations a dictionary mapping group id to parent group id, or a list of parent group ids
 * @returns a list of ancester group ids
 */
const getAncestorGroupIds = (groupIds: Array<string>, groupRelations: { [key: string]: string | Array<string> }) => {
  const ancestors = new Set<string>();
  for (let i in groupIds) {
    let groupId = groupIds[i];
    let cursor: string = groupId;
    let groupParent = get(groupRelations, cursor);

    while (groupParent) {
      if (typeof groupParent === "string") {
        // if parent is a string
        ancestors.add(groupParent);
        cursor = groupParent;
        groupParent = get(groupRelations, cursor);
      } else {
        // do nothing if it has multiple parents (in a list), stop loop
        break;
      }
    }
  }

  return Array.from(ancestors);
};

/**
 * Get the descendent group ids given a list of group ids
 * @param groupIds querying groups
 * @param groupRelations a dictionary mapping group id to parent group id
 * @returns a list of descendent group ids
 */
const getDescendentGroupIds = (groupIds: Array<string>, groupRelations: { [key: string]: string }) => {
  const reverseRelations = transform(groupRelations, function (result: { [key: string]: Array<string> }, value, key) {
    (result[value] || (result[value] = [])).push(key);
  });

  const descendents: Array<string> = [];

  const getChildren = (ids: Array<string>) => {
    for (let i in ids) {
      let id = ids[i];
      const iChildren = get(reverseRelations, id);
      if (iChildren) {
        descendents.push(...iChildren);
        getChildren(iChildren);
      }
    }
  };
  getChildren(groupIds);

  return Array.from(new Set(descendents));
};

/**
 * Return updated list of elements where each element is set to hidden except for the first element.
 */
export const getHideAllElements = (data: Elements) => {
  return data.map((item, i) => {
    return { ...item, isHidden: i === 0 ? false : true };
  });
};

/**
 * Return updated list of elements where every element is set to visible.
 */
export const getShowAllElements = (data: Elements | undefined) => {
  return data?.map((item, i) => {
    return { ...item, isHidden: false };
  });
};

export const makeTranslucent = (element: Element) => {};
