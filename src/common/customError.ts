export class CustomError extends Error {
  constructor(
    public readonly status: number,
    public readonly details: string,
  ) {
    super();
  }
}

export enum ErrorCodes {
  MISSING_GPT_CONFIG = 999,
  OPENAI_CLIENT_ERROR = 1000,
}
