const entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Techspec-vision',
  guard: (ctx) => {
    return (ctx.issue.fields.Manager != null);
  },
  action: (ctx) => {
    ctx.issue.permittedUsers.add(new entities.User.findByLogin(ctx.issue.fields.Manager.login));
    ctx.issue.permittedUsers.add(new entities.User.findByLogin('lid_login'));
    ctx.issue.permittedGroups.add(new entities.UserGroup.findByName('HR.HRs'));
  },
  requirements: {

  }
});