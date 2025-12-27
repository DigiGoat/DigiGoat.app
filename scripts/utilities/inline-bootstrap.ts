import { readFileSync } from 'fs';
import juice from 'juice';
import { join } from 'path';
import { PurgeCSS } from 'purgecss';

export type InlineBootstrapEmailOptions = {
  /**
   * Path to Bootstrap CSS to inline.
   * Defaults to the local dependency: node_modules/bootstrap/dist/css/bootstrap.min.css
   */
  bootstrapCssPath?: string;
  /**
   * Removes <link> tags that reference Bootstrap (recommended for email).
   * Defaults to true.
   */
  removeBootstrapLinkTags?: boolean;
  /**
   * Additional selectors to always keep (helps if classes are added dynamically).
   */
  safelist?: string[];
};

const DEFAULT_BOOTSTRAP_CSS_PATH = join(
  __dirname,
  '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
);

function stripBootstrapLinkTags(html: string): string {
  // Remove <link ... bootstrap...css ...> tags (CDN or local). Emails won't reliably load external CSS.
  return html.replace(
    /\s*<link\b[^>]*href=["'][^"']*bootstrap[^"']*\.css[^"']*["'][^>]*>\s*/gi,
    '\n',
  );
}

export async function inlineBootstrapForEmail(
  html: string,
  options: InlineBootstrapEmailOptions = {},
): Promise<string> {
  const bootstrapCssPath = options.bootstrapCssPath ?? DEFAULT_BOOTSTRAP_CSS_PATH;
  const removeBootstrapLinkTags = options.removeBootstrapLinkTags ?? true;

  const bootstrapCss = readFileSync(bootstrapCssPath, 'utf-8');

  const purgeCss = new PurgeCSS();
  const results = await purgeCss.purge({
    content: [{ raw: html, extension: 'html' }],
    css: [{ raw: bootstrapCss }],
    safelist: {
      standard: options.safelist ?? [],
    },
  });

  const purgedCss = results[0]?.css ?? '';
  const htmlWithoutLinks = removeBootstrapLinkTags ? stripBootstrapLinkTags(html) : html;

  // Inline the (purged) CSS into style attributes. This is what most email clients require.
  return juice(htmlWithoutLinks, {
    extraCss: purgedCss,
    applyStyleTags: true,
    removeStyleTags: true,
    preserveMediaQueries: true,
    insertPreservedExtraCss: true,
  });
}
