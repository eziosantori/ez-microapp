export interface FramePostMessage {
  source: 'ez-microapp';
  /** Unique identifier of the iframe */
  uid?: string | null;
  message: string;
  /** The data to be passed down */
  value?: unknown;
}
