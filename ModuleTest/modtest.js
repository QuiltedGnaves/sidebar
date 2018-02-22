/* global $ */

// assign main tab buttons to variables
var inboundBtn = document.getElementById('inbound-btn');
var outboundBtn = document.getElementById('outbound-btn');
var chatBtn = document.getElementById('chat-btn');

// assign each tab content class to a variable
var mainTabContent = document.getElementsByClassName("main-tab-content");
var outboundTabContent = document.getElementsByClassName("outbound-tab-content");
var chatTabContent = document.getElementsByClassName("chat-tab-content");

// assign each tab links class to a variable
var mainTabLinks = document.getElementsByClassName("main-tab-links");
var outboundTabLinks = document.getElementsByClassName("outbound-tab-links");
var chatTabLinks = document.getElementsByClassName("chat-tab-links");

// assign main tabs to variables
var inboundContent = document.getElementById("inbound-content");
var outboundContent = document.getElementById("outbound-content");
var chatContent = document.getElementById("chat-content");

// assign the outbound template buttons to variables
var prefundBtn = document.getElementById('prefund-btn'); 
var signingBtn = document.getElementById('signing-btn');
var missingDocsBtn = document.getElementById('missing-docs-btn');
var wealthBtn = document.getElementById('wealth-btn');
var productSelectBtn = document.getElementById('product-select-btn');
var voeBtn = document.getElementById('voe-btn');
var customNotesBtn = document.getElementById('custom-notes-btn');

// assign outbound template tabs to variables
var prefundContent = document.getElementById("prefund-content");
var signingContent = document.getElementById("signing-content");
var missingDocsContent = document.getElementById("missing-docs-content");
var wealthContent = document.getElementById("wealth-content");
var productSelectContent = document.getElementById("product-select-content");
var voeContent = document.getElementById("voe-content");
var customNotesContent = document.getElementById("custom-notes-content");

// assign the chat location buttons to variables
var leftChatBtn = document.getElementById('left-chat-tab-btn');
var middleChatBtn = document.getElementById('middle-chat-tab-btn');
var rightChatBtn = document.getElementById('right-chat-tab-btn');

// assign chat tabs to variables
var leftChatContent = document.getElementById("left-chat-content");
var middleChatContent = document.getElementById("middle-chat-content");
var rightChatContent = document.getElementById("right-chat-content");




function tabs(evt, contactType, tabcontent, tablinks) {
    // Declare all variables
    var i;

    // Get all elements with class="contact-type-tabcontent" and hide them
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="contact-type-tabcontent" and remove the class "active"
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    contactType.style.display = "block";
    evt.currentTarget.className += " active";
}

// Main tabs
inboundBtn.addEventListener('click', function() {
    tabs(event, inboundContent, mainTabContent, mainTabLinks);
    }, false);
outboundBtn.addEventListener('click', function() {
    tabs(event, outboundContent, mainTabContent, mainTabLinks);
    }, false);
chatBtn.addEventListener('click', function() {
    tabs(event, chatContent, mainTabContent, mainTabLinks);
    }, false);

// Outbound template tabs
prefundBtn.addEventListener('click', function() {
    tabs(event, prefundContent, outboundTabContent, outboundTabLinks);
    }, false);
signingBtn.addEventListener('click', function() {
    tabs(event, signingContent, outboundTabContent, outboundTabLinks);
    }, false);
missingDocsBtn.addEventListener('click', function() {
    tabs(event, missingDocsContent, outboundTabContent, outboundTabLinks);
    }, false);
wealthBtn.addEventListener('click', function() {
    tabs(event, wealthContent, outboundTabContent, outboundTabLinks);
    }, false);
productSelectBtn.addEventListener('click', function() {
    tabs(event, productSelectContent, outboundTabContent, outboundTabLinks);
    }, false);
voeBtn.addEventListener('click', function() {
    tabs(event, voeContent, outboundTabContent, outboundTabLinks);
    }, false);
customNotesBtn.addEventListener('click', function() {
    tabs(event, customNotesContent, outboundTabContent, outboundTabLinks);
    }, false);

// Chat tabs
leftChatBtn.addEventListener('click', function() {
    tabs(event, leftChatContent, chatTabContent, chatTabLinks);
    }, false);
middleChatBtn.addEventListener('click', function() {
    tabs(event, middleChatContent, chatTabContent, chatTabLinks);
    }, false);
rightChatBtn.addEventListener('click', function() {
    tabs(event, rightChatContent, chatTabContent, chatTabLinks);
    }, false);