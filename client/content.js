(function initWhatsAppFab() {
  const FAB_ID = "dtg-whatsapp-fab";
  const NOTICE_ID = "dtg-whatsapp-notice";
  const STORAGE_KEY = "dtg_prefill_message";

  function getComposerText() {
    // Try multiple possible composer selectors
    const composer = document.querySelector('footer div[contenteditable="true"]');
    if (composer && (composer.innerText || composer.textContent).trim()) {
      return (composer.innerText || composer.textContent).trim();
    }
    const titleComposer = document.querySelector('div[title="Type a message"]');
    if (titleComposer && (titleComposer.innerText || titleComposer.textContent).trim()) {
      return (titleComposer.innerText || titleComposer.textContent).trim();
    }
    return "";
  }

  function getLastIncomingMessage() {
    const incoming = document.querySelectorAll("div.message-in");
    for (let i = incoming.length - 1; i >= 0; i--) {
      const node = incoming[i];
      const textNode = node.querySelector("span.selectable-text span, span.copyable-text");
      if (textNode && (textNode.innerText || textNode.textContent).trim()) {
        return (textNode.innerText || textNode.textContent).trim();
      }
      const selectable = node.querySelector("span.selectable-text");
      if (selectable && (selectable.innerText || selectable.textContent).trim()) {
        return (selectable.innerText || selectable.textContent).trim();
      }
      const rawText = (node.innerText || node.textContent).trim();
      if (rawText && !rawText.match(/^(\d{1,2}:\d{2})/)) {
        return rawText;
      }
    }
    return "";
  }

  function getAnyLastMessage() {
    // Fallback: grab the last piece of selectable text in the document
    const selectable = document.querySelectorAll("span.selectable-text");
    for (let i = selectable.length - 1; i >= 0; i--) {
      if (selectable[i].closest('footer')) continue; // skip the composer
      const txt = (selectable[i].innerText || selectable[i].textContent).trim();
      if (txt) return txt;
    }
    return "";
  }

  function showNotice(text, tone = "info") {
    const existing = document.getElementById(NOTICE_ID);
    if (existing) existing.remove();

    const notice = document.createElement("div");
    notice.id = NOTICE_ID;
    notice.textContent = text;
    notice.style.position = "fixed";
    notice.style.top = "125px"; // changed notice to top as well
    notice.style.left = "50%";
    notice.style.transform = "translateX(-50%)";
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

  function openIframeAnalyzer() {
    let overlay = document.getElementById("dtg-iframe-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "dtg-iframe-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "rgba(15, 23, 42, 0.6)"; // dark slate
      overlay.style.zIndex = "9999998";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.backdropFilter = "blur(4px)";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s ease";
      
      const closeArea = document.createElement("div");
      closeArea.style.position = "absolute";
      closeArea.style.width = "100%";
      closeArea.style.height = "100%";
      closeArea.addEventListener("click", () => {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.style.display = "none", 300);
      });
      overlay.appendChild(closeArea);

      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.width = "400px";
      wrapper.style.height = "620px";
      wrapper.style.backgroundColor = "#fff";
      wrapper.style.borderRadius = "16px";
      wrapper.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.5)";
      wrapper.style.overflow = "hidden";
      wrapper.style.zIndex = "9999999";
      wrapper.style.transform = "translateY(20px)";
      wrapper.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";

      const iframe = document.createElement("iframe");
      iframe.id = "dtg-iframe-analyzer";
      iframe.src = chrome.runtime.getURL("index.html");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.style.display = "block";
      iframe.setAttribute("allow", "clipboard-read; clipboard-write");

      const closeButton = document.createElement("button");
      closeButton.innerHTML = "✕";
      closeButton.style.position = "absolute";
      closeButton.style.top = "12px";
      closeButton.style.right = "12px";
      closeButton.style.width = "32px";
      closeButton.style.height = "32px";
      closeButton.style.borderRadius = "50%";
      closeButton.style.border = "none";
      closeButton.style.background = "rgba(0,0,0,0.05)";
      closeButton.style.color = "#334155";
      closeButton.style.fontSize = "16px";
      closeButton.style.fontWeight = "bold";
      closeButton.style.cursor = "pointer";
      closeButton.style.zIndex = "10000000";
      closeButton.style.transition = "background 0.2s";
      closeButton.addEventListener("mouseenter", () => closeButton.style.background = "rgba(0,0,0,0.1)");
      closeButton.addEventListener("mouseleave", () => closeButton.style.background = "rgba(0,0,0,0.05)");
      closeButton.addEventListener("click", () => {
        overlay.style.opacity = "0";
        wrapper.style.transform = "translateY(20px)";
        setTimeout(() => overlay.style.display = "none", 300);
      });

      wrapper.appendChild(iframe);
      wrapper.appendChild(closeButton);
      overlay.appendChild(wrapper);
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        wrapper.style.transform = "translateY(0)";
      });
    } else {
      overlay.style.display = "flex";
      const wrapper = overlay.querySelector("div[style*='position: relative']");
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        if (wrapper) wrapper.style.transform = "translateY(0)";
      });
      const iframe = document.getElementById("dtg-iframe-analyzer");
      if (iframe) {
         iframe.src = chrome.runtime.getURL("index.html");
      }
    }
  }

  async function handleAnalyzeClick() {
    // Attempt to extract text quietly
    const extracted = getComposerText() || getLastIncomingMessage() || getAnyLastMessage();

    // Still save whatever we found (or explicitly empty string) 
    // so the popup opens clean if no text.
    try {
      await chrome.storage.local.set({ [STORAGE_KEY]: extracted || "" });
      openIframeAnalyzer();
    } catch {
      showNotice("Could not open analyzer.", "error");
    }
  }

  function createFab() {
    const button = document.createElement("button");
    button.id = FAB_ID;
    button.type = "button";
    button.textContent = "✨ Analyze Current Chat";
    button.setAttribute("aria-label", "Analyze current WhatsApp chat");
    button.style.position = "fixed";
    
    // Place it at top-right near header as requested in the screenshot
    button.style.top = "10px";
    button.style.right = "280px";
    button.style.height = "46px";
    button.style.padding = "0 16px";
    button.style.border = "none";
    button.style.borderRadius = "999px";
    button.style.background = "linear-gradient(135deg, #25D366 0%, #4da6ff 100%)";
    button.style.color = "#ffffff";
    button.style.fontSize = "13px";
    button.style.fontWeight = "700";
    button.style.cursor = "grab";
    button.style.zIndex = "999999";
    button.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.28)";
    button.style.transition = "box-shadow 0.15s ease";

    let isDragging = false;
    let hasDragged = false;
    let initialX, initialY, currentX, currentY;
    let xOffset = 0, yOffset = 0;

    button.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    function dragStart(e) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      if (e.target === button) {
        isDragging = true;
        hasDragged = false;
        button.style.cursor = "grabbing";
      }
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        button.style.transform = `translate(${currentX}px, ${currentY}px)`;
        // If moved more than somewhat, count as drag
        if (Math.abs(currentX) > 5 || Math.abs(currentY) > 5) {
            hasDragged = true;
        }
      }
    }

    function dragEnd(e) {
      isDragging = false;
      button.style.cursor = "grab";
    }

    button.addEventListener("mouseenter", () => {
      button.style.boxShadow = "0 16px 34px rgba(15, 23, 42, 0.34)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.28)";
    });
    button.addEventListener("click", (e) => {
      if (hasDragged) {
        e.preventDefault();
        return; // prevent click if it was just dragged
      }
      handleAnalyzeClick();
    });
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
