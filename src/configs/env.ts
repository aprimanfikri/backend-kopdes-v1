function requiredEnv(name: string): string {
  const value = Bun.env[name];
  if (!value || value.trim() === "") {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

export const PORT = Number(Bun.env.PORT || 4001);
export const NODE_ENV = requiredEnv("NODE_ENV");
export const CORS_ORIGIN = requiredEnv("CORS_ORIGIN");
export const DATABASE_URL = requiredEnv("DATABASE_URL");
