import { ServerActionError } from "@/models/ServerActionError";

export enum errorCodeEnum {
  INTERNAL_SERVER_ERROR = "internal_server_error",
  UNKWNON_ERROR = "unknown_error",
  INCOMPLETED_DATA = "incompleted_data",
}

export enum errorMessageEnum {
  INTERNAL_SERVER_ERROR = "Internal server error",
  UNKWNON_ERROR = "An unknown error occurred",
  INCOMPLETED_DATA = "Data is incompleted",
}

export class CustomError extends Error {
  code: errorCodeEnum;
  description?: string;

  constructor(code: errorCodeEnum, message: string, description?: string) {
    super(message);
    this.code = code;
    this.description = description || ""
  }
}

export const createCustomErrorResponse = (e: Error|unknown): ServerActionError => {
  if (e instanceof CustomError) {
    return {
      code: e.code,
      message: e.message,
      description: e.description,
    } as ServerActionError;
  }
  return {
    code: errorCodeEnum.INTERNAL_SERVER_ERROR,
    message: errorMessageEnum.INTERNAL_SERVER_ERROR,
    description: `This is an unexpected internal server error: ${e instanceof Error ? e.message : JSON.stringify(e)}`
  } as ServerActionError;
}
