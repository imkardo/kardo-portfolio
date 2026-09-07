import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173";

test.describe("portfolio smoke", () => {
  test("English home renders with content", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(String(err)));
    await page.goto(`${BASE}/#/`, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Kardo Heidari");
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("Persian renders RTL", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(String(err)));
    await page.goto(`${BASE}/#/`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "فارسی" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("h1")).toContainText("کاردو حیدری");
    expect(errors).toEqual([]);
  });

  test("hidden admin login + project CRUD round-trip", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(String(err)));
    await page.goto(`${BASE}/#/kh-8291-console`, { waitUntil: "networkidle" });
    await page.getByLabel("Password").fill(process.env.ADMIN_PASSWORD ?? "Kardo.0707");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("button", { name: "Projects" })).toBeVisible();
    // Add a project, save, verify it appears on the public site.
    await page.getByRole("button", { name: "+ Add" }).first().click();
    await page.getByRole("button", { name: /^Save/ }).first().click();
    await expect(page.getByRole("button", { name: /^Saved/ }).first()).toBeVisible({
      timeout: 5000,
    });
    await page.goto(`${BASE}/#/`);
    await expect(page.locator("#projects")).toContainText("New project");
    expect(errors).toEqual([]);
  });
});
