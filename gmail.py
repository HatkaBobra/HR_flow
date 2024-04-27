# -*- coding: utf-8 -*-

import os
import flask
import requests
import json
import string

import google.oauth2.credentials
import google_auth_oauthlib.flow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.apps import meet_v2 as meet

CLIENT_SECRETS_FILE = "client_secret.apps.googleusercontent.com.json" #ONLY NAME FILE CHANGE THIS

SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/calendar.events.owned', "https://www.googleapis.com/auth/calendar.readonly", 'https://www.googleapis.com/auth/meetings.space.created']
API_VERSION = 'v2'

app = flask.Flask(__name__)
app.secret_key = 'secret_key'

@app.route('/')
def index():
  return print_index_table()

@app.route('/sendmeet', methods=['POST'])
def test():

  rjson = flask.request.json
  creds = Credentials.from_authorized_user_file("token.json", SCOPES)

  def generate_code():
    psw = ''
    for x in range(3):
        psw = psw + random.choice(list(string.ascii_lowercase))
    psw = psw + "-"
    for x in range(4):
        psw = psw + random.choice(list(string.ascii_lowercase))
    psw = psw + "-"
    for x in range(3):
        psw = psw + random.choice(list(string.ascii_lowercase))
    return psw

  service = build("calendar", "v3", credentials=creds)
  event = {
  'summary': rjson["sum"],
  'description': rjson["desk"],
  'start': {
    'dateTime': rjson["start"],
    'timeZone': 'Europe/Moscow',
  },
  'end': {
    'dateTime': rjson["end"],
    'timeZone': 'Europe/Moscow',
  },
  "conferenceData": {
    "createRequest": {
      "requestId": generate_code(),
    }
  },
  'attendees': rjson["to"],
  'reminders': {
    'useDefault': False,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
}
  event = service.events().insert(calendarId='hr@carbox.tech', conferenceDataVersion=1, body=event, sendUpdates="all").execute()  # CHANGEBLE send browser:https://www...com/test TO GET ALL IDS

  return event.get('htmlLink')

@app.route('/test', methods=['GET'])
def test_api_request():
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    service = build("calendar", "v3", credentials=creds)
    calendar_list = service.calendarList().list().execute()
    cnames = []
    for calendar_list_entry in calendar_list['items']:
      cnames.append(calendar_list_entry['summary'])
    return (f'Success Enter Account, ids Calendars {cnames} ' + print_index_table())


@app.route('/authorize', methods=['GET'])
def authorize():
  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)

  flow.redirect_uri = flask.url_for('oauth2callback', _external=True)
  print(flow.redirect_uri)

  authorization_url, state = flow.authorization_url(
      access_type='offline',
      include_granted_scopes='true')

  flask.session['state'] = state

  return flask.redirect(authorization_url)


@app.route('/oauth2callback')
def oauth2callback():
  state = flask.session['state']

  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
  flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

  authorization_response = flask.request.url
  flow.fetch_token(authorization_response=authorization_response)

  credentials = flow.credentials
  flask.session['credentials'] = credentials_to_dict(credentials)
  c = str(credentials_to_dict(credentials)).replace("'", '"').replace("None", '"None"')
  print(f"{credentials_to_dict(credentials)}")
  print(json.loads(c))
  with open("token.json", "w") as token:
      token.write(c)

  return flask.redirect(flask.url_for('test_api_request'))



@app.route('/clear')
def clear_credentials():
  if 'credentials' in flask.session:
    del flask.session['credentials']
  return ('Credentials have been cleared.<br><br>' +
          print_index_table())


def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

def print_index_table():
  return ('<table>' +
          '<tr><td><a href="/test">Test an API request</a></td>' +
          '<td>Submit an API request and see a formatted JSON response. ' +
          '    Go through the authorization flow if there are no stored ' +
          '    credentials for the user.</td></tr>' +
          '<tr><td><a href="/authorize">Test the auth flow directly</a></td>' +
          '<td>Go directly to the authorization flow. If there are stored ' +
          '    credentials, you still might not be prompted to reauthorize ' +
          '    the application.</td></tr>' +
          '<tr><td><a href="/revoke">Revoke current credentials</a></td>' +
          '<td>Revoke the access token associated with the current user ' +
          '    session. After revoking credentials, if you go to the test ' +
          '    page, you should see an <code>invalid_grant</code> error.' +
          '</td></tr>' +
          '<tr><td><a href="/clear">Clear Flask session credentials</a></td>' +
          '<td>Clear the access token currently stored in the user session. ' +
          '    After clearing the token, if you <a href="/test">test the ' +
          '    API request</a> again, you should go back to the auth flow.' +
          '</td></tr></table>')


if __name__ == '__main__':
  os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

  app.run('https://example.com', 8080, debug=True) # CHANGE TO PROD !!! CAREFULL THIS MUST BE EQUAL IN GOOGLE APP KEY FILE# -*- coding: utf-8 -*-
