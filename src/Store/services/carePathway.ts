import { z } from "zod";

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

const CarePathwayDataSchema = z.record(z.array(PathDataElementSchema));
export type CarePathwayData = z.infer<typeof CarePathwayDataSchema>;
