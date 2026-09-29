/**
 * Quote form — no backend.
 * mailto target: craftbros.corp@gmail.com
 */
(function () {
  var CONTACT = "craftbros.corp@gmail.com";
  var form = document.getElementById("quote-form");
  var statusEl = document.getElementById("form-status");
  var copyBtn = document.getElementById("copy-summary");

  if (!form) return;

  function val(id) {
    var el = document.getElementById(id);
    return el ? (el.value || "").trim() : "";
  }

  function buildSummary() {
    var lines = [
      "Quote request — Craft Bros Corp",
      "------------------------",
      "Name: " + val("name"),
      "Email: " + val("email"),
      "Phone: " + (val("phone") || "(not provided)"),
      "Service: " + (val("service") || "(not specified)"),
      "",
      "Project description:",
      val("description") || "(none)",
      "",
      "Material / color prefs: " + (val("material") || "(not specified)"),
      "Quantity / size notes: " + (val("quantity") || "(not specified)"),
      "",
      "Note: Attach design files (STL, STEP, Fusion, etc.) to your email.",
    ];
    return lines.join("\n");
  }

  function showStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "form-status show " + (kind || "ok");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!val("name") || !val("email") || !val("description")) {
      showStatus("Please fill in name, email, and project description.", "warn");
      return;
    }

    var summary = buildSummary();

    if (!CONTACT) {
      return;
    }

    var subject = "Quote request from " + val("name") + " — Craft Bros Corp";
    var mailto =
      "mailto:" +
      encodeURIComponent(CONTACT) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(summary);

    window.location.href = mailto;
    showStatus(
      "Your email app should open with a draft to " +
        CONTACT +
        ". If nothing opens, use “Copy summary” and paste it into an email. Attach design files before sending.",
      "ok"
    );
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var summary = buildSummary();
      if (!val("name") && !val("email") && !val("description")) {
        showStatus("Fill in the form first, then copy the summary.", "warn");
        return;
      }
      var destHint = CONTACT || "(quote email pending)";
      function ok() {
        showStatus(
          "Summary copied. Paste it into an email to " +
            destHint +
            " and attach your design files.",
          "ok"
        );
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary).then(ok, function () {
          fallbackCopy(summary, destHint);
        });
      } else {
        fallbackCopy(summary, destHint);
      }
    });
  }

  function fallbackCopy(text, destHint) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showStatus(
        "Summary copied. Paste it into an email to " +
          destHint +
          " and attach your design files.",
        "ok"
      );
    } catch (err) {
      showStatus(
        "Could not copy automatically. Select and copy the summary manually.",
        "warn"
      );
    }
    document.body.removeChild(ta);
  }
})();
