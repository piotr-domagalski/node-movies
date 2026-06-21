import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DB_HOST: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_NAME: z.string().min(1),
  },
  // clientPrefix: "PUBLIC_",
  // client: {
  //   PUBLIC_API_URL: z.string().url(),
  // },
  runtimeEnv: process.env,
});

export { env };
