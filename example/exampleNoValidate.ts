import { post } from "https://deno.land/x/dishooks@v1.0.3/mod.ts";

await post(
  "YOUR_URL",
  {
    content: "Hello, World!",
  },
  false,
);
