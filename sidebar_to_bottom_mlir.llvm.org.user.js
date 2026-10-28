// ==UserScript==
// @name        sidebar_to_bottom_mlir.llvm.org
// @description Move the sidebar below the content when the window is narrow
// @match       https://mlir.llvm.org/*
// @grant       none
// ==/UserScript==

// The site already does this, but only below 480px.
(function() {
    'use strict';

    var style = document.createElement("style");
    style.textContent = `
        @media screen and (max-width: 900px) {
            .content-container { flex-flow: column nowrap; }
            main { flex: 0 0 auto; max-width: 100%; }
            .sidebar { flex: 0 0 auto; order: 1; }
        }
    `;
    document.head.appendChild(style);
})();
