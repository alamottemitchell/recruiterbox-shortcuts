// ==UserScript==
// @name         Recruiterbox Keyboard Shortcuts
// @version      0.1
// @description  Some helpful shortcuts for navigating recruiterbox candidate page
// @author       Andrew Mitchell
// @include      /^https://.*\.recruiterbox\.com/app/.*
// ==/UserScript==

var keyPrefix = 'ctrl+shift+';

function findAndClick(selector) {
    var results = $(selector);
    if (results.length == 1) {
        results[0].click();
    } else {
        console.log("Unexpected number of results:", results);
    }
}

function findAndClickLinkWithText(text) {
    findAndClick("a:contains('" + text + "')");
}

function findAndClickButtonWithText(text) { 
    findAndClick("button:contains('" + text + "')");
}

function bindKey(key, callback) {
    Mousetrap.bind(keyPrefix + key, callback);
}

var keyToLinkMapping = {
    't': 'New To-do',
    'm': 'New Candidate Message',
    'n': 'New Internal Note',
    'i': 'New Interview'
}

var keyToButtonMapping = {
    'a': 'Change Assignee',
    's': 'Change Stage'
}

// Load this handy Mousetrap library and do some keybinding
$.getScript('https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.4.6/mousetrap.min.js', function() {
    $.each(keyToLinkMapping, function(key, link) {
        bindKey(key, function(e) {
          findAndClickLinkWithText(link);  
        });
    });
    
    $.each(keyToButtonMapping, function(key, button) {
        bindKey(key, function(e) {
          findAndClickButtonWithText(button);  
        });
    });
    
    bindKey('/', function(e) {
        $("[name='q']")[0].focus();
    });
});
