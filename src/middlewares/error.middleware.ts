import { Context } from "hono";
import { NODE_ENV } from "@/configs/env";
import { ResponseStatus, RESPONSE_CODES, type ResponseCode } from "@/types";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { Prisma } from "@/generated/prisma/client";
import {
  isPrismaErrorCode,
  prismaErrorMessage,
  PrismaErrorResponse,
} from "@/lib/prisma";

const mapHttpStatusToInternalCode = (status: number): ResponseCode => {
  if (status >= 500) return RESPONSE_CODES.INTERNAL_ERROR;
  if (status === 404) return RESPONSE_CODES.NOT_FOUND;
  if (status === 403) return RESPONSE_CODES.FORBIDDEN;
  if (status === 401) return RESPONSE_CODES.UNAUTHORIZED;
  if (status === 400) return RESPONSE_CODES.VALIDATION_ERROR;
  return RESPONSE_CODES.GENERAL_FAILURE;
};

const handlePrismaKnownError = (
  err: Prisma.PrismaClientKnownRequestError
): PrismaErrorResponse => {
  if (isPrismaErrorCode(err.code)) return prismaErrorMessage(err.code);
  return { status: 500, message: "Database error" };
};

function isHTTPResponseError(error: unknown): error is { res: Response } {
  return typeof error === "object" && error !== null && "res" in error;
}

export const errorHandler = async (err: unknown, c: Context) => {
  if (NODE_ENV !== "prod") {
    console.error("[GlobalErrorHandler]", err);
  }

  let httpStatus: ContentfulStatusCode = 500;

  let message = "Internal Server Error";

  if (err instanceof HTTPException) {
    httpStatus = err.status;
    message = err.message;
  } else if (isHTTPResponseError(err)) {
    const res = err.res;
    httpStatus = res.status as ContentfulStatusCode;
    try {
      const clone = res.clone();
      const data = (await clone.json()) as { message?: string; error?: string };
      message = data.message ?? data.error ?? "HTTP Error";
    } catch {
      message = res.statusText || "HTTP Error";
    }
  } else if (err instanceof ZodError) {
    const firstIssue = err.issues[0];
    httpStatus = 400;
    message = firstIssue.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const result = handlePrismaKnownError(err);
    httpStatus = result.status as ContentfulStatusCode;
    message = result.message;
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  const internalCode = mapHttpStatusToInternalCode(httpStatus);

  return c.json(
    {
      code: internalCode,
      status: ResponseStatus.FAILED,
      message,
      timestamp: new Date().toISOString(),
    },
    httpStatus
  );
};
