import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("submits successfully and shows a confirmation", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      const body = route.request().postDataJSON();
      expect(body.name).toBe("Ada Lovelace");
      expect(body.email).toBe("ada@example.com");
      expect(body.company).toBeFalsy(); // honeypot must stay empty
      await route.fulfill({ status: 200, json: { ok: true } });
    });

    await page.goto("/#contact");

    await page.getByLabel("Name").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Message").fill("Interested in working together.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toHaveText(/on its way/i);
  });

  test("shows an error message when the API rejects the submission", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 400,
        json: { message: "Enter a valid email address." },
      });
    });

    await page.goto("/#contact");

    await page.getByLabel("Name").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Message").fill("Interested in working together.");
    await page.getByRole("button", { name: "Send message" }).click();

    // Scoped by text rather than role: Next.js's own route announcer also
    // carries role="alert" and would otherwise make this locator ambiguous.
    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  });

  test("pre-fills the project context from the query string", async ({ page }) => {
    await page.goto("/?project=Echo%20Portfolio#contact");

    await expect(page.getByText("Regarding:")).toBeVisible();
    await expect(page.getByText("Echo Portfolio")).toBeVisible();
  });
});
