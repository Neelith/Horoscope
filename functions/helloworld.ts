interface Env {
  TEST_ENV: string;
}

type Context = EventContext<Env, string, unknown>;

export async function onRequestGet(context: Context): Promise<Response> {
  return new Response(`req: ${context}`);
}
