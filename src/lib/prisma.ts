import { StatusCode } from "hono/utils/http-status";

type PrismaErrorCode =
  | "P1000"
  | "P1001"
  | "P1002"
  | "P1003"
  | "P1008"
  | "P1009"
  | "P1010"
  | "P1011"
  | "P1012"
  | "P1013"
  | "P1014"
  | "P2000"
  | "P2001"
  | "P2002"
  | "P2003"
  | "P2004"
  | "P2005"
  | "P2006"
  | "P2007"
  | "P2008"
  | "P2009"
  | "P2010"
  | "P2011"
  | "P2012"
  | "P2013"
  | "P2014"
  | "P2015"
  | "P2016"
  | "P2017"
  | "P2018"
  | "P2019"
  | "P2020"
  | "P2021"
  | "P2022"
  | "P2023"
  | "P2024"
  | "P2025"
  | "P2026"
  | "P2027"
  | "P2028"
  | "P2029"
  | "P3000";

export const isPrismaErrorCode = (code: string): code is PrismaErrorCode => {
  return [
    "P1000",
    "P1001",
    "P1002",
    "P1003",
    "P1008",
    "P1009",
    "P1010",
    "P1011",
    "P1012",
    "P1013",
    "P1014",
    "P2000",
    "P2001",
    "P2002",
    "P2003",
    "P2004",
    "P2005",
    "P2006",
    "P2007",
    "P2008",
    "P2009",
    "P2010",
    "P2011",
    "P2012",
    "P2013",
    "P2014",
    "P2015",
    "P2016",
    "P2017",
    "P2018",
    "P2019",
    "P2020",
    "P2021",
    "P2022",
    "P2023",
    "P2024",
    "P2025",
    "P2026",
    "P2027",
    "P2028",
    "P2029",
    "P3000",
  ].includes(code);
};

export type PrismaErrorResponse = {
  status: StatusCode;
  message: string;
};

export const prismaErrorMessage = (
  code: PrismaErrorCode
): PrismaErrorResponse => {
  const messages: Record<PrismaErrorCode, PrismaErrorResponse> = {
    P1000: {
      status: 500,
      message: "Authentication failed against database server",
    },
    P1001: { status: 500, message: "Database server not found" },
    P1002: { status: 500, message: "Database server timed out" },
    P1003: { status: 500, message: "Database does not exist" },
    P1008: { status: 500, message: "Operation timed out" },
    P1009: { status: 500, message: "Database already exists" },
    P1010: { status: 500, message: "User was denied access to the database" },
    P1011: { status: 500, message: "Error opening database file" },
    P1012: { status: 500, message: "Schema required for database connection" },
    P1013: { status: 500, message: "Database schema not found" },
    P1014: { status: 500, message: "Database schema not empty on migration" },

    P2000: { status: 400, message: "Value too long for column type" },
    P2001: { status: 404, message: "Record not found" },
    P2002: { status: 409, message: "Unique constraint failed" },
    P2003: { status: 400, message: "Foreign key constraint failed" },
    P2004: { status: 400, message: "Constraint failed" },
    P2005: { status: 400, message: "Invalid value stored in database" },
    P2006: { status: 400, message: "Invalid value for field" },
    P2007: { status: 400, message: "Data validation error" },
    P2008: { status: 400, message: "Failed to parse query" },
    P2009: { status: 400, message: "Query validation error" },
    P2010: { status: 500, message: "Raw query execution failed" },
    P2011: { status: 400, message: "Null constraint violation" },
    P2012: { status: 400, message: "Missing required value" },
    P2013: { status: 400, message: "Missing required argument" },
    P2014: { status: 400, message: "Relation violation" },
    P2015: { status: 404, message: "Related record not found" },
    P2016: { status: 400, message: "Query interpretation error" },
    P2017: { status: 400, message: "Records not connected" },
    P2018: { status: 404, message: "Required connected records not found" },
    P2019: { status: 400, message: "Input error" },
    P2020: { status: 400, message: "Value out of range" },
    P2021: { status: 404, message: "Table does not exist" },
    P2022: { status: 404, message: "Column does not exist" },
    P2023: { status: 400, message: "Inconsistent column data" },
    P2024: { status: 408, message: "Query timeout" },
    P2025: { status: 404, message: "Record to update/delete not found" },
    P2026: { status: 400, message: "Feature not supported by database" },
    P2027: { status: 400, message: "Multiple errors occurred" },
    P2028: { status: 500, message: "Transaction API error" },
    P2029: { status: 400, message: "Query parameter limit exceeded" },

    P3000: { status: 500, message: "Introspection error" },
  };

  return messages[code] ?? { status: 500, message: "Unknown Prisma error" };
};
