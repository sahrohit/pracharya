import { Client } from "@upstash/qstash";
import { env } from "@/env";

const qstash = new Client({ token: env.QSTASH_TOKEN });

export default qstash;
