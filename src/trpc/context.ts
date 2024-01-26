import * as trpc from '@trpc/server';
import { getAuth, SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server';
import db from '@/lib/db';

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}
 
export const createContextInner = async ({ auth }: AuthContext  ) => {
  return {
    db,
    auth
  }
}
 
export const createContext = async (
  opts: any
) => {
  return await createContextInner({ auth: getAuth(opts.req) })
}
 
export type Context = trpc.inferAsyncReturnType<typeof createContext>;