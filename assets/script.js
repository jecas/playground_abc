document.getElementById("year").textContent = new Date().getFullYear();

const upisDialog = document.getElementById("upis-dialog");
const openUpisBtn = document.getElementById("open-upis-btn");
const closeUpisBtn = document.getElementById("upis-close-btn");
const upisForm = document.getElementById("upis-form");
const upisFields = document.querySelector(".upis-fields");
const upisActions = document.querySelector(".upis-actions");
const upisSuccess = document.getElementById("upis-success");
const upisSuccessCloseBtn = document.getElementById("upis-success-close");

function resetUpisDialog() {
  upisForm.reset();
  upisFields.hidden = false;
  upisActions.hidden = false;
  upisSuccess.hidden = true;
}

openUpisBtn.addEventListener("click", () => {
  resetUpisDialog();
  upisDialog.showModal();
});

closeUpisBtn.addEventListener("click", () => {
  upisDialog.close();
});

upisDialog.addEventListener("click", (event) => {
  if (event.target === upisDialog) {
    upisDialog.close();
  }
});

upisForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!upisForm.reportValidity()) {
    return;
  }
  upisFields.hidden = true;
  upisActions.hidden = true;
  upisSuccess.hidden = false;
});

upisSuccessCloseBtn.addEventListener("click", () => {
  upisDialog.close();
});
