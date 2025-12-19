## 1.5.3
* Fixed the `/terms` redirect pointing to `/terms-of-conditions` instead of `/terms-of-service`.

## 1.5.2
* Added meta descriptions to the terms of service and privacy policy pages.
* Fixed a bug causing firebase analytics to activate in dev sessions.

## 1.5.1
* Added proper redirects for the terms of service and privacy policy pages.
* Made it so that if an element is targeted via a hash link, it will no longer be hidden behind the header.
  * Also made it so that the targeted element is colored differently to indicate that it is the target of the hash link.

## 1.5.0
* Had Copilot do a full review and rewrite of the terms of service and privacy policy.

## 1.4.3
* Changed terms of service wording for domain cost

## 1.4.2
* Added redirects for /privacy and /terms to their respective pages.

## 1.4.1
* Added link to manage your subscription on the home page.
* Hyperlinked email address on the terms of service page.
* Updated terms of service to clarify domain cost calculation for refunds.

## 1.4.0
* Added Privacy Policy and Terms of Service pages.
  * Links to these pages have been added to the footer of the website.
  * You will be required to accept these terms when purchasing a subscription.

## 1.3.2
* Added the favicon back (it got missed in the last update)

## 1.3.1
* Fixed a bug preventing indexnow from working

## 1.3.0
* Added meta descriptions to all the pages for better SEO and social media sharing.
  * The descriptions are dynamically generated based on the content of each page.

## 1.2.5
* Changed the background color of the body to the secondary color scheme.
  * This now matches the header and footer when scrolling beyond the viewport height.

## 1.2.4
* Added socials to the home page
* Added email link to the home page

## 1.2.3
* Updated the link icons on the FAQ and Features pages to only appear when hovering over the headers.
  * This was done to reduce visual clutter.

## 1.2.2
* Fixed the missing background color for the page body
* Also added the javascript disabled disclaimer

## 1.2.1
* Fixed a small bug causing "analytics works!" to appear beneath the footer

## 1.2.0
* Updated the socials links to link to the actual Instagram and Threads accounts.

## 1.1.1
* Updated the features page so that it keeps the current tab in the sidebar scrolled into view.

## 1.1.0
* Added an FAQ page!

## 1.0.2
* The table on the homepage no longer freezes the first column when scrolling horizontally.
  * This was causing layout issues on smaller screens.
* Fixed a bug causing Microsoft Clarity analytics to not load properly.

## 1.0.1
* Enabled analytics
  * Google Analytics via firebase
  * Microsoft Clarity

## 1.0.0
* The initial release of DigiGoat.app!
* The website currently only has a home and features page, but more is to come including:
  * A "Get Started" guide
    * Dynamic onboarding experience
  * An FAQ page
  * Automated onboarding emails
