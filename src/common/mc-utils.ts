import McUtilsAPI from "mcutils-js-api";
import { env } from "./env";

export const mcUtilsApi = new McUtilsAPI(env.NEXT_PUBLIC_API_URL, {
    next: {
        revalidate: 60, // 1 minute
    }
});
