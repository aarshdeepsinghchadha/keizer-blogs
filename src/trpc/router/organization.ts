import { organizationCountHandler } from "trpc/handlers/organization/count";
import { organizationCreateHandler } from "trpc/handlers/organization/create";
import { organizationListHandler } from "trpc/handlers/organization/list";

export const organizationRouter = {
  list: organizationListHandler,
  create: organizationCreateHandler,
  count: organizationCountHandler,
};
