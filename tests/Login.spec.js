const {test,expect}=require('@playwright/test')

test('case1 : Normal Login', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await page.goto('https://www.facebook.com/profile');
  await expect(page.getByRole('button', { name: 'Log in' })).toHaveCount(0);

});

