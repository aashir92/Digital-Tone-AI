(function initWhatsAppFab() {
  const FAB_ID = "dtg-whatsapp-fab";
  const NOTICE_ID = "dtg-whatsapp-notice";
  const STORAGE_KEY = "dtg_prefill_message";

  function getComposerText() {
    const composer = document.querySelector('footer div[contenteditable="true"][data-tab]');
    return composer?.innerText?.trim() || "";
  }

  function getLastIncomingMessage() {
    const incoming = document.querySelectorAll("div.message-in span.selectable-text");
    if (!incoming.length) return "";
    return incoming[incoming.length - 1]?.innerText?.trim() || "";
  }

  function showNotice(text, tone = "info") {
    const existing = document.getElementById(NOTICE_ID);
    if (existing) existing.remove();

    const notice = document.createElement("div");
    notice.id = NOTICE_ID;
    notice.textContent = text;
    notice.style.position = "fixed";
    notice.style.bottom = "120px";
    notice.style.right = "20px";
    notice.style.padding = "10px 12px";
    notice.style.borderRadius = "10px";
    notice.style.fontSize = "12px";
    notice.style.fontWeight = "600";
    notice.style.zIndex = "999999";
    notice.style.boxShadow = "0 10px 28px rgba(15, 23, 42, 0.2)";
    notice.style.background = tone === "error" ? "#fef2f2" : "#ecfeff";
    notice.style.color = tone === "error" ? "#b91c1c" : "#0f766e";
    notice.style.border = tone === "error" ? "1px solid #fecaca" : "1px solid #a5f3fc";
    document.body.appendChild(notice);

    window.setTimeout(() => {
      notice.remove();
    }, 2800);
  }

  async function handleAnalyzeClick() {
    const extracted = getComposerText() || getLastIncomingMessage();
    if (!extracted) {
      showNotice("No text found in this chat yet.", "error");
      return;
    }

    try {
      await chrome.storage.local.set({ [STORAGE_KEY]: extracted });
      try {
        await chrome.runtime.sendMessage({ type: "DTG_OPEN_POPUP" });
      } catch {
        // No background listener is required for this flow.
      }
      showNotice("Message captured. Open Digital Tone Gap from toolbar.");
    } catch {
      showNotice("Could not save message for analysis.", "error");
    }
  }

  function createFab() {
    const button = document.createElement("button");
    button.id = FAB_ID;
    button.type = "button";
    button.textContent = "✨ Analyze Current Chat";
    button.setAttribute("aria-label", "Analyze current WhatsApp chat");
    button.style.position = "fixed";
    button.style.right = "20px";
    button.style.bottom = "72px";
    button.style.height = "46px";
    button.style.padding = "0 16px";
    button.style.border = "none";
    button.style.borderRadius = "999px";
    button.style.background = "linear-gradient(135deg, #25D366 0%, #4da6ff 100%)";
    button.style.color = "#ffffff";
    button.style.fontSize = "13px";
    button.style.fontWeight = "700";
    button.style.cursor = "pointer";
    button.style.zIndex = "999999";
    button.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.28)";
    button.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-1px)";
      button.style.boxShadow = "0 16px 34px rgba(15, 23, 42, 0.34)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.28)";
    });
    button.addEventListener("click", handleAnalyzeClick);
    return button;
  }

  function ensureFab() {
    if (!document.body) return;
    if (document.getElementById(FAB_ID)) return;
    document.body.appendChild(createFab());
  }

  const observer = new MutationObserver(() => ensureFab());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  ensureFab();
})();
