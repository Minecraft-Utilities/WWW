import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {},

    client: {
        NEXT_PUBLIC_API_URL: z.string(),
        NEXT_PUBLIC_BASE_URL: z.string(),
    },

    runtimeEnv: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },

    clientPrefix: "NEXT_PUBLIC_",
    emptyStringAsUndefined: true,
});
