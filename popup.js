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
