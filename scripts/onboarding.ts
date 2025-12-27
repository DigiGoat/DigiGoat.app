import chalk from 'chalk';
import { createReadStream, readFileSync } from 'fs';
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

const mask = (value?: string): string => {
  if (typeof value !== 'string') return '';
  if (value.length <= 2) return value;
  const emailStr = value.split('@');
  if (emailStr.length > 1) {
    return mask(emailStr[0]) + '@' + emailStr[1];
  }
  const splitStr = value.split(' ');
  if (splitStr.length > 1) {
    return splitStr.map((part) => mask(part)).join(' ');
  } else {
    return value[0] + '*'.repeat(value.length - 2) + value[value.length - 1];
  }
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
    log.debug('Token set to', mask(payloadObj.token));
  }
  if (process.env['ONBOARD_NAME']) {
    payloadObj.name = process.env['ONBOARD_NAME'];
    log.debug('Name set to', mask(payloadObj.name));
  }
  if (process.env['ONBOARD_EMAIL']) {
    payloadObj.email = process.env['ONBOARD_EMAIL'];
    userEmail = process.env['ONBOARD_EMAIL'];
    log.debug('Email set to', mask(userEmail));
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
  // Replace {{VAR}} with context values (fallback to the var name)
  const rawEmail = readFileSync(join(__dirname, './templates/onboarding.txt'), 'utf-8').replace(/\{\{([^}]+)\}\}/g, (_, varName: string) => context[varName] ?? varName);
  return { email, rawEmail };
}
async function sendEmail(email: string, rawEmail: string, to: string) {
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
  log.debug('Sending email to', mask(to));
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
        content: createReadStream(join(__dirname, '../src/assets/icons/web-app-manifest-192x192.png')),
        cid: 'digi@digigoat.app', // same cid value as in the html img src
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
  try {
    await sendEmail(email, rawEmail, context.EMAIL);
  } catch (error) {
    log.error('Failed to send email:', error);
    log.debug('Email content:', email);
    process.exit(1);
  }
  log.success('Email sent to', mask(context.EMAIL));
})();
