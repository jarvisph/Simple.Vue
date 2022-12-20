import router from "./router";
import { UserStore } from "@/stores/user";
import { GlobalStore } from "@/stores/global";
router.beforeEach(async (to, from, next) => {
  const user = UserStore();
  const global = GlobalStore();
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

router.afterEach(() => {});
