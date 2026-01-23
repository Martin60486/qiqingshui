import fetch from "node-fetch";
import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = "https://fsejygujfoxbioyxwnex.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZWp5Z3VqZm94YmlveXh3bmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzIwMjcsImV4cCI6MjA0ODIwODAyN30.l14Ik580RCfmeW37Q6RjrNsjp-mFC91xIE0yg2JC7HI";

// Exports latest rows from Supabase table "blogqqs" into assets/data/blog.json
async function main() {
  const url =
    `${SUPABASE_URL}/rest/v1/blogqqs` +
    `?select=id,name,question,answer,created_at,timestamp` +
    `&order=id.desc`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase export failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  const outPath = path.resolve("assets/data/blog.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`Exported ${data.length} rows -> ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
