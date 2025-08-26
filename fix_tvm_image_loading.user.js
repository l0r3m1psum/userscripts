// ==UserScript==
// @name        fix_tvm_image_loading
// @description This is your new file, start writing code
// @match       https://tvm.apache.org/*
// @grant       GM.xmlHttpRequest
// ==/UserScript==

// document.getElementsByTagName('head')[0].innerHTML += '<meta http-equiv="Content-Security-Policy" content="default-src gap://ready file://* *; style-src \'self\' http://* https://* \'unsafe-inline\'; script-src \'self\' http://* https://* \'unsafe-inline\' \'unsafe-eval\'">';

// https://github.com/quoid/userscripts
// https://wiki.greasespot.net

function load_image(response, img) {
    var arrayBufferView = new Uint8Array(response.response);
    var string = String.fromCharCode.apply(null, arrayBufferView);
    var base64 = btoa(string);
    var data_url = "data:image/png;base64," + base64;
    // var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    // var imageUrl = window.URL.createObjectURL( blob );
    // img.src = imageUrl;
    img.src = data_url;
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
