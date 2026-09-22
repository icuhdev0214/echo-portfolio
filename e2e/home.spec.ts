import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, work, stack, contact, and inquire panels", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /frontend engineering with measurable outcomes/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Personal & freelance projects" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Stack", exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /available for senior frontend/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Tell me what you are building." }),
    ).toBeVisible();
  });

  test("nav always links to the Studio", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "CMS sign in" })).toHaveAttribute("href", "/studio");
  });

  test("clicking a project card navigates to its case study", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /it's ouR Studio/i }).first().click();
    await expect(page).toHaveURL(/\/projects\/its-our-studio/);
    await expect(page.getByRole("heading", { name: "it's ouR Studio" })).toBeVisible();
  });
});
