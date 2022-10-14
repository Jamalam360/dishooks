import { post } from "https://deno.land/x/dishooks@v1.1.0/mod.ts";

await post(
  "YOUR_URL",
  {
    content: "Hello, World!",
  },
);
