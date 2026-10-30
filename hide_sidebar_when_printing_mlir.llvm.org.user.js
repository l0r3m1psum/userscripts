// ==UserScript==
// @name        hide_sidebar_when_printing_mlir.llvm.org
// @description Hide the sidebar and widen the content when printing
// @match       https://mlir.llvm.org/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement("style");
    style.textContent = `
        @media print {
            .sidebar { display: none; }
            main { flex: 0 0 100%; max-width: 100%; }
        }
    `;
    document.head.appendChild(style);
})();
