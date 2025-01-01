import { z } from '@hono/zod-openapi';

export const HoroscopeGetResponseSchema = z.object({
	horoscope: z.string().openapi({ example: "You're going to be really lucky today!" }),
});

export type HoroscopeGetResponse = z.infer<typeof HoroscopeGetResponseSchema>;
