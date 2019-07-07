module.exports = class Auth {
  constructor(permissions) {
    this.permissions = permissions;
  }

  canUser(rule, user) {
    const user = this.permissions.find(item => {
      item.rule === rule && item.login === user.login;
    });
    return user.length > 0 ? true : false;
  }
};
