import { z } from '@hono/zod-openapi';

export const ProblemSchema = z.object({
	error: z.string(),
	code: z.number(),
	title: z.string(),
	description: z.string(),
});

export type Problem = z.infer<typeof ProblemSchema>;
