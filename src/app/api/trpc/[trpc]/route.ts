import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc";
import { NextRequest, NextResponse } from "next/server";
import { createContext } from "@/trpc/context";

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        createContext,
        router: appRouter,
    });

export { handler as GET, handler as POST };