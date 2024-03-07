import { createTRPCRouter } from "@/server/api/trpc";
import helloRouter from "@/server/api/routers/hello";
import issueRouter from "@/server/api/routers/issue";
import chapterRouter from "@/server/api/routers/chapter";
import courseRouter from "@/server/api/routers/course";
import subChapterRouter from "@/server/api/routers/sub-chapter";
import examRouter from "./routers/exam";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	hello: helloRouter,
	issue: issueRouter,
	chapter: chapterRouter,
	course: courseRouter,
	subChapter: subChapterRouter,
	exam: examRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
