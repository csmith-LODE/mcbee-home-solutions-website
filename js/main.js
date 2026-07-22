document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  var scrim = document.querySelector(".nav-scrim");
  var body = document.body;

  function closeMenu() {
    toggle.classList.remove("open");
    menu.classList.remove("open");
    scrim.classList.remove("open");
    body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    toggle.classList.add("open");
    menu.classList.add("open");
    scrim.classList.add("open");
    body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  if (toggle && menu && scrim) {
    toggle.addEventListener("click", function () {
      if (menu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    scrim.addEventListener("click", closeMenu);

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) {
        closeMenu();
      }
    });
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var form = document.getElementById("quote-form");
  if (form) {
    var statusBox = document.getElementById("form-status");
    var submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      statusBox.className = "form-status";
      statusBox.textContent = "";

      var formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            statusBox.className = "form-status success";
            statusBox.textContent = "Thanks! Your request has been sent. Michael will get back to you soon.";
            form.reset();
            submitBtn.textContent = "Request Sent";
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch(function () {
          statusBox.className = "form-status error";
          statusBox.textContent = "Something went wrong sending your request. Please call or text (423) 394-3666 instead.";
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Request";
        });
    });
  }
});
