// ==UserScript==
// @name        load_js_for_idp.uniroma1.it
// @description Sapienza's identification portal cannot load jQuery, this fixes it.
// @match       https://idp.uniroma1.it/*
// ==/UserScript==

if (typeof jQuery === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.7.1.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log('Applied fix for loading jQuery');
}
