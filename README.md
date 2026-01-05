# Form Auto-Filler Extension

This is a Chrome Extension designed to save your personal information and automatically fill out forms on any website with a single click.

---

## Code Explanation

### 1. Connecting to HTML (The Setup)

The code starts by linking the JavaScript to the popup UI elements:

- **Inputs:** Grabs the text boxes for Name, Email, Phone, Skills, and Experience.
- **Buttons:** Connects the **Save**, **Fill**, and **Clear** buttons to the logic.

### 2. Saving Data (The `saveBtn` Logic)

- **What it does:** Collects whatever you typed in the popup.
- **Storage:** Uses `chrome.storage.local.set` to save your info as a `userInfo` object.
- **Benefit:** Your data stays saved even if you close the browser or restart your computer.

### 3. Loading Data (The `DOMContentLoaded` Logic)

- **What it does:** Runs as soon as the popup opens.
- **Action:** It fetches your saved data from `chrome.storage` and puts it back into the input boxes.
- **Benefit:** You don't have to re-type your details every time you open the extension.

### 4. Removing Data (The `clearBtn` Logic)

- **What it does:** Deletes everything.
- **Action:** First, it asks "Are you sure?". If you click "Yes", it wipes the storage and empties all text boxes in the popup.

### 5. Transferring Data (The `fillBtn` Logic)

- **The Bridge:** This part finds the active tab (the website you are currently looking at).
- **The Injection:** It uses `chrome.scripting.executeScript` to push your saved data into that website's page.

### 6. Finding and Filling (The `injectFillLogic` Function)

This is the smartest part of the code that runs directly on the website:

- **Smart Search:** It looks for common keywords like `name`, `email`, `tel`, and `skill` in the website's HTML code.
- **Filling:** Once it finds a match, it puts your data into that box.
- **Triggering Events:** It fires `input` and `change` events. This "tricks" the website into thinking a human actually typed the text, which is required for modern sites like LinkedIn or Indeed.

---

## 🛠 How to Use

1. **Fill the Popup:** Enter your details into the extension.
2. **Save:** Click the **Save** button.
3. **Navigate:** Go to any job application or contact form.
4. **Auto-Fill:** Click the **Fill Form** button and watch the magic happen!
