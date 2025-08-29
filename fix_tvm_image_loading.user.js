// ==UserScript==
// @name        fix_tvm_image_loading
// @description This is your new file, start writing code
// @match       https://tvm.apache.org/*
// @grant       GM.xmlHttpRequest
// ==/UserScript==

// TODO: find minimum common denominator of this two headers

// ==UserScript==
// @name         fix_tvm_image_loading
// @namespace    http://tampermonkey.net/
// @version      2025-08-27
// @description  try to take over the world!
// @author       You
// @match        https://tvm.apache.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM.xmlHttpRequest
// ==/UserScript==

// document.getElementsByTagName('head')[0].innerHTML += '<meta http-equiv="Content-Security-Policy" content="default-src gap://ready file://* *; style-src \'self\' http://* https://* \'unsafe-inline\'; script-src \'self\' http://* https://* \'unsafe-inline\' \'unsafe-eval\'">';

// https://github.com/quoid/userscripts
// https://wiki.greasespot.net

(function() {
    'use strict';

    function load_image(response, img) {
        var arrayBufferView = new Uint8Array(response.response);
        var chunkSize = 8192;
        var string = '';
        try {
            for (var i = 0; i < arrayBufferView.byteLength; i += chunkSize) {
                string += String.fromCharCode.apply(null, arrayBufferView.subarray(i, i + chunkSize));
            }
        } catch (error) {
            if (error instanceof RangeError) {
                // TODO: find a better way to do this.
                console.error("Apparently String.fromCharCode.apply puts values on the stack and this can cause a stack overflow, lower the chunkSize variable");
            }
            throw error;
        }
        var base64 = btoa(string);
        var data_url = "data:image/png;base64," + base64;
        img.src = data_url;
        // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        // var imageUrl = window.URL.createObjectURL( blob );
        // img.src = imageUrl;
    }

    var imgs = document.querySelectorAll("img[src^=\"https://raw.githubusercontent.com/\"][src$=\".png\"]");

    for (var i = 0; i < imgs.length; i++) {
        let img = imgs[i];
        GM.xmlHttpRequest({
            method: "GET",
            url: img.src,
            responseType: "arraybuffer",
            onload: function (response) { load_image(response, img) },
        });
    }
})();
