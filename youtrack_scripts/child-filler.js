const entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Fill Fields From Vacancy',
  guard: (ctx) => {
    return (ctx.issue.fields.Type.name == 'Candidate') && ((ctx.issue.becomesReported && ctx.issue.links['subtask of'].isNotEmpty()) || (ctx.issue.links['subtask of'].added.isNotEmpty()));
  },
  action: (ctx) => {
    ctx.issue.fields.Requirements = ctx.issue.links['subtask of'].first().fields.Requirements;
    ctx.issue.fields.Manager = ctx.issue.links['subtask of'].first().fields.Manager;
    ctx.issue.fields['Название вакансии'] = ctx.issue.links['subtask of'].first().summary;
  },
  requirements: {
  }
});