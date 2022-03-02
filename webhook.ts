import { WebhookMessage, WebhookResponse } from "./mod.ts";

export async function post(
  url: string,
  body: WebhookMessage,
  validate = true,
  truncate = true,
  truncationString = "...",
): Promise<WebhookResponse> {
  if (validate || truncate) {
    let characterCount = 0;

    characterCount += body.username?.length ?? 0;
    if (body.username && body.username.length > 80) {
      if (truncate) {
        body.username =
          body.username.substring(0, 80 - truncationString.length) +
          truncationString;
      } else {
        return {
          success: false,
          status: 400,
          message: "Username too long (max 80)",
        };
      }
    }

    characterCount += body.content?.length ?? 0;
    if (body.content && body.content.length > 2000) {
      if (truncate) {
        body.content =
          body.content.substring(0, 2000 - truncationString.length) +
          truncationString;
      } else {
        return {
          success: false,
          status: 400,
          message: "Content too long (max 2000)",
        };
      }
    }

    if (body.attachments && body.attachments.length > 10) {
      if (truncate) {
        body.attachments = body.attachments.slice(0, 10);
      } else {
        return {
          success: false,
          status: 400,
          message: "Too many attachments (max 10)",
        };
      }
    }

    if (body.embeds) {
      body.embeds.forEach((element) => {
        characterCount += element.title?.length ?? 0;
        if (element.title && element.title.length > 256) {
          if (truncate) {
            element.title =
              element.title.substring(0, 256 - truncationString.length) +
              truncationString;
          } else {
            return {
              success: false,
              status: 400,
              message: "Embed title too long (max 256)",
            };
          }
        }

        characterCount += element.description?.length ?? 0;
        if (element.description && element.description.length > 4096) {
          if (truncate) {
            element.description =
              element.description.substring(0, 4096 - truncationString.length) +
              truncationString;
          } else {
            return {
              success: false,
              status: 400,
              message: "Embed description too long (max 4096)",
            };
          }
        }

        characterCount += element.author?.name.length ?? 0;
        if (element.author && element.author.name.length > 256) {
          if (truncate) {
            element.author.name =
              element.author.name.substring(0, 256 - truncationString.length) +
              truncationString;
          } else {
            return {
              success: false,
              status: 400,
              message: "Embed author name too long (max 256)",
            };
          }
        }

        if (element.fields && element.fields.length > 25) {
          if (truncate) {
            element.fields = element.fields.slice(0, 25);
          } else {
            return {
              success: false,
              status: 400,
              message: "Too many embed fields (max 25)",
            };
          }
        }

        element.fields?.forEach((field) => {
          characterCount += field.name.length;
          if (field.name.length > 256) {
            return {
              success: false,
              status: 400,
              message: "Embed field name too long (max 256)",
            };
          }

          characterCount += field.value.length;
          if (field.value.length > 1024) {
            if (truncate) {
              field.value =
                field.value.substring(0, 1024 - truncationString.length) +
                truncationString;
            } else {
              return {
                success: false,
                status: 400,
                message: "Embed field value too long (max 1024)",
              };
            }
          }
        });

        characterCount += element.footer?.text.length ?? 0;
        if (element.footer && element.footer.text.length > 2048) {
          if (truncate) {
            element.footer.text =
              element.footer.text.substring(0, 2048 - truncationString.length) +
              truncationString;
          } else {
            return {
              success: false,
              status: 400,
              message: "Embed footer text too long (max 2048)",
            };
          }
        }
      });

      if (characterCount > 6000) {
        return {
          success: false,
          status: 400,
          message: "Message too long (max 6000)",
        };
      }
    }
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const whResponse = {} as WebhookResponse;

  whResponse.success = response.status == 204;
  whResponse.status = response.status;

  if (!whResponse.success) {
    whResponse.message = await response.json();
  }

  return whResponse;
}
