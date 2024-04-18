const entities = require('@jetbrains/youtrack-scripting-api/entities');
const workflow = require('@jetbrains/youtrack-scripting-api/workflow');
const dateTime = require('@jetbrains/youtrack-scripting-api/date-time');
const http = require('@jetbrains/youtrack-scripting-api/http');

exports.rule = entities.Issue.onChange({
  title: 'Check Requirement Fields On States',
  guard: (ctx) => {
    return ctx.issue.fields.Type.name == 'Candidate';
  },
  action: (ctx) => {
    let cv_added = false;

    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'Tech-interview')) {
      workflow.check(ctx.issue.fields["Meeting start"], 'Fill Meeting start field!');
      workflow.check(ctx.issue.fields["Meeting end"], 'Fill Meeting end field!');
      const connection = new http.Connection('https://gmail_file.com/');
      let sum = ctx.issue.fields['Название вакансии'] + ', ' +  ctx.issue.summary + ' // Carbox';
      let desk = ctx.issue.url;
      let st = dateTime.format(new Date(ctx.issue.fields['Meeting start']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
      let end = dateTime.format(new Date(ctx.issue.fields['Meeting end']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
      let to = [];
      if (ctx.issue.fields.Email != null) {
          to.push({
            'email': ctx.issue.fields.Email
          });
        }
      if (ctx.issue.fields.Manager != null) {
        to.push({
          'email': ctx.issue.fields.Manager.email
        });
      }
      if (ctx.issue.fields["Tech Specialist"].isNotEmpty()) {
        ctx.issue.fields["Tech Specialist"].forEach(function(spec) {
          to.push(spec.email);
        });
      }
      let js = {
        "sum": sum,
        "desk": desk,
        "start": st,
        "end": end,
        "to": to
      };
      connection.addHeader({
        name: 'Content-Type',
        value: 'application/json'
      });
      let msg = '';
      let post = connection.postSync('sendmeet', '', js);
      console.log(post);
      if (post.code == 200) {
        msg = '<a href="' + post.response + '">' + 'link' + "</a> на встечу";
        ctx.issue.fields['tech-rev time'] = ctx.issue.fields['Meeting end'];
        ctx.issue.fields['Meeting start'] = null;
        ctx.issue.fields['Meeting end'] = null;
      } else {
        msg = 'meeting was not send';
      }
      workflow.message(msg);
    }

    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'CEO-interview')) {
      workflow.check(ctx.issue.fields["Meeting start"], 'Fill Meeting start field!');
      workflow.check(ctx.issue.fields["Meeting end"], 'Fill Meeting end field!');
      const connection = new http.Connection('https://gmail_file.com/');
      let sum = ctx.issue.fields['Название вакансии'] + ', ' +  ctx.issue.summary + ' // Carbox';
      let desk = ctx.issue.url;
      let st = dateTime.format(new Date(ctx.issue.fields['Meeting start']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
      let end = dateTime.format(new Date(ctx.issue.fields['Meeting end']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
      let to = [];
      to.push({'email': 'vd@carbox.tech'});
      if (ctx.issue.fields.Email != null) {
          to.push({
            'email': ctx.issue.fields.Email
          });
        }
      if (ctx.issue.fields['Исполнитель'] != null) {
        to.push({
          'email': ctx.issue.fields['Исполнитель'].email
        });
      }
      let js = {
        "sum": sum,
        "desk": desk,
        "start": st,
        "end": end,
        "to": to
      };
      connection.addHeader({
        name: 'Content-Type',
        value: 'application/json'
      });
      let msg = '';
      let post = connection.postSync('sendmeet', '', js);
      if (post.code == 200) {
        msg = '<a href="' + post.response + '">' + 'link' + "</a> на встечу";
        ctx.issue.fields['ceo time'] = ctx.issue.fields['Meeting end'];
        ctx.issue.fields['Meeting start'] = null;
        ctx.issue.fields['Meeting end'] = null;
      } else {
        msg = 'meeting was not send';
      }
      workflow.message(msg);
    }


    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'Team-interview')) {
      workflow.check(ctx.issue.fields["Meeting start"], 'Fill Meeting start field!');
      workflow.check(ctx.issue.fields["Meeting end"], 'Fill Meeting end field!');
      const connection = new http.Connection('https://gmail_file.com/');
      let sum = ctx.issue.fields['Название вакансии'] + ', ' +  ctx.issue.summary + ' // Carbox';
      let desk = ctx.issue.url;
      let st = dateTime.format(new Date(ctx.issue.fields['Meeting start']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
      let end = dateTime.format(new Date(ctx.issue.fields['Meeting end']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
      let to = [];
      if (ctx.issue.fields.Email != null) {
          to.push({
            'email': ctx.issue.fields.Email
          });
        }
      if (ctx.issue.fields['Исполнитель'] != null) {
        to.push({
          'email': ctx.issue.fields['Исполнитель'].email
        });
      }
      if (ctx.issue.fields['Tech Specialist'].isNotEmpty()) {
        ctx.issue.fields['Tech Specialist'].forEach(function(spec) {
          to.push({
          'email': spec.email
        });
        });
      }
      let js = {
        "sum": sum,
        "desk": desk,
        "start": st,
        "end": end,
        "to": to
      };
      connection.addHeader({
        name: 'Content-Type',
        value: 'application/json'
      });
      let msg = '';
      let post = connection.postSync('sendmeet', '', js);
      if (post.code == 200) {
        msg = '<a href="' + post.response + '">' + 'link' + "</a> на встечу";
        ctx.issue.fields['team time'] = ctx.issue.fields['Meeting end'];
        ctx.issue.fields['Meeting start'] = null;
        ctx.issue.fields['Meeting end'] = null;
      } else {
        msg = 'meeting was not send';
      }
      workflow.message(msg);
    }


    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'HR interview')) {
      ctx.issue.attachments.forEach(function(file) {
        if (file) {
          cv_added = true;
        }
      });
      workflow.check(ctx.issue.fields.Email, 'Fill Email field!');
      workflow.check(ctx.issue.fields["Meeting start"], 'Fill Meeting start field!');
      workflow.check(ctx.issue.fields["Meeting end"], 'Fill Meeting end field!');
      if (cv_added) {
        const connection = new http.Connection('https://gmail_file.com/');
        let sum = ctx.issue.fields['Название вакансии'] + ', ' +  ctx.issue.summary + ' // Carbox';
        let desk = ctx.issue.url;
        let st = dateTime.format(new Date(ctx.issue.fields['Meeting start']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
        let end = dateTime.format(new Date(ctx.issue.fields['Meeting end']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
        let to = [];
        if (ctx.issue.fields.Email != null) {
          to.push({
            'email': ctx.issue.fields.Email
          });
        }
        if (ctx.issue.fields['Исполнитель'] != null) {
          to.push({
            'email': ctx.issue.fields['Исполнитель'].email
          });
        }
        let js = {
          "sum": sum,
          "desk": desk,
          "start": st,
          "end": end,
          "to": to
        };
        connection.addHeader({
          name: 'Content-Type',
          value: 'application/json'
        });
        let msg = '';
        let post = connection.postSync('sendmeet', '', js);
        console.log(post.response);
        if (post.code == 200) {
          msg = '<a href="' + post.response + '">' + 'link' + "</a> на встечу";
          ctx.issue.fields['Meeting start'] = null;
          ctx.issue.fields['Meeting end'] = null;
        } else {
          msg = 'meeting was not send';
        }
        workflow.message(msg);
        return;
      } else {
        if (!ctx.issue.fields.CV) {
          workflow.check(false, 'Add CV file or fill CV field!');
        }
        const connection = new http.Connection('https://gmail_file.com/');
        let sum = ctx.issue.fields['Название вакансии'] + ', ' +  ctx.issue.summary + ' // Carbox';
        let desk = ctx.issue.url;
        let st = dateTime.format(new Date(ctx.issue.fields['Meeting start']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
        let end = dateTime.format(new Date(ctx.issue.fields['Meeting end']).getTime(), "YYYY-MM-dd'T'HH:mm:ssZ", 'RFC 3339');
        let to = [];
        if (ctx.issue.fields.Email != null) {
          to.push({
            'email': ctx.issue.fields.Email
          });
        }
        if (ctx.issue.fields['Исполнитель'] != null) {
          to.push({
            'email': ctx.issue.fields['Исполнитель'].email
          });
        }
        let js = {
          "sum": sum,
          "desk": desk,
          "start": st,
          "end": end,
          "to": to
        };
        connection.addHeader({
          name: 'Content-Type',
          value: 'application/json'
        });
        let msg = '';
        let post = connection.postSync('sendmeet', '', js);
      console.log(js);
        console.log(post.response);
        if (post.code == 200) {
          msg = '<a href="' + post.response + '">' + 'link' + "</a> на встечу";
          ctx.issue.fields['Meeting start'] = null;
          ctx.issue.fields['Meeting end'] = null;
        } else {
          msg = 'meeting was not send';
        }
        workflow.message(msg);
        return;
      }

    }

    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', '1st date planned')) {
      workflow.check(ctx.issue.fields['Название вакансии'], 'Fill Название вакансии field!');
      workflow.check(ctx.issue.fields.Requirements, 'Fill Requirements field!');
      workflow.check(ctx.issue.fields.Manager, 'Fill Manager field!');
      workflow.check(ctx.issue.fields.Email, 'Fill Email field!');
      workflow.check(ctx.issue.fields['Исполнитель'], 'Fill Исполнитель field!');
      workflow.check(ctx.issue.fields.Number, 'Fill Number field!');
      workflow.check(ctx.issue.fields.Team, 'Fill Team field!');
      workflow.check(ctx.issue.fields['Start Date'], 'Fill Start Date field!');
      workflow.check(ctx.issue.fields.Salary, 'Fill Salary field!');
      workflow.check(ctx.issue.fields['Salary (trial period)'], 'Fill Salary (trial period) field!');
      workflow.check(ctx.issue.fields.Currency, 'Fill Currency field!');
      workflow.check(ctx.issue.fields['Employment type'], 'Fill Employment type field!');
      workflow.check(ctx.issue.fields['Trial period end date'], 'Fill Trial period end date field!');
      ctx.issue.attachments.forEach(function(file) {
        if (file) {
          cv_added = true;
        }
      });
      if (cv_added) {
        const connection = new http.Connection('https://app.slack.com/');
        let qparam = {
          channel: '',
          blocks: ''
        };
        connection.addHeader({
          name: 'Authorization',
          value: 'Bearer '
        });
        connection.addHeader({
          name: 'Content-Type',
          value: 'application/x-www-form-urlencoded'
        }); // /x-www-form-urlencoded
        connection.postSync('api/chat.postMessage', qparam);
        return;
      } else {
        if (!ctx.issue.fields.CV) {
          workflow.check(false, 'Add CV file or fill CV field!');
        }
        const connection = new http.Connection('https://app.slack.com/');
        let qparam = {
          channel: '',
          blocks: ''
        };
        connection.addHeader({
          name: 'Authorization',
          value: 'Bearer '
        });
        connection.addHeader({
          name: 'Content-Type',
          value: 'application/x-www-form-urlencoded'
        }); // /x-www-form-urlencoded
        connection.postSync('api/chat.postMessage', qparam);
      }
    }

    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'Trial period extencion')) {
      ctx.issue.fields.required(ctx['Trial period end date'], 'Fill Trial period end date!');
      const connection = new http.Connection('https://app.slack.com/');
      let qparam = {
        channel: '',
        blocks: ''
      };
      connection.addHeader({
        name: 'Authorization',
        value: 'Bearer '
      });
      connection.addHeader({
        name: 'Content-Type',
        value: 'application/x-www-form-urlencoded'
      }); // /x-www-form-urlencoded
      connection.postSync('api/chat.postMessage', qparam);
    }

    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'Fired')) {
      workflow.check(ctx.issue.fields['Last day'], 'Fill Last day field!');
      workflow.check(ctx.issue.fields.Initiator, 'Fill Initiator field!');
      workflow.check(ctx.issue.fields.laptop, 'Fill laptop field!');
      const connection = new http.Connection('https://app.slack.com/');
      let qparam = {
        channel: '',
        blocks: ''
      };
      connection.addHeader({
        name: 'Authorization',
        value: 'Bearer '
      });
      connection.addHeader({
        name: 'Content-Type',
        value: 'application/x-www-form-urlencoded'
      }); // /x-www-form-urlencoded
      connection.postSync('api/chat.postMessage', qparam);
      qparam = {
        channel: '',
        blocks: ''
      };
    }

    if (ctx.issue.isReported && ctx.issue.becomes('Состояние', 'Trial period extencion')) {
      ctx.issue.fields.required(ctx['Trial period end date'], 'Fill Trial period end date!');
      const connection = new http.Connection('https://app.slack.com/');
      let qparam = {
        channel: '',
        blocks: ''
      };
      connection.addHeader({
        name: 'Authorization',
        value: 'Bearer '
      });
      connection.addHeader({
        name: 'Content-Type',
        value: 'application/x-www-form-urlencoded'
      }); // /x-www-form-urlencoded
      connection.postSync('api/chat.postMessage', qparam);
    }


  },
  requirements: {
    'Trial period end date': {
      type: entities.Field.dateType,
      name: 'Trial period end date'
    }
  }
});