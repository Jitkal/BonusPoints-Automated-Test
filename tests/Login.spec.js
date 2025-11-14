const {test,expect}=require('@playwright/test')

async function captchaCheck(page) {
  const captcha = page.getByText("I'm not a robot", { exact: false });
  const isCaptchaVisible = await captcha.isVisible().catch(() => false);
  if (isCaptchaVisible) {
    console.log('CAPTCHA — โปรดแก้ CAPTCHA ด้วยตนเองในเบราว์เซอร์...');
  }
}

test('case1 : Normal Login', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com');
  await page.locator("xpath=//input[@id='pass']").fill('Password_1');
  await page.getByRole('button', { name: 'Log in' }).click();

  await captchaCheck(page)
  await page.waitForSelector('[aria-label="Create a post"]', { timeout: 300000 });
  await expect(page.getByRole('button', { name: 'Log in' })).toHaveCount(0);
}, { timeout: 360000 });


const passwordDataTest =[
  {
    caseName:'Login with incorrect password',
    password:'Password_0'
  },
  {
    caseName:'Login with true password but wrong language',
    password:'ญฟหหไนพก๘ๅ'
  },
  {
    caseName:'Login with true password but have 1 spacebar at front',
    password:' Password_1'
  },
  {
    caseName:' Login with true password but have exceed spacebar at front',
    password:'      Password_1'
  },
  {
    caseName:'Login with true password but have exceed spacebar in the middle',
    password:'Pass  word_1'
  },
  {
    caseName:'Login with true password but have exceed spacebar at the end',
    password:'Password_1    '
  }
]
passwordDataTest.forEach(({ caseName, password }) => {
  test(`Password Test: ${caseName}`, async ({ page }) => {
      await page.goto('https://www.facebook.com/');
      await page.locator('#email').fill('main.test.automate@gmail.com');
      await page.locator('#pass').fill(password);
      await page.getByRole('button', { name: 'Log in' }).click();

      await captchaCheck(page);

      await page.waitForSelector("//div[contains(@class, 'login_form')]", { timeout: 300000 });
      await expect(page.getByText("The password that you've entered is incorrect.")).toHaveCount(1);
    }, { timeout: 360000 });
});


const emailDataTest =[
  {
    caseName:'Login with incorrect email but correct password',
    email:'main.test.aut2222te@gmail.com'
  },
  {
    caseName:'Login with incorrect email syntax but correct password',
    email:'main.test.automate@gml.com'
  },
  {
    // facebook error
    caseName:'Login with correct email but have 1 spacebar at front and correct password',
    email:' main.test.automate@gmail.com'
  },
  {// facebook error
    caseName:'Login with correct email but have exceed spacebar at front and correct password',
    email:'     main.test.automate@gmail.com'
  },
  {// facebook error
    caseName:'Login with correct email but have exceed spacebar at middle and correct password',
    email:'main.tes    t.autom     ate@gmail.com'
  },
  {
    caseName:'Login with correct email but have exceed spacebar at the end and correct password',
    email:'main.test.automate@gmail.com          '
  },
  {
    caseName:'Login with facebook name (not Email)',
    email:'Main Test'
  },
]
emailDataTest.forEach(({ caseName, email }) => {
  test(`Email Test: ${caseName}`, async ({ page }) => {
      await page.goto('https://www.facebook.com/');
      await page.locator('#email').fill(email);
      await page.locator('#pass').fill('Password_1');
      await page.getByRole('button', { name: 'Log in' }).click();

      await captchaCheck(page);

      await page.waitForSelector("//div[contains(@class, 'login_form')]", { timeout: 300000 });
      await expect(page.getByText("The email address you entered isn't connected to an account.")).toHaveCount(1);
    }, { timeout: 360000 });
});


