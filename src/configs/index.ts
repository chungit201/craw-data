import {google} from 'googleapis';
import {googleConfig} from "./googleConfig";

export const authorize = async () => {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: googleConfig.client_email,
      private_key: googleConfig.private_key?.replace('/\\n', '/n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
};

export const addRow = async (auth: any, data: any) => {
  const RANGE = 'ha-noi!A:D'
  const sheets = google.sheets({version: 'v4', auth});
  const values = [data];
  const resource = {
    values,
  };
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: googleConfig.google_sheet_id,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: resource,
    });
  } catch (error) {
    console.error(error);
  }
};
