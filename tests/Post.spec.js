const {test,expect}=require('@playwright/test')

const generateShortCode = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


test('authenticate', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.locator("#email").fill('main.test.automate@gmail.com');
  await page.locator("#pass").fill('Password_1');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForSelector("//div[@aria-label='Create a post']", { timeout: 300000 });


  await page.context().storageState({ path: 'storageState.json' });
});


test('case1.1 : Normal Post', async ({ page }) => {

  const uniqueCode=generateShortCode()
  await page.goto('https://www.facebook.com/');
  
  await page.locator("xpath=(//div[@role='main']//div[@aria-label='Create a post']//div[@role='button'])[1]").click()
  await page.locator("xpath=//div[@role='dialog']//div[@role='textbox']").fill(`test post ${uniqueCode}`)
  await page.locator("xpath=//div[@aria-label='Post']").click()

  await expect(page.getByText(`test post ${uniqueCode}`)).toHaveCount(1)

}, { timeout: 360000 });

test('case1.2 : Normal Post in my profile page', async ({ page }) => {

  const uniqueCode=generateShortCode()
  await page.goto('https://www.facebook.com/profile');

  
  await page.getByText("What's on your mind?").click()
  await page.locator("xpath=//div[@role='dialog']//div[@role='textbox']").fill(`test post in profile page ${uniqueCode}`)
  await page.locator("xpath=//div[@aria-label='Post']").click()

  await expect(page.getByText(`test post in profile page ${uniqueCode}`)).toHaveCount(1)

});




