const entities = require('@jetbrains/youtrack-scripting-api/entities');
const http = require('@jetbrains/youtrack-scripting-api/http');
const search = require('@jetbrains/youtrack-scripting-api/search'); 
const tok = require('./tok');

exports.rule = entities.Issue.onSchedule({
  title: 'Sync Table With Dashboard',
  search: 'issue id: HRA-33',
  cron: '0 0 5 * * ?',
  muteUpdateNotifications: false,
  guard: (ctx) => {
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
    
    
    let msg = '';
    let query = 'Тип: Candidate Offer sent: Yes' + kv;
    let o_count = 0;
    const oferred = search.search(ctx.issue.project, query, ctx.currentUser);
    if (oferred.isNotEmpty()) {
      oferred.forEach(function(element) {
        o_count += 1;
      });
    }
    
    query = 'Тип: Candidate Offer sent: Yes Ontrial: Yes' + kv;
    let a_count = 0;
    const accepted = search.search(ctx.issue.project, query, ctx.currentUser);
    if (accepted.isNotEmpty()) {
      accepted.forEach(function(element) {
        a_count += 1;
      });
    }
    let perc = Math.round((a_count/o_count)*100) + "%";
    let offer_vs_accepted_tb = '| соотношение cделанных к принятым офферам |\n' + '| --- |\n' + '| ' + '[' + o_count + ']( issues/HRA?q=Тип:%20Candidate%20Offer%20sent:%20Yes'+ kv_pth + ')' + '/[ ' + a_count + ']( issues/HRA?q=Тип:%20Candidate%20Offer%20sent:%20Yes%20Ontrial:%20Yes'+ kv_pth + ')' + ' |\n' + '| ' + perc + ' |';
    msg += offer_vs_accepted_tb;
    msg += '\n\n';
    
    
    
    query = 'Тип: Candidate Firedontrial: Yes' + kv;
    let f_count = 0;
    const fotrial = search.search(ctx.issue.project, query, ctx.currentUser);
    if (fotrial.isNotEmpty()) {
      fotrial.forEach(function(element) {
        f_count += 1;
      });
    }
    
    query = 'Тип: Candidate Got work: Yes' + kv;
    let g_count = 0;
    const work = search.search(ctx.issue.project, query, ctx.currentUser);
    if (work.isNotEmpty()) {
      work.forEach(function(element) {
        g_count += 1;
        f_count += 1;
      });
    }
    perc = Math.round((g_count/f_count)*100) + "%";
    let trial_vs_work_tb = '| соотношение выходов к прохождению ИС |\n' + '| --- |\n' + '| ' + '[' + f_count + '](Тип:%20Candidate%20Got%20work:%20Yes%20or%20Firedontrial:%20Yes'+ kv_pth + ')' + '/[ ' + g_count + ']( issues/HRA?q=Тип:%20Candidate%20Got%20work:%20Yes'+ kv_pth + ')' + ' |\n' + '| ' + perc + ' |';
    msg += trial_vs_work_tb;
    msg += '\n\n';
    
    
    
    
    query = 'Тип: Vacancy SLA failed: Yes' + kv;
    let vsf_count = 0;
    const vsfotrial = search.search(ctx.issue.project, query, ctx.currentUser);
    if (vsfotrial.isNotEmpty()) {
      vsfotrial.forEach(function(element) {
        vsf_count += 1;
      });
    }
    
    query = 'Тип: Vacancy SLA failed: No Состояние: -{Opened}' + kv;
    let vc_count = 0;
    const vc = search.search(ctx.issue.project, query, ctx.currentUser);
    if (vc.isNotEmpty()) {
      vc.forEach(function(element) {
        vc_count += 1;
      });
    }
    perc = Math.round((vc_count/(vsf_count + vc_count))*100) + "%";
    let slalost_vs_no_tb = '| соотношение соблюденных SLA и нет |\n' + '| --- |\n' + '| ' + '[' + vsf_count + ']( issues/HRA?q=Тип:%20Vacancy%20SLA%20failed:%20Yes'+ kv_pth + ')' + '/[ ' + vc_count + ']( issues/HRA?q=Тип:%20Vacancy%20SLA%20failed:%20No%20Состояние:%20-%7BOpened%7D'+ kv_pth + ')' + ' |\n' + '| ' + perc + ' |';
    msg += slalost_vs_no_tb;
    msg += '\n\n';
    
    
    query = 'Тип: Vacancy Состояние: {In Progress}, Closed' + kv;
    let open_count = 0;
    const vofotrial = search.search(ctx.issue.project, query, ctx.currentUser);
    if (vofotrial.isNotEmpty()) {
      vofotrial.forEach(function(element) {
        open_count += 1;
      });
    }
    
    query = 'Тип: Vacancy Состояние: Closed' + kv;
    let vcl_count = 0;
    const vcl = search.search(ctx.issue.project, query, ctx.currentUser);
    if (vcl.isNotEmpty()) {
      vcl.forEach(function(element) {
        vcl_count += 1;
      });
    }
    perc = Math.round((vcl_count/open_count)*100) + "%";
    let open_vs_close_tb = '| соотношение закрытых к открытым |\n' + '| --- |\n' + '| ' + '[' + vcl_count + ']( issues/HRA?q=Тип:%20Vacancy%20Состояние:%20Closed'+ kv_pth + ')' + '/[ ' + open_count + ']( issues/HRA?q=Тип:%20Vacancy%20Состояние:%20%7BIn%20Progress%7D,%20Closed'+ kv_pth + ')' + ' |\n' + '| ' + perc + ' |';
    msg += open_vs_close_tb;
    msg += '\n\n';
    
    
    
    
    query = 'Тип: Vacancy' + kv;
    let high_tb = '|  | срок закрытия вакансии, дней | SLA | статус | число сделанных / принятых офферов |\n' + '| --- | --- | --- | --- | --- |';
    let line = '';
    const all_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (all_vacs.isNotEmpty()) {
      all_vacs.forEach(function(element) {
        
        let tquery = 'Подзадача для: ' + element.id + ' Offer sent: Yes' + kv;
        let ofs = 0;
        const all_ofrs = search.search(ctx.issue.project, tquery, ctx.currentUser);
        all_ofrs.forEach(function() {
          ofs += 1;
        });
        
        let ttquery = 'Подзадача для: ' + element.id + ' Ontrial: Yes' + kv;
        let accs = 0;
        const all_accs = search.search(ctx.issue.project, ttquery, ctx.currentUser);
        all_accs.forEach(function() {
          accs += 1;
        });
        
        let ofs_accs = '[' + ofs + ']( issues/HRA?q=Подзадача%20для:%20' + element.id + '%20Offer%20sent:%20Yes'+ kv_pth + ')' + ' / [' + accs + ']( issues/HRA?q=Подзадача%20для:%20' + element.id + '%20Ontrial:%20Yes'+ kv_pth + ')';
        
        let t = element.summary;
        let sla = 0;
        if (element.fields.SLA.name == '1.5 месяца') {
            sla = 45;
          }
          if (element.fields.SLA.name == '2 месяца') {
            sla = 60;
          }
          if (element.fields.SLA.name == '3 месяца') {
            sla = 90;
          }
          if (element.fields.SLA.name == '4 месяца') {
            sla = 120;
          }
        if (element.fields['Состояние'].name == 'Closed') {
          if (element.fields['Days to close'] < sla) {
          	t = '<span style="background-color:palegreen;">'+ element.summary + ' </span>';
          }
          if (element.fields['Days to close'] > sla) {
            t = '<span style="background-color:mistyrose;">'+ element.summary + ' </span>';
          }
        }
        if (element.fields['Состояние'].name == 'In Progress') {
          if (element.fields['Days to close'] > sla) {
            t = '<span style="background-color:mistyrose;">'+ element.summary + ' </span>';
          }
        }
        if (element.fields['Состояние'].name == 'Opened') {
          t = '<span style="background-color:moccasin;">'+ element.summary + ' </span>';
        }
        line = '\n| ' + t + ' | ' + element.fields['Days to close'] + ' | ' + sla + ' | ' + element.fields['Состояние'].name + ' | ' + ofs_accs + ' |';
        high_tb = high_tb + line;
      });
    }
    msg += high_tb;
    msg += '\n\n';
    
    
    
    let voronka_tb = '| воронка | кол-во человек + % |\n' + '| --- | --- |';
    query = 'Тип: Candidate Состояние: {HR interview}' + kv;
    let fline = '';
    let hr_c = 0;
    const hr_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (hr_vacs.isNotEmpty()) {
      hr_vacs.forEach(function() {
        hr_c += 1;
      });
    }
    fline = '\n| HR interview | ' + '[' + hr_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7BHR%20interview%7D'+ kv_pth + ') ' + ' (100%)' + ' |';
    
    query = 'Тип: Candidate Состояние: {Tech-interview}' + kv;
    let sline = '';
    let t_c = 0;
    const t_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (t_vacs.isNotEmpty()) {
      t_vacs.forEach(function() {
        t_c += 1;
      });
    }
    perc = Math.round((t_c/hr_c)*100) + "%";
    sline = '\n| Tech-interview | ' + '[' + t_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7BTech-interview%7D'+ kv_pth + ') ' + perc + ' |';
    
    query = 'Тип: Candidate Состояние: {Team-interview}' + kv;
    let tline = '';
    let e_c = 0;
    const e_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (e_vacs.isNotEmpty()) {
      e_vacs.forEach(function() {
        e_c += 1;
      });
    }
    perc = Math.round((e_c/t_c)*100) + "%";
    tline = '\n| Team-interview | ' + '[' + t_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7BTeam-interview%7D'+ kv_pth + ') ' + perc + ' |';
    
    query = 'Тип: Candidate Состояние: {CEO-interview}' + kv;
    let foline = '';
    let fo_c = 0;
    const fo_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (fo_vacs.isNotEmpty()) {
      fo_vacs.forEach(function() {
        fo_c += 1;
      });
    }
    perc = Math.round((fo_c/e_c)*100) + "%";
    foline = '\n| CEO-interview | ' + '[' + fo_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7BCEO-interview%7D'+ kv_pth + ') ' + perc + ' |';
    
    query = 'Тип: Candidate Состояние: {Offer was sent}' + kv;
    let filine = '';
    let ows_c = 0;
    const ows_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (ows_vacs.isNotEmpty()) {
      ows_vacs.forEach(function() {
        ows_c += 1;
      });
    }
    perc = Math.round((ows_c/fo_c)*100) + "%";
    filine = '\n| Сделанных офферов | ' + '[' + ows_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7BOffer%20was%20sent%7D'+ kv_pth + ') ' + perc + ' |';
    
    query = 'Тип: Candidate Состояние: {1st date planned}' + kv;
    let siline = '';
    let oa_c = 0;
    const oa_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (oa_vacs.isNotEmpty()) {
      oa_vacs.forEach(function() {
        oa_c += 1;
      });
    }
    perc = Math.round((oa_c/ows_c)*100) + "%";
    siline = '\n| Принятых офферов | ' + '[' + oa_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7B1st%20date%20planned%7D'+ kv_pth + ') ' + perc + ' |';
    
    query = 'Тип: Candidate Состояние: {Self-declined} Ontrial: Yes' + kv;
    let seline = '';
    let sd_c = 0;
    const sd_vacs = search.search(ctx.issue.project, query, ctx.currentUser);
    if (sd_vacs.isNotEmpty()) {
      sd_vacs.forEach(function() {
        sd_c += 1;
      });
    }
    perc = Math.round((sd_c/oa_c)*100) + "%";
    seline = '\n| Самоотказов на ИС | ' + '[' + sd_c + ']( issues/HRA?q=%D0%A2%D0%B8%D0%BF:%20Candidate%20%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5:%20%7BSelf-declined%7D%20Ontrial:%20Yes'+ kv_pth + ') ' + perc + ' |';
    
    voronka_tb = voronka_tb + fline + sline + tline + foline + filine + siline + seline;
    msg += voronka_tb;
    msg += '\n\n';
    
    
    
    
    
    const connection = new http.Connection('');
    connection.addHeader({name: 'Authorization', value: 'Bearer ' + tok.tok()});
    connection.addHeader({name: 'Content-Type', value: 'application/json;charset=UTF-8'});
    let t = connection.getSync('hub/api/rest/dashboards?$top=-1&fields=uuid.key,total,id,name,data,permissions(id,user(id),userGroup(id),projectTeam(id),permission),config(service),access,permission,favorite,ordinal,owner');
    let widgets_js = [];
    JSON.parse(t.response).items[1].data.widgets.forEach(function(el) {
      let tmp_js = '';
      if ((el.id == 'quick-notes') && (el.config.customWidgetConfig.name == 'Advenced')) {
        tmp_js = el;
        tmp_js['config']['customWidgetConfig']['message'] = msg;
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
  }
});
