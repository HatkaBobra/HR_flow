const entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onSchedule({
  title: 'Auto Transitions',
  search: 'State: {1st date planned} has: {Start Date}',
  cron: '0 0/10 * * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let start_date = (Date.now() > ctx.issue.fields['Start Date']);
    return start_date;
  },
  action: (ctx) => {
    ctx.issue.fields['Состояние'] = 'On trial period';
  },
  requirements: {
  }
});