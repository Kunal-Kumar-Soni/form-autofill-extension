//inputs
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userSkills = document.getElementById("userSkills");
const userExperience = document.getElementById("userExperience");

//buttons
const saveBtn = document.getElementById("saveBtn");
const fillBtn = document.getElementById("fillBtn");
const clearBtn = document.getElementById("clearBtn");

// Save data to chrome storage
saveBtn.addEventListener("click", () => {
  const userInfo = {
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
    skills: userSkills.value,
    experience: userExperience.value,
  };
  chrome.storage.local.set({ userInfo }, () => alert("Data saved locally"));
});

//load data when popup open
window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["userInfo"], (result) => {
    if (result.userInfo) {
      userName.value = result?.userInfo?.name || "";
      userEmail.value = result?.userInfo?.email || "";
      userPhone.value = result?.userInfo?.phone || "";
      userSkills.value = result?.userInfo?.skills || "";
      userExperience.value = result?.userInfo?.experience || "";
    }
  });
});

//clear data
clearBtn.addEventListener("click", () => {
  const isConfirm = confirm("Do you want to remove all data");
  if (isConfirm) {
    chrome.storage.local.remove("userInfo", () => {
      userName.value = "";
      userEmail.value = "";
      userPhone.value = "";
      userSkills.value = "";
      userExperience.value = "";
    });
  }
});

//form fillup
fillBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const dataToFill = {
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
    skills: userSkills.value,
    experience: userExperience.value,
  };

  //scripting
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectFillLogic,
    args: [dataToFill],
  });
});

// from fillup logic
function injectFillLogic(data) {
  // common selectors
  const selectors = {
    name: ['input[name*="name" i]', 'input[id*="name" i]', 'input[placeholder*="name" i]'],
    email: ['input[type="email" i]', 'input[name*="email" i]', 'input[id*="email" i]'],
    phone: [
      'input[type="tel" i]',
      'input[name*="phone" i]',
      'input[name*="mobile" i]',
      'input[id*="phone" i]',
    ],
    skills: ['textarea[name*="skill" i]', 'textarea[id*="skill" i]', 'input[name*="skill" i]'],
    experience: ['textarea[name*="exp" i]', 'textarea[id*="exp" i]', 'textarea[name*="about" i]'],
  };

  for (const key in selectors) {
    for (const selector of selectors[key]) {
      const element = document.querySelector(selector);
      if (element && data[key]) {
        element.value = data[key];
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }
  }
}
