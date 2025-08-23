import { browser, DeclarativeNetRequest } from "wxt/browser";

export async function updateDynamicRulesForModifyHeaders(
  option: { domain: string; id: number },
  extensionId: string
) {
  const { domain, id } = option;
  const newRule: DeclarativeNetRequest.Rule = {
    id: id, // Assign a unique ID for this rule
    priority: 1, // Set priority if needed
    action: {
      type: "modifyHeaders",
      requestHeaders: [
        {
          operation: "set",
          header: "origin",
          value: `https://${domain}`,
        },
        {
          operation: "set",
          header: "referer",
          value: `https://${domain}`,
        },
      ],
      // --- Example: Block the request ---
      // type: 'block'
    },
    condition: {
      requestDomains: [domain],
      resourceTypes: ["xmlhttprequest"],
      initiatorDomains: [extensionId],
    },
  };

  try {
    // Get existing rules first to avoid conflicts or exceeding limits
    const existingRules = await browser.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map((rule) => rule.id);

    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds.includes(newRule.id) ? [newRule.id] : [], // Remove if exists to update
      addRules: [newRule],
    });
    console.log("Rule added/updated successfully for domain:", domain);
  } catch (error) {
    console.error("Error updating declarativeNetRequest rules:", error);
  }
}
