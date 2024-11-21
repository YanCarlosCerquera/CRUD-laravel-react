import { createBrowserRouter } from "react-router-dom";
import rootRouter from "router/services/routerService";
import {
  authRouter, 
  userRouter, 
  roleRouter
} from "router/services/routerService";


// Combine all routes with future option
const router = createBrowserRouter(
  [
    ...rootRouter,
    ...userRouter,
    ...roleRouter,
    ...authRouter,
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;

