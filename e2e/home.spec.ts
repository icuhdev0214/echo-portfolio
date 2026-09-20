import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, projects section, and contact section", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /independent developer/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Projects", exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Get in touch" }),
    ).toBeVisible();
  });

  test("links to the Studio when there are no published projects", async ({ page }) => {
    await page.goto("/");

    const studioLink = page.getByRole("link", { name: "the Studio" });
    // Only present in the empty-state copy; skip gracefully once real projects exist.
    if (await studioLink.count()) {
      await expect(studioLink).toHaveAttribute("href", "/studio");
    }
  });
});
