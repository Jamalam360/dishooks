let template = await Deno.readTextFile("./.github/README_TEMPLATE.md");

template = template.replace(
  "${EXAMPLE}",
  await Deno.readTextFile("./example/example.ts"),
);
template = template.replace(
  "${EXAMPLE_NO_VALIDATE}",
  await Deno.readTextFile("./example/exampleNoValidate.ts"),
);
template = template.replace(
  "${EXAMPLE_TRUNCATION}",
  await Deno.readTextFile("./example/exampleTruncation.ts"),
);
await Deno.writeTextFile("./README.md", template);
