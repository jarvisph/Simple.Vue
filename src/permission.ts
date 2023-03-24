import router from "./router";
import { UserStore } from "@/stores/user";
import NProgress from 'accessible-nprogress'
import "accessible-nprogress/dist/accessible-nprogress.css"


router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const user = UserStore();
  const token = localStorage.getItem("TOKEN");
  if (token) {
    if (to.name === "login") {
      next("/");
      NProgress.done()
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
      NProgress.done()
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
