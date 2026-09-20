import { test, expect } from "@playwright/test";

test.describe("Sanity Studio", () => {
  test("the /studio route loads without a server error", async ({ page }) => {
    const response = await page.goto("/studio");
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).not.toContainText("Application error");
  });
});
