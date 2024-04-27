const entities = require('@jetbrains/youtrack-scripting-api/entities');
const dateTime = require('@jetbrains/youtrack-scripting-api/date-time');
const http = require('@jetbrains/youtrack-scripting-api/http');


exports.rule = entities.Issue.onSchedule({
  title: 'Sla CEO SlackNotifier',
  search: '#Candidate Состояние: CEO-interview has: {ceo time}',
  cron: '0 0 9 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let start_state_date = ctx.issue.fields['ceo time'];

    let find_last_date = function(start) {
      let count = 0;
      let tmp_date = start;
      while (count < 13) {
        if ((new Date(tmp_date).getDay() == 6) || (new Date(tmp_date).getDay() == 0)) {
          tmp_date = tmp_date + (3600*1000*24);
      	} else {
          count += 1;
          tmp_date = tmp_date + (3600*1000*24);
        }

      }
      return tmp_date;
    };
    return (((find_last_date(start_state_date) - Date.now()) > 0) && ((new Date(Date.now()).getDay() != 6) && (new Date(Date.now()).getDay() != 0)) && (Math.ceil((Date.now() - start_state_date)/(3600*1000*24)) >= 3));
  },
  action: (ctx) => {
    const connection = new http.Connection('https://app.slack.com/');
    let dest = [];
    let p = ctx.issue.fields.Manager ? ctx.issue.fields.Manager.login : null;
    let p2 = ctx.issue.fields['Tech Specialist'] ? ctx.issue.fields['Tech Specialist'].login : null;
    dest.push(p);
    dest.push(p2);
    dest.forEach(function(d) {
      let qparam = {channel: '@' + d, blocks: ''};
    connection.addHeader({name: 'Authorization', value: 'Bearer '});
	connection.addHeader({name: 'Content-Type', value: 'application/x-www-form-urlencoded'}); // /x-www-form-urlencoded
    connection.postSync('api/chat.postMessage', qparam);
    });
  },
  requirements: {
  }
});


exports.rule = entities.Issue.onSchedule({
  title: 'Sla OfferPreparation SlackNotifier',
  search: '#Candidate State: {Offer preparation} has: {offer time}',
  cron: '0 0 9 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let start_state_date = ctx.issue.fields['offer time'];
    console.log(1);

    let find_last_date = function(start) {
      let count = 0;
      let tmp_date = start;
      while (count < 15) {
        if ((new Date(tmp_date).getDay() == 6) || (new Date(tmp_date).getDay() == 0)) {
          tmp_date = tmp_date + (3600*1000*24);
      	} else {
          count += 1;
          tmp_date = tmp_date + (3600*1000*24);
        }

      }
      return tmp_date;
    };
    console.log(find_last_date(start_state_date));
    return (((find_last_date(start_state_date) - Date.now()) > 0) && ((new Date(Date.now()).getDay() != 6) && (new Date(Date.now()).getDay() != 0)) && (Math.ceil((Date.now() - start_state_date)/(3600*1000*24)) >= 5));
  },
  action: (ctx) => {
    console.log(ctx.issue.id);
    const connection = new http.Connection('https://app.slack.com/');
    let dest = [];
    let p = ctx.issue.fields.Manager ? ctx.issue.fields.Manager.login : null;
    let p2 = ctx.issue.fields['Tech Specialist'] ? ctx.issue.fields['Tech Specialist'].login : null;
    dest.push(p);
    dest.push(p2);
    dest.forEach(function(d) {
      let qparam = {channel: '@' + d, blocks: ''};
    connection.addHeader({name: 'Authorization', value: 'Bearer '});
	connection.addHeader({name: 'Content-Type', value: 'application/x-www-form-urlencoded'}); // /x-www-form-urlencoded
    let p = connection.postSync('api/chat.postMessage', qparam);
    console.log(p);
      console.log(d);
    });
  },
  requirements: {
  }
});


exports.rule = entities.Issue.onSchedule({
  title: 'Sla Ready for Tech SlackNotifier',
  search: '#Candidate Состояние: {Ready for Tech} has: {rtech time}',
  cron: '0 0 9 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let start_state_date = ctx.issue.fields['rtech time'];

    let find_last_date = function(start) {
      let count = 0;
      let tmp_date = start;
      while (count < 11) {
        if ((new Date(tmp_date).getDay() == 6) || (new Date(tmp_date).getDay() == 0)) {
          tmp_date = tmp_date + (3600*1000*24);
      	} else {
          count += 1;
          tmp_date = tmp_date + (3600*1000*24);
        }

      }
      return tmp_date;
    };
    return (((find_last_date(start_state_date) - Date.now()) > 0) && ((new Date(Date.now()).getDay() != 6) && (new Date(Date.now()).getDay() != 0)));
  },
  action: (ctx) => {
    const connection = new http.Connection('https://app.slack.com/');
    let dest = [];
    let p = ctx.issue.fields.Manager ? ctx.issue.fields.Manager.login : null;
    let p2 = ctx.issue.fields['Tech Specialist'] ? ctx.issue.fields['Tech Specialist'].login : null;
    dest.push(p);
    dest.push(p2);
    dest.forEach(function(d) {
      let qparam = {channel: '@' + d, blocks: ''};
    connection.addHeader({name: 'Authorization', value: 'Bearer '});
	connection.addHeader({name: 'Content-Type', value: 'application/x-www-form-urlencoded'}); // /x-www-form-urlencoded
    connection.postSync('api/chat.postMessage', qparam);
    });
  },
  requirements: {
  }
});


exports.rule = entities.Issue.onSchedule({
  title: 'Sla Team-interview SlackNotifier',
  search: '#Candidate Состояние: Team-interview has: {team time}',
  cron: '0 0 9 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let start_state_date = ctx.issue.fields['team time'];

    let find_last_date = function(start) {
      let count = 0;
      let tmp_date = start;
      while (count < 13) {
        if ((new Date(tmp_date).getDay() == 6) || (new Date(tmp_date).getDay() == 0)) {
          tmp_date = tmp_date + (3600*1000*24);
      	} else {
          count += 1;
          tmp_date = tmp_date + (3600*1000*24);
        }

      }
      return tmp_date;
    };
    return (((find_last_date(start_state_date) - Date.now()) > 0) && ((new Date(Date.now()).getDay() != 6) && (new Date(Date.now()).getDay() != 0)) && (Math.ceil((Date.now() - start_state_date)/(3600*1000*24)) >= 3));
  },
  action: (ctx) => {
    const connection = new http.Connection('https://app.slack.com/');
    let dest = [];
    let p = ctx.issue.fields.Manager ? ctx.issue.fields.Manager.login : null;
    let p2 = ctx.issue.fields['Tech Specialist'] ? ctx.issue.fields['Tech Specialist'].login : null;
    dest.push(p);
    dest.push(p2);
    dest.forEach(function(d) {
      let qparam = {channel: '@' + d, blocks: ''};
    connection.addHeader({name: 'Authorization', value: 'Bearer '});
	connection.addHeader({name: 'Content-Type', value: 'application/x-www-form-urlencoded'}); // /x-www-form-urlencoded
    connection.postSync('api/chat.postMessage', qparam);
    });
  },
  requirements: {
  }
});


exports.rule = entities.Issue.onSchedule({
  title: 'Sla TechInterview SlackNotifier',
  search: '#Candidate Состояние: Tech-interview has: {tech-rev time}',
  cron: '0 0 9 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let start_state_date = ctx.issue.fields['tech-rev time'];

    let find_last_date = function(start) {
      let count = 0;
      let tmp_date = start;
      while (count < 11) {
        if ((new Date(tmp_date).getDay() == 6) || (new Date(tmp_date).getDay() == 0)) {
          tmp_date = tmp_date + (3600*1000*24);
      	} else {
          count += 1;
          tmp_date = tmp_date + (3600*1000*24);
        }

      }
      return tmp_date;
    };
    return (((find_last_date(start_state_date) - Date.now()) > 0) && ((new Date(Date.now()).getDay() != 6) && (new Date(Date.now()).getDay() != 0)));
  },
  action: (ctx) => {
    const connection = new http.Connection('https://app.slack.com/');
    let dest = [];
    let p = ctx.issue.fields.Manager ? ctx.issue.fields.Manager.login : null;
    let p2 = ctx.issue.fields['Tech Specialist'] ? ctx.issue.fields['Tech Specialist'].login : null;
    dest.push(p);
    dest.push(p2);
    dest.forEach(function(d) {
      let qparam = {channel: '@' + d, blocks: ''};
    connection.addHeader({name: 'Authorization', value: 'Bearer '});
	connection.addHeader({name: 'Content-Type', value: 'application/x-www-form-urlencoded'}); // /x-www-form-urlencoded
    connection.postSync('api/chat.postMessage', qparam);
    });
  },
  requirements: {
  }
});


exports.rule = entities.Issue.onSchedule({
  title: 'Trial-results-last',
  search: '#Candidate Состояние: {Working} has: {Trial period end date}',
  cron: '0 0 10 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
    let dif = Math.ceil((ctx.issue.fields['Trial period end date'] - Date.now())/(24*60*60*1000));
    return (dif == 4);
  },
  action: (ctx) => {
    const connection = new http.Connection('https://app.slack.com/');
    let qparam = {channel: '', blocks: ''};
    connection.addHeader({name: 'Authorization', value: 'Bearer '});
	connection.addHeader({name: 'Content-Type', value: 'application/x-www-form-urlencoded'}); // /x-www-form-urlencoded
    connection.postSync('api/chat.postMessage', qparam);
  },
  requirements: {
  }
});
