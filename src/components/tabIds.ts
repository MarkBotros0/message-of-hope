/** Shared id builders so a tab and its panel can reference each other. */
export const tabId = (prefix: string, i: number) => `${prefix}-tab-${i}`
export const panelId = (prefix: string, i: number) => `${prefix}-panel-${i}`
