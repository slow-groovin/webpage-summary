/**
 * firefox special functions
 * @file
 */
import { browser, Runtime, WebRequest } from "wxt/browser";

export async function addWebRequestListnerForModifyHeaders(
  options: { domain: string },
  extensionId: string
) {
  const { domain } = options;
  console.log("addModifyHeadersListener for domain: ", domain);

  const TARGET_DOMAIN = domain; // Target request domain
  const TARGET_RESOURCE_TYPE = "xmlhttprequest"; // Target resource type (XHR)

  const NEW_ORIGIN = `https://${domain}`;
  const NEW_REFERER = `https://${domain}`;

  function modifyKimiHeaders(
    details: WebRequest.OnBeforeSendHeadersDetailsType
  ) {
    // --- Condition check ---

    // 1. Check resource type (condition.resourceTypes)
    if (details.type !== TARGET_RESOURCE_TYPE) {
      // console.log(`Skipping request (type: ${details.type})`);
      return {}; // Not an XHR request, do not process
    }

    // 2. Check initiator (condition.initiatorDomains)
    // In Firefox, the originUrl of requests initiated by the extension is usually moz-extension://<extension-id>/...
    // The initiator property may be unreliable or non-existent in Firefox, so it is safer to use originUrl
    if (
      !details.originUrl ||
      !details.originUrl.startsWith(`moz-extension://${extensionId}`)
    ) {
      // console.log(`Skipping request (originUrl: ${details.originUrl})`);
      return {}; // Not a request initiated by the target extension, do not process
    }

    // 3. Check request domain (condition.requestDomains)
    // This check is theoretically handled by the host permission and listener filter in the manifest,
    // but for safety, an additional layer of confirmation can be added (usually not needed)
    // const requestUrl = new URL(details.url);
    // if (requestUrl.hostname !== TARGET_DOMAIN) {
    //    return {};
    // }

    // --- Perform modification (action.modifyHeaders) ---
    let requestHeaders = details.requestHeaders;
    if (!requestHeaders) {
      return;
    }
    // Iterate through existing request headers, modify or mark for later addition
    for (let i = 0; i < requestHeaders.length; ++i) {
      const headerNameLower = requestHeaders[i].name.toLowerCase();
      if (headerNameLower === "origin") {
        requestHeaders[i].value = NEW_ORIGIN;
      } else if (headerNameLower === "referer") {
        requestHeaders[i].value = NEW_REFERER;
      }
    }

    return { requestHeaders: requestHeaders };
  }

  // --- Register listener ---
  // Ensure that it is only registered once to prevent repeated listening due to reloading during development
  if (!browser.webRequest.onBeforeSendHeaders.hasListener(modifyKimiHeaders)) {
    browser.webRequest.onBeforeSendHeaders.addListener(
      modifyKimiHeaders,
      {
        urls: [`*://${TARGET_DOMAIN}/*`], // Filter request URLs (also declared in the manifest)
        types: [TARGET_RESOURCE_TYPE], // Optional: further filter resource types (improve efficiency)
      },
      ["blocking", "requestHeaders"] // "blocking" allows modification, "requestHeaders" allows access and modification of request headers
    );
    console.log("onBeforeSendHeaders listener registered for ", domain);
  } else {
    console.log("onBeforeSendHeaders listener already registered for ", domain);
  }

  // Optional: Add cleanup logic on uninstall (although the background script usually stops when the extension is uninstalled)
  // browser.runtime.onSuspend.addListener(() => {
  //   if (browser.webRequest.onBeforeSendHeaders.hasListener(modifyKimiHeaders)) {
  //     browser.webRequest.onBeforeSendHeaders.removeListener(modifyKimiHeaders);
  //     console.log("onBeforeSendHeaders listener removed.");
  //   }
  // });
}
