import router from "./router";
import { start,close } from "./utils/nprogress";
import { UserStore } from "@/stores/user";

router.beforeEach(async (to, from, next) => {
  start()
  const user = UserStore();
  const token = localStorage.getItem("TOKEN");
  if (token) {
    if (to.name === "login") {
      next("/");
    } else {
      if (user.Info.ID) {
        next();
      } else {
        await user.GetInfo();
        next({
          ...to,
          replace: true,
        });
      }
    }
  } else {
    if (to.meta.login) {
      next(`/login?redirect=${to.path}`);
    } else {
      next();
    }
  }
});

router.afterEach(() => {
 close()
});
