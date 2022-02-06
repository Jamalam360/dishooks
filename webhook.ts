import { WebhookMessage, WebhookResponse } from "./mod.ts";

export async function post(
  url: string,
  body: WebhookMessage,
  validate = true,
): Promise<WebhookResponse> {
  if (validate) {
    if (body.username && body.username.length > 80) {
      return {
        success: false,
        status: 400,
        message: "Username too long (max 80)",
      };
    }

    if (body.content && body.content.length > 2000) {
      return {
        success: false,
        status: 400,
        message: "Content too long (max 2000)",
      };
    }

    if (body.attachments && body.attachments.length > 10) {
      return {
        success: false,
        status: 400,
        message: "Too many attachments (max 10)",
      };
    }

    if (body.embeds) {
      body.embeds.forEach((element) => {
        if (element.title && element.title.length > 256) {
          return {
            success: false,
            status: 400,
            message: "Embed title too long (max 256)",
          };
        }

        if (element.description && element.description.length > 2048) {
          return {
            success: false,
            status: 400,
            message: "Embed description too long (max 2048)",
          };
        }

        if (element.author && element.author.name.length > 256) {
          return {
            success: false,
            status: 400,
            message: "Embed author name too long (max 256)",
          };
        }

        if (element.fields && element.fields.length > 25) {
          return {
            success: false,
            status: 400,
            message: "Too many embed fields (max 25)",
          };
        }

        element.fields?.forEach((field) => {
          if (field.name.length > 256) {
            return {
              success: false,
              status: 400,
              message: "Embed field name too long (max 256)",
            };
          }

          if (field.value.length > 1024) {
            return {
              success: false,
              status: 400,
              message: "Embed field value too long (max 1024)",
            };
          }
        });

        if (element.footer && element.footer.text.length > 2048) {
          return {
            success: false,
            status: 400,
            message: "Embed footer text too long (max 2048)",
          };
        }
      });
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
