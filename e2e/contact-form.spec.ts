import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("submits successfully and shows a confirmation", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      const body = route.request().postDataJSON();
      expect(body.name).toBe("Ada Lovelace");
      expect(body.email).toBe("ada@example.com");
      expect(body.company_url).toBeFalsy(); // honeypot must stay empty
      await route.fulfill({ status: 200, json: { ok: true } });
    });

    await page.goto("/?panel=inquire");

    await page.getByLabel("Name").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Message").fill("Interested in working together.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toHaveText(/message sent/i);
  });

  test("shows an error message when the API rejects the submission", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 400,
        json: { message: "Enter a valid email address." },
      });
    });

    await page.goto("/?panel=inquire");

    await page.getByLabel("Name").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Message").fill("Interested in working together.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  });

  test("pre-fills the project context from the query string", async ({ page }) => {
    await page.goto("/?panel=inquire&project=Echo%20Portfolio");

    await expect(page.getByText("Regarding:")).toBeVisible();
    await expect(page.getByText("Echo Portfolio")).toBeVisible();
  });

  test("lets the visitor pick a project type and budget", async ({ page }) => {
    await page.goto("/?panel=inquire");

    // The native radio is visually hidden in favor of its styled label (a
    // segmented control), so a real visitor clicks the label, not the input.
    await page.getByText("Web design", { exact: true }).click();
    await expect(page.getByRole("radio", { name: "Web design" })).toBeChecked();

    await page.getByLabel("Budget range").selectOption({ label: "₱50k – ₱150k" });
  });
});
