import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

/**
 * Schema for each data element of a pathway diagram data, representing a node or edge in the flow diagram
 */
const PathDataElementSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.array(z.object({})),
  position: z.object({ x: z.number(), y: z.number() }),
  targetPosition: z.string().optional(),
  sourcePosition: z.string().optional(),
  source: z.string().optional(),
  target: z.string().optional(),
  arrowHeadType: z.string().optional(),
});

/**
 * Schema for 'data_elements' of each pathway diagram data
 */
const CarePathwayDataElementsSchema = z.record(z.array(PathDataElementSchema));

/**
 * Schema for 'group_ancestors' of each pathway diagram data
 */
const PathElementGroupRelationSchema = z.object({
  group_ancestors: z.object({}),
});

/**
 * The data schema for each pathway diagram.
 */
const PathwayDiagramDataSchema = z.object({
  group_ancestors: PathElementGroupRelationSchema,
  data_elements: CarePathwayDataElementsSchema,
});

/**
 * The data for all pathway diagrams combined.
 */
const PathwayDataSchema = z.record(PathwayDiagramDataSchema);

/**
 * An array of pathway flow diagram data elements (nodes/edges)
 */
export type PathwayDataElementArray = z.infer<typeof CarePathwayDataElementsSchema>;

/**
 * Data representing a pathway diagram, including group_ancestors and data_elements
 */
export type PathwayDiagramData = z.infer<typeof PathwayDiagramDataSchema>;

/**
 * Data representing multiple pathway diagrams
 */
export type PathwayData = z.infer<typeof PathwayDataSchema>;

export const pathwayDataApi = createApi({
  reducerPath: "pathwayDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_PATHWAY_DATA_BASE_URL }),
  endpoints: (build) => ({
    fetchPathwayData: build.query<PathwayData, void>({
      query: () => "data.json",
    }),
  }),
});

export const { useFetchPathwayDataQuery, useLazyFetchPathwayDataQuery } = pathwayDataApi;
export const useFetchPathwayDataState = pathwayDataApi.endpoints.fetchPathwayData.useQueryState;
