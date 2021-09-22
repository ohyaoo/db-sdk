import puppeteer from "puppeteer";

export default async function setup() {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  return page;
}
