const entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Fill Hidden Timer Fields',
  guard: (ctx) => {
    return ctx.issue.isReported && ctx.issue.isChanged("Состояние");
  },
  action: (ctx) => {

    if (ctx.issue.becomes("Состояние", "Offer preparation")) {
   	  ctx.issue.fields['offer time'] = Date.now();
    }
    if (ctx.issue.becomes("Состояние", "Ready for Tech")) {
   	  ctx.issue.fields['rtech time'] = Date.now();
    }
  },
  requirements: {
  }
});