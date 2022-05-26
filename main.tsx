/** @jsx h */
import { serve } from "https://deno.land/std@0.137.0/http/server.ts";
import { h } from "https://esm.sh/preact@10.5.15";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";

const Text = ({ as, children }) => {
  const Component = as || "span"
  return <Component>{children}</Component>
}

function handler(_req: Request): Response {
  const page = (
    <div>
      <Text as="h1">Current time</Text>
      <p>{new Date().toLocaleString()}</p>
    </div>
  );
  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);
