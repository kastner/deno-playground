import { serve } from "https://deno.land/std@0.137.0/http/server.ts";
import React from "https://esm.sh/react@18.1.0";
import { renderToString } from "https://esm.sh/react-dom@18.1.0/server";

type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const Text = <T extends React.ElementType>(
  { as, children, ...restProps }: TextProps<T>,
) => {
  const Component = as || "span";
  return <Component {...restProps}>{children}</Component>;
};

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
