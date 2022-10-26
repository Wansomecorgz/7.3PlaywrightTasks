// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const user = require("../user");

test("Should login with correct data", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "Screenshots/CorrectData1.png" });
  await page.fill('[placeholder="Email"]', user.email);
  await page.fill('[placeholder="Пароль"]', user.password);
  await page.click("text=Войти");
  await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();
  await page.screenshot({ path: "Screenshots/CorrectData3.png" });
  await page.close();
});

test("Shouldn't login with uncorrect data", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "Screenshots/UnCorrectData1.png" });
  await page.fill('[placeholder="Email"]', "letme@in.com");
  await page.fill('[placeholder="Пароль"]', "masterpass");
  await page.click("text=Войти");
  await page.screenshot({ path: "Screenshots/UnCorrectData2.png" });
  await expect(
    page.locator("text=Вы ввели неправильно логин или пароль")
  ).toBeVisible();
  await page.screenshot({ path: "Screenshots/UnCorrectData3.png" });
  await page.close();
})