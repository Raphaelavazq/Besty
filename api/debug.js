export default function handler(req, res) {
  // Safe debug: report only presence (boolean) of required env vars.
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasUpstash = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ok: true, hasOpenAI, hasUpstash }));
}
