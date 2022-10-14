/**
 * Contains some common colors used within Discord
 * webhooks.
 */
export enum Colors {
  Blurple = 0x5765F2,
  Green = 0x86EE92,
  Yellow = 0xF3DE6C,
  Fuchsia = 0xD9539D,
  Pink = 0xD9539D,
  Red = 0xEE4043,
  White = 0xFEFEFE,
  Black = 0x1E2227,
}

/**
 * Returned by the post webhook function.
 */
export interface WebhookResponse {
  success: boolean;
  status: number;
  message?: string;
}

/**
 * The base of a webhook message.
 */
export interface WebhookMessage {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: Embed[];
  attachments?: Attachment[];
}

/**
 * An embed within a webhook message.
 */
export interface Embed {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

/**
 * The footer of an embed.
 */
export interface EmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

/**
 * An image displayed within an embed.
 */
export interface EmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/**
 * The thumbnail of an embed.
 */
export interface EmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

/**
 * A video displayed within an embed.
 */
export interface EmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface Attachment {
  id: string;
}
