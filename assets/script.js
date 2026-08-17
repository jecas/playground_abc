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

const upisSubmitBtn = document.getElementById("upis-submit-btn");

upisForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!upisForm.reportValidity()) {
    return;
  }

  upisSubmitBtn.disabled = true;
  upisSubmitBtn.textContent = "Slanje...";

  fetch(upisForm.action, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(upisForm),
  })
    .then((response) => response.json().catch(() => ({})).then((data) => ({ response, data })))
    .then(({ response, data }) => {
      if (!response.ok || data.success !== true) {
        throw new Error(data.message || "Slanje nije uspelo");
      }
      upisFields.hidden = true;
      upisActions.hidden = true;
      upisSuccess.hidden = false;
    })
    .catch(() => {
      alert("Došlo je do greške pri slanju. Pokušajte ponovo ili nas kontaktirajte direktno telefonom/mejlom.");
    })
    .finally(() => {
      upisSubmitBtn.disabled = false;
      upisSubmitBtn.textContent = "Pošalji";
    });
});

upisSuccessCloseBtn.addEventListener("click", () => {
  upisDialog.close();
});
