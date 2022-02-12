# Dishooks

Dishooks is a super small Deno library used to post to Discord webhooks, created
so you don't have to use a large full-featured Discord library just to post to a
webhook.

Example:

```ts
import { post } from "https://deno.land/x/dishooks@v1.0.3/mod.ts";

await post(
  "YOUR_URL",
  {
    content: "Hello, World!",
  },
);

```

You can use IDE autocomplete to see what options are available for the webhook
message object.

The method returns the following object:

```
success: boolean;
status: number;
message?: string;
```

`status` will be 204 if the webhook was successfully posted, and `message` will
only be present if there was an error

The library will return more helpful error messages (if it detects an issue) if
you pass in an invalid message, before trying to send it to the Discord API. You
can disable this by setting `validate` to `false` when you call the `post`
method:

```ts
import { post } from "https://deno.land/x/dishooks@v1.0.3/mod.ts";

await post(
  "YOUR_URL",
  {
    content: "Hello, World!",
  },
  false,
);

```

Dishooks can also truncate content to the maximum length if it is larger than
the maximum size:

```ts
import { post } from "https://deno.land/x/dishooks@v1.0.3/mod.ts";

await post(
  "YOUR_URL",
  {
    content: "Hello, World!",
  },
  true, // validate
  true, // truncate
  "[...]", // truncationString
);

```
