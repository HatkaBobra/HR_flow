const entities = require('@jetbrains/youtrack-scripting-api/entities');
const dateTime = require('@jetbrains/youtrack-scripting-api/date-time');
const http = require('@jetbrains/youtrack-scripting-api/http');
const workflow = require('@jetbrains/youtrack-scripting-api/workflow');
const strings = require('@jetbrains/youtrack-scripting-api/strings');
const search = require('@jetbrains/youtrack-scripting-api/search'); 
const tok = require('./tok');

exports.rule = entities.Issue.onSchedule({
  title: 'Db-sync',
  search: 'issue id: HRA-33',
  cron: '0 31 2 12 5 ?', //0 0 2 1 */3 ?
  muteUpdateNotifications: false,
  guard: (ctx) => {
    console.log(22);
    return true;
  },
  action: (ctx) => {
    let tmp_dt = new Date(Date.now());
    let mnth = '';
    let kv = '';
    let kv_pth = '';
    if (tmp_dt.getMonth() < 10) {
      mnth = '0' + tmp_dt.getMonth();
    }
    if (tmp_dt.getMonth() <= 12) {
      kv = ' Updated: ' + tmp_dt.getFullYear() + '-' + '10' + ' .. ' + tmp_dt.getFullYear() + '-12';
      kv_pth = '%20Updated:%20' + tmp_dt.getFullYear() + '-' + '10' + '%20..%20' + tmp_dt.getFullYear() + '-12';
    }
    if (tmp_dt.getMonth() <= 9) {
      kv = ' Updated: ' + tmp_dt.getFullYear() + '-' + '07' + ' .. ' + tmp_dt.getFullYear() + '-09';
      kv_pth = '%20Updated:%20' + tmp_dt.getFullYear() + '-' + '07' + '%20..%20' + tmp_dt.getFullYear() + '-09';
    }
    if (tmp_dt.getMonth() <= 6) {
      kv = ' Updated: ' + tmp_dt.getFullYear() + '-' + '04' + ' .. ' + tmp_dt.getFullYear() + '-06';
      kv_pth = '%20Updated:%20' + tmp_dt.getFullYear() + '-' + '04' + '%20..%20' + tmp_dt.getFullYear() + '-06';
    }
    if (tmp_dt.getMonth() <= 3) {
      kv = ' Updated: ' + tmp_dt.getFullYear() + '-' + '01' + ' .. ' + tmp_dt.getFullYear() + '-03';
      kv_pth = '%20Updated:%20' + tmp_dt.getFullYear() + '-' + '01' + '%20..%20' + tmp_dt.getFullYear() + '-03';
    }
    
    
    
    const connection = new http.Connection('');
    connection.addHeader({name: 'Authorization', value: 'Bearer ' + tok.tok()});
    connection.addHeader({name: 'Content-Type', value: 'application/json;charset=UTF-8'});
    let t = connection.getSync('hub/api/rest/dashboards?$top=-1&fields=uuid.key,total,id,name,data,permissions(id,user(id),userGroup(id),projectTeam(id),permission),config(service),access,permission,favorite,ordinal,owner');
    let widgets_js = [];
    JSON.parse(t.response).items[1].data.widgets.forEach(function(el) {
      let tmp_js = '';
      if (el.id == 'widget-youtrack-report') {
        let yy = new http.Connection(''); 
        yy.addHeader({name: 'Authorization', value: 'Bearer ' + tok.tok()});
        yy.addHeader({name: 'Content-Type', value: 'application/json;charset=UTF-8'});
        yy.getSync('api/reports/' + el.config.report.id + '?$top=-1&fields=effectiveQuery');
        yy.postSync('api/reports/' + el.config.report.id + '?$top=-1&fields=query', {}, {query:JSON.parse(yy.getSync('api/reports/' + el.config.report.id + '?$top=-1&fields=effectiveQuery').response).effectiveQuery.split('Updated:')[0] + kv});
        tmp_js = el;
      }
      if (el.id == 'youtrack-issues-list') {
        tmp_js = el;
        tmp_js['config']['customWidgetConfig']['search'] = el['config']['customWidgetConfig']['search'].split('Updated:')[0] + kv;
      }
      if (tmp_js == '') {
        tmp_js = el;
      }
      
      widgets_js.push(tmp_js);
    });
    
    let tmp_glob = JSON.parse(t.response).items[1];
    tmp_glob.data.widgets = widgets_js;
    
    
    let p = connection.postSync('hub/api/rest/dashboards/' + tmp_glob.id, {}, tmp_glob);
  },
  requirements: {
    // TODO: add requirements
  }
});
