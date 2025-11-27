import { z } from "zod";
import { requiredString } from "@/utils";

export const memberCreateSchema = z.object({
  name: requiredString("Name"),
  code: requiredString("Code"),
  barcode: requiredString("Barcode"),
  photo: requiredString("Photo"),
  card: requiredString("Card"),
});

export const memberUpdateSchema = z.object({
  name: requiredString("Name").optional(),
  code: requiredString("Code").optional(),
  barcode: requiredString("Barcode").optional(),
  photo: requiredString("Photo").optional(),
  card: requiredString("Card").optional(),
  version: z.number().int().min(0, "Version must be a positive integer"),
});

export type MemberCreateSchema = z.infer<typeof memberCreateSchema>;
export type MemberUpdateSchema = z.infer<typeof memberUpdateSchema>;
