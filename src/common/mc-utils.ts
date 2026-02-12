import McUtilsAPI from "mcutils-js-api";
import { env } from "./env";
import { isProduction } from "./utils";

export const mcUtilsApi = new McUtilsAPI(env.NEXT_PUBLIC_API_URL, {
  next: {
    revalidate: isProduction() ? 60 : 0,
  },
});
