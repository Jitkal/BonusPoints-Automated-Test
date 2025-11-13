const {test,expect}=require('@playwright/test')

test('case1.1 : Normal Post', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  
  await page.locator("xpath=(//div[@role='main']//div[@aria-label='Create a post']//div[@role='button'])[1]").click()
  await page.locator("xpath=//div[@role='dialog']//div[@role='textbox']").fill('test post1')
  await page.locator("xpath=//div[@aria-label='Post']").click()

  await expect(page.getByText('test post')).toHaveCount(1)

});

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




