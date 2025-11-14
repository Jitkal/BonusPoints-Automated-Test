# Bonus Points – Automated Test

This project demonstrates automated testing of Facebook’s login and posting functionalities using **Playwright**.  
All tests are executed on **web browser only**, as required by the assignment.

---

## 🎯 Objectives
- Login to Facebook and verify login is correct
- Post some text
- Verify the new post is posted.

---

## 🧪 Test Case Summary

| Area  | Test Name               | Purpose                                   | Expected Result |
|-------|--------------------------|-------------------------------------------|------------------|
| Login | Normal Login             | Validate successful login with valid data | Login success   |
| Login | Incorrect Password       | Ensure incorrect password triggers error  | Error message shown |
| Login | Incorrect Email          | Validate email format & Facebook behavior | Error message shown |
| Post  | Normal Post              | Verify posting from homepage              | Post appears in feed |
| Post  | Profile Page Post        | Verify posting from profile timeline      | Post appears in feed |

> Some test cases may appear as errors because the expected result is based on my testing logic, which may differ from facebook actual behavior.
---

## 🚀 How to Use the Script

### 1. Run `Login.spec.js` first
Some login test cases may trigger Facebook's **CAPTCHA**.  
If CAPTCHA appears, please solve it **manually and quickly**, since the test can timeout.

---

### 2. Save authenticated session
Before running posting tests, execute the `authenticate` test case in **Post.spec.js**.

This will generate a `storageState.json` file that:

- avoids repeated login  
- reduces the chance of CAPTCHA  
- speeds up the post test cases  

---

### 3. Run posting test cases
After authentication is saved, run the remaining post-related tests normally.

---

## 📈 For Improvement / Future Enhancements

### 🔹 Additional Post Scenarios
- change post to friend only and use account friend the result should see the post
- change post to friend only and use account guest the result should not see the post
- change post to specific friend and use account friend(specific) the result should see the post
- change post to specific friend and use account friend(not specific) the result should not see the post
- change post to only me and use account friend and guest the result should not see the post
- click edit old post with new content the result shoud be new content
- Post with image - logout and login again to check the post is still exist

---


## 📚 References

### 📘 Learning Resources
- **Playwright JavaScript Tutorial Playlist**  
  https://www.youtube.com/playlist?list=PLL34mf651faPMrUKrJP5HFIBeihgmGQTX

---

