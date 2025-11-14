const {test,expect}=require('@playwright/test')

test('authenticate', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.locator("#email").fill('main.test.automate@gmail.com');
  await page.locator("#pass").fill('Password_1');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForSelector("//div[@aria-label='Create a post']", { timeout: 300000 });

  // รอให้ login เสร็จ
  // await page.waitForURL('**/facebook.com/**', { timeout: 60000 });

  // บันทึก session
  await page.context().storageState({ path: 'storageState.json' });
});

async function captchaCheck(page) {
  const captcha = page.getByText("I'm not a robot", { exact: false });
  const isCaptchaVisible = await captcha.isVisible().catch(() => false);
  if (isCaptchaVisible) {
    console.log('CAPTCHA — โปรดแก้ CAPTCHA ด้วยตนเองในเบราว์เซอร์...');
  }
  // await page.waitForSelector("//input[@id='email']", { timeout: 300000 });

  // await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  // await page.locator("xpath=//input[@id='pass']").fill('Password_1')
}

test('case1.1 : Normal Post', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  
  await page.locator("xpath=(//div[@role='main']//div[@aria-label='Create a post']//div[@role='button'])[1]").click()
  await page.locator("xpath=//div[@role='dialog']//div[@role='textbox']").fill('test post1')
  await page.locator("xpath=//div[@aria-label='Post']").click()

  await expect(page.getByText('test post')).toHaveCount(1)

}, { timeout: 360000 });

test('case1.2 : Normal Post in my profile page', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await page.goto('https://www.facebook.com/profile');

  
  await page.getByText("What's on your mind?").click()
  await page.locator("xpath=//div[@role='dialog']//div[@role='textbox']").fill('test post in profile page')
  await page.locator("xpath=//div[@aria-label='Post']").click()

  await expect(page.getByText('test post in profile page')).toHaveCount(1)

});




