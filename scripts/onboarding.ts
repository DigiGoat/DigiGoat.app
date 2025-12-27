import chalk from 'chalk';
import { readFileSync } from 'fs';
import { createTransport } from 'nodemailer';
import { join } from 'path';

import { inlineBootstrapForEmail } from './utilities/inline-bootstrap';

const ci = !!process.env['CI'];
if (ci) {
  console.log('::group::Starting Sync');
}
const log = {
  debug: (...message: unknown[]): void => console.debug(chalk.dim('>', ...message)),
  info: (...message: unknown[]): void => ci ? console.log(`::endgroup::\n::group::${message.shift()}\n`, ...message) : console.log(...message),
  warn: (...message: unknown[]): void => console.warn(`${ci ? '::warning::' : ''}${chalk.yellowBright(...message)}`),
  error: (...message: unknown[]): void => console.error(`${ci ? '::error::' : ''}${chalk.redBright(...message)}`),
  success: (...message: unknown[]): void => console.log(chalk.greenBright(...message)),
  notice: (...message: unknown[]): void => console.log(ci ? '::notice::' : '', chalk.cyanBright(...message)),
};

function createContext() {
  let userEmail = '';
  const payloadObj: {
    repo?: string;
    token?: string;
    name?: string;
    email?: string;
  } = {};
  if (process.env['ONBOARD_REPO']) {
    payloadObj.repo = process.env['ONBOARD_REPO'];
    log.debug('Repo set to', payloadObj.repo);
  } else {
    log.error('ONBOARD_REPO is not set, this is required.');
    process.exit(1);
  }
  if (process.env['ONBOARD_TOKEN']) {
    payloadObj.token = process.env['ONBOARD_TOKEN'];
    log.debug('Token set to', payloadObj.token);
  }
  if (process.env['ONBOARD_NAME']) {
    payloadObj.name = process.env['ONBOARD_NAME'];
    log.debug('Name set to', payloadObj.name);
  }
  if (process.env['ONBOARD_EMAIL']) {
    payloadObj.email = process.env['ONBOARD_EMAIL'];
    userEmail = process.env['ONBOARD_EMAIL'];
    log.debug('Email set to', userEmail);
  } else {
    log.error('ONBOARD_EMAIL is not set, this is required.');
    process.exit(1);
  }
  const payloadStr = JSON.stringify(payloadObj);
  const payloadB64 = Buffer.from(payloadStr).toString('base64url');
  return { EMAIL: userEmail, REPO: payloadObj.repo, TOKEN: payloadObj.token, NAME: payloadObj.name, PAYLOAD: payloadB64.replace(/\d/g, (digit) => (9 - parseInt(digit)).toString()) };
}
async function createEmail(context: Record<string, string | undefined>) {
  log.debug('Reading and formatting email...');
  // Replace {{VAR}} with context values (fallback to the var name)
  let email = readFileSync(join(__dirname, `./templates/onboarding.html`), 'utf-8')
    .replace(/\{\{([^}]+)\}\}/g, (_, varName: string) => context[varName] ?? varName);
  log.debug('Inlining (purged) Bootstrap CSS for email...');
  email = await inlineBootstrapForEmail(email);
  log.debug('Reading and formatting raw email...');
  log.debug(email);
  // Replace {{VAR}} with process.env['VAR'] values (fallback to empty string)
  const rawEmail = readFileSync(join(__dirname, './templates/onboarding.txt'), 'utf-8').replace(/\{\{([^}]+)\}\}/g, (_, varName: string) => context[varName] ?? varName);
  return { email, rawEmail };
}
async function sendEmail(email: string, rawEmail: string, to: string) {
  log.debug('Sending onboarding email to', to);
  log.debug('Creating transporter...');
  // Create a test account or replace with real credentials.
  const transporter = createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: 'bloomkd46@icloud.com',
      pass: process.env['EMAIL_PASSWORD'] || '',
    },
  });
  log.debug('Sending email to', to);
  await transporter.sendMail({
    from: '"DigiGoat Onboarding" <onboarding@digigoat.app>',
    sender: 'onboarding@digigoat.app',
    to: to,
    bcc: 'digi@digigoat.app',
    replyTo: 'support@digigoat.app',
    subject: 'DigiGoat Onboarding',
    text: rawEmail, // plain‑text body
    html: email, // HTML body
    attachments: [
      {
        filename: 'web-app-manifest-192x192.png',
        path: '../src/assets/icons/web-app-manifest-192x192.png',
        cid: 'web-app-manifest-192x192.png', // same cid value as in the html img src
      },
    ],

  });
}
(async () => {
  log.info('Creating onboarding context...');
  const context = createContext();
  log.info('Creating onboarding email...');
  const { email, rawEmail } = await createEmail(context);
  log.info('Sending onboarding email...');
  await sendEmail(email, rawEmail, context.EMAIL);
  log.success('Email sent to', context.EMAIL);
})();
