const {test,expect}=require('@playwright/test')

test('case1 : Normal Login', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await page.goto('https://www.facebook.com/profile');
  await expect(page.getByRole('button', { name: 'Log in' })).toHaveCount(0);

});

test('case2.1 : Login with incorrect password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_0')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The password that you've entered is incorrect." )).toHaveCount(1);
});

test('case2.2 : Login with true password but wrong language', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('ญฟหหไนพก๘ๅ')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The password that you've entered is incorrect." )).toHaveCount(1);
});

// facebook error
test('case2.3 : Login with true password but have 1 spacebar at front', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill(' Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The password that you've entered is incorrect." )).toHaveCount(1);
});

test('case2.4 : Login with true password but have exceed spacebar at front', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('    Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The password that you've entered is incorrect." )).toHaveCount(1);
});


test('case2.5 : Login with true password but have exceed spacebar in the middle', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Pass  word_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The password that you've entered is incorrect." )).toHaveCount(1);
});

test('case2.6 : Login with true password but have exceed spacebar at the end', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1 ')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The password that you've entered is incorrect." )).toHaveCount(1);
});


test('case3.1 : Login with incorrect email but correct password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.aut2222te@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The email address you entered isn't connected to an account." )).toHaveCount(1);
});

test('case3.2 : Login with incorrect email syntax but correct password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gml.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The email address you entered isn't connected to an account." )).toHaveCount(1);
});

// facebook error
test('case3.3 : Login with correct email but have 1 spacebar at front and correct password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill(' main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The email address you entered isn't connected to an account." )).toHaveCount(1);
});

// facebook error
test('case3.4 : Login with correct email but have exceed spacebar at front and correct password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('     main.test.automate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The email address you entered isn't connected to an account." )).toHaveCount(1);
});

// facebook error
test('case3.5 : Login with correct email but have exceed spacebar at middle and correct password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.tes    t.autom     ate@gmail.com')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The email address you entered isn't connected to an account." )).toHaveCount(1);
});

test('case3.6 : Login with correct email but have exceed spacebar at the end and correct password', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.locator("xpath=//input[@id='email']").fill('main.test.automate@gmail.com          ')
  await page.locator("xpath=//input[@id='pass']").fill('Password_1')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText("The email address you entered isn't connected to an account." )).toHaveCount(1);
});






