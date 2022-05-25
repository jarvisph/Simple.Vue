const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  Token: state => state.user.Token,
  Face: state => state.user.Face,
  NickName: state => state.user.NickName,
  UserName: state => state.user.UserName,
  CreateAt: status => status.user.CreateAt,
  Code: state => state.user.Code,
  LoginAt: state => state.user.LoginAt,
  LoginIP: state => state.user.LoginIP,
  GroupID: state => state.user.GroupID,
  Type: state => state.user.Type,
  Credit: state => state.user.Credit,
  Menus: state => state.user.Menus,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
