const entities = require('@jetbrains/youtrack-scripting-api/entities');
const notifications = require('@jetbrains/youtrack-scripting-api/notifications');
const workflow = require('@jetbrains/youtrack-scripting-api/workflow');


exports.rule = entities.Issue.stateMachine({
  title: 'State Controller',
  stateFieldName: 'State', //State
  typeFieldName: 'Type', //Type
  defaultMachine: {
    Opened: {
      initial: true,
      transitions: {
        Opened: {
          targetState: 'Opened'
        }
      }
    }
  },
  alternativeMachines: {
    Vacancy: {
      Opened: {
        initial: true,
        transitions: {
          'In Progress': {
            targetState: 'In Progress'
          },
          'Closed': {
            targetState: 'Closed'
          },
          Freezed: {
            targetState: 'Freezed'
          }
        }
      },
      'In Progress': {
        transitions: {
          'Closed': {
            targetState: 'Closed'
          },
          Freezed: {
            targetState: 'Freezed'
          },
          Opened: {
            targetState: 'Opened'
          }
        }
      },
      'Freezed': {
        transitions: {
          'Closed': {
            targetState: 'Closed'
          },
          'In Progress': {
            targetState: 'In Progress'
          },
          Opened: {
            targetState: 'Opened'
          }
        }
      },
      'Closed': {
        transitions: {
          'In Progress': {
            targetState: 'In Progress'
          },
          Freezed: {
            targetState: 'Freezed'
          },
          Opened: {
            targetState: 'Opened'
          }
        }
      },
    },
    Candidate: {
      'New lead': {
        initial: true,
        transitions: {
          'HR interview': {
            targetState: 'HR interview'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'HR interview': {
        transitions: {
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'New lead': {
            targetState: 'New lead'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'Ready for Tech': {
        transitions: {
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          Declined: {
            targetState: 'Declined'
          },
          'New lead': {
            targetState: 'New lead'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'Tech-interview': {
        transitions: {
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          Declined: {
            targetState: 'Declined'
          },
          'New lead': {
            targetState: 'New lead'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'Team-interview': {
        transitions: {
          'New lead': {
            targetState: 'New lead'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'CEO-interview': {
        transitions: {
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'New lead': {
            targetState: 'New lead'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'Offer preparation': {
        transitions: {
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          Declined: {
            targetState: 'Declined'
          },
          'New lead': {
            targetState: 'New lead'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          '1st date planned': {
            targetState: '1st date planned'
          },
        }
      },
      'Offer was sent': {
        onEnter: function(ctx) {
          workflow.check(ctx.issue.fields.Offer, 'Add offer link to Offer field!');
          let assignee = (ctx.issue.fields['Исполнитель'] ? ctx.issue.fields['Исполнитель'].email : null);
          let rec_list = [ctx.issue.fields.Email, 'ml@carbox.tech', 'ga@carbox.tech',  'ts@carbox.tech'];
          if (assignee != null) {
            rec_list.push(assignee);
          }

          const text = '<div style="font-family: sans-serif">' +
            '<div style="padding: 10px 10px; font-size: 13px; border-bottom: 1px solid #D4D5D6;">' +
                'Привет,<br><br>Рады пригласить тебя присоединиться к нашей команде! Ниже ты найдешь предложение о работе со всеми задачами и условиями. Если возникнут вопросы – пиши.<br><br>Оффер доступен по ссылке: <a href="' + ctx.issue.fields.Offer + '">[Offer link]</a><br><br>Искренне верим, что наше взаимодействие будет интересным и результативным для обеих сторон. Когда ждать от тебя положительный ответ? :)<br><br>С любовью и заботой о людях,<br>HR Team Carbox' +
            '</div>' +
            '</div>';

          const message = {
            fromName: 'rftech@yt.com',
            to: rec_list,
            subject: 'Job Offer // Carbox',
            body: text
          };

          notifications.sendEmail(message, message.fromName, message.to, message.subject, message.body, ctx.issue);
        },
        transitions: {
          '1st date planned': {
            targetState: '1st date planned'
          },
          Declined: {
            targetState: 'Declined'
          },
          'New lead': {
            targetState: 'New lead'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
        }
      },
      '1st date planned': {
        transitions: {
          'On trial period': {
            targetState: 'On trial period'
          },
          Declined: {
            targetState: 'Declined'
          },
          'New lead': {
            targetState: 'New lead'
          },
          'Ready for Tech': {
            targetState: 'Ready for Tech'
          },
          'HR interview': {
            targetState: 'HR interview'
          },
          'Offer was sent': {
            targetState: 'Offer was sent'
          },
          'Tech-interview': {
            targetState: 'Tech-interview'
          },
          'Team-interview': {
            targetState: 'Team-interview'
          },
          'CEO-interview': {
            targetState: 'CEO-interview'
          },
          'Offer preparation': {
            targetState: 'Offer preparation'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Fired': {
            targetState: 'Fired'
          },
          Working: {
            targetState: 'Working'
          },
          'Trial period extencion': {
            targetState: 'Trial period extencion'
          },
        }
      },
      'On trial period': {
        transitions: {
          '1st date planned': {
            targetState: '1st date planned'
          },
          'Trial period extencion': {
            targetState: 'Trial period extencion'
          },
          Working: {
            targetState: 'Working'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Fired': {
            targetState: 'Fired'
          },
        }
      },
      'Trial period extencion': {
        transitions: {
          '1st date planned': {
            targetState: '1st date planned'
          },
          'Fired': {
            targetState: 'Fired'
          },
          Working: {
            targetState: 'Working'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'On trial period': {
            targetState: 'On trial period'
          },
        }
      },
      'Working': {
        transitions: {
          '1st date planned': {
            targetState: '1st date planned'
          },
          'Fired': {
            targetState: 'Fired'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Trial period extencion': {
            targetState: 'Trial period extencion'
          },
          'On trial period': {
            targetState: 'On trial period'
          },
        }
      },
      'Fired': {
        transitions: {
          '1st date planned': {
            targetState: '1st date planned'
          },
          Working: {
            targetState: 'Working'
          },
          Declined: {
            targetState: 'Declined'
          },
          'Self-declined': {
            targetState: 'Self-declined'
          },
          'Trial period extencion': {
            targetState: 'Trial period extencion'
          },
          'On trial period': {
            targetState: 'On trial period'
          },
        }
      },
      Declined: {
        onEnter: function(ctx) {
          const text = '<div style="font-family: sans-serif">' +
            '<div style="padding: 10px 10px; font-size: 13px; border-bottom: 1px solid #D4D5D6;">' +
                'Привет,<br><br>Возвращаемся с обратной связью по итогам интервью. Мы взвесили все “за” и “против” и все же сделали выбор в пользу другого кандидата. При этом не можем не отметить твою экспертизу и глубокое понимание сферы. Диалог получился достаточно предметным!<br><br>IT-сообщество не такое большое как кажется, поэтому будем рады оставаться на связи. Возможно, еще успеем поработать вместе :)<br>Успехов тебе!<br><br>С любовью и заботой о людях,<br>HR Team Carbox' +
            '</div>' +
            '</div>';

          const message = {
            fromName: 'rftech@yt.com',
            to: [ctx.issue.fields.Email, 'ml@carbox.tech', 'ga@carbox.tech'],
            subject: 'Interview Results // Carbox',
            body: text
          };
          notifications.sendEmail(message, message.fromName, message.to, message.subject, message.body, ctx.issue);
        },
        transitions: {
          'New lead': {
            targetState: 'New lead'
          }
        }
      },
      'Self-declined': {
        transitions: {
          'New lead': {
            targetState: 'New lead'
          }
        }
      }
    }
  },
  requirements: {}
});