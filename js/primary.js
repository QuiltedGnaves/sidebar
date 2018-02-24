/* global $ */

//**************************************************************************
//*********** GLOBAL *******************************************************
//**************************************************************************

var calledFrom = " Called from: ";
var numCalled = " Number called: ";
var verifiedBwr = " Verified Bwr. ";

$("#reset-all").on("click", function() {
    resetAll();
});


//***************************
//******** Functions ********
//***************************

//**** Tabs Function ****
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


//**** Set BG color for DDL in chats function ****
function setDdlBgColor(whichChat, colorChoice) {
    
    $.each(colors, function(name, hex) {
        if(colorChoice == name) {
            $("#color-picker-" + whichChat).css("background-color", hex);
            $("#" + whichChat + "-chat-color-bar").css("background-color", hex);
            return false;
        }
    });
    
}

//**** Copy to Clipboard ****
function copyToClipboard(notes) {
    
    var tempTextarea = document.getElementById("temp-textarea");
    
    // Clear text area
    $(tempTextarea).val('');
    
    tempTextarea.value += notes;
    
    tempTextarea.select();
    
    // Copy to clipboard from selected text area
    try {
        var successful = document.execCommand('copy');
        copySnackbar();
        if(!successful){
            console.error("Cannot copy text");
        }else {
            console.log("The text should be on the clipboard.");
        }
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}

//*** Snack Bar Functions ***

function copySnackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("copy-snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 750);
}

function resetSnackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("reset-snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 2.5 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 750);
}

//**** Format Outbound Templates ****
function formatTemplate(template, templateKey, phoneNumTb, callCode) {
    
    var formattedNotes = callCode + numCalled + phoneNumTb + ". " + template[templateKey];
    
    copyToClipboard(formattedNotes);
}

//**** Get phone number ****
function getPhoneNum(number) {
    return $(number).val();
}

//**** Format Chat Notes function ****
function formatChatNotes(whichChat) {
    
    var wasVerified = "";
    var $question = $("#question-chat-" + whichChat).val();
    var $notes = $("#notes-chat-" + whichChat).val();
    
    if($("#verify-no-" + whichChat).is(":checked")){
        if($("#general-question-cb-" + whichChat).is(":checked")) {
            wasVerified = "ICC-SC-TB: Not verified because general questions asked. ";
        } else if($("#other-cb-" + whichChat).is(":checked")) {
            wasVerified = "ICC-SC-TB: Not verified because " + $("#other-tb-" + whichChat).val() + ". ";
        } else {
            wasVerified = "ICC-SC-TB: Not Verified";
        }
    } else {
        wasVerified = "ICC-SC-TB: Bwr verified. ";
    }
    
    var formattedNotes =  wasVerified + "\n\n" + "Question: " + $question + "\n\n" + "Notes: " + $notes;
    
    return copyToClipboard(formattedNotes);
}

function resetInbound() {
    resetSnackbar();
    $(".clear-form-inbound").val("");
    $("#question-inbound").height(63);
    $("#notes-inbound").height(110);
    $(".verify-checkbox-input-inbound").prop("checked", false);
    $(".inbound-to-hide").hide();
    $("#ddl-inbound").get(0).selectedIndex = 0;
}

function resetOutbound(whichOne) {
    
    resetSnackbar();
    
    if(whichOne != "all") {
        $("#" + whichOne + "-phone-number").val("");
    } else {
        $("." + whichOne + "-phone-number").val("");
    }
    
    if( $("#inbound-pf-checkbox").is(":checked") || $("#outbound-pf-checkbox").is(":checked") || $("#extra-autopay-checkbox").is(":checked") || $("#extra-notes-checkbox").is(":checked")) {
        $("#inbound-pf-checkbox").prop("checked", false);
        $("#outbound-pf-checkbox").prop("checked", false);
        $("#extra-autopay-checkbox").prop("checked", false);
        $("#prefund-extra-autopay-amount").val("");
        $(".extra-autopay-amount-div").hide();
        $("#extra-notes-checkbox").prop("checked", false);
        $("#extra-notes-prefund").val("");
        $("#extra-notes-prefund").height(110);
        $(".prefund-extra-notes-div").hide();
    }
}

function resetCustomOutbound() {
    
    resetSnackbar();
    $("#custom-phone-num").val("");
    $("#custom-extra-notes").val("");
    $("#custom-extra-notes").height(110);
    $("#contact-type-ddl-outbound").get(0).selectedIndex = 0;
    $("#contact-person-ddl-outbound").get(0).selectedIndex = 0;
    $("#call-number-ddl-outbound").get(0).selectedIndex = 0;
}

function resetChat(whichChat) {
    
    if(whichChat == "all") {
        $(".reset-all-cb").prop("checked", false);
        $(".chat-tb").val("");
        $(".color-picker-ddl").get(0).selectedIndex = 0;
        $(".color-picker-ddl").attr("style", "");
        $(".chat-button-color-bar").attr("style", "");
        $(".question-tb").height(63);
        $(".notes-tb").height(110);
        $(".why-not-div").hide();
        $(".tb-div-other").hide();
    } else {
            if($("#verify-yes-" + whichChat).is(":checked")) {
            $("#verify-yes-" + whichChat).prop("checked", false);
        } else if($("#verify-no-" + whichChat).is(":checked")) {
            $("#verify-no-" + whichChat).prop("checked", false);
            $("#general-question-cb-" + whichChat).prop("checked", false);
            $("#other-cb-" + whichChat).prop("checked", false);
            $("#other-tb-" + whichChat).val("");
        } else {
            
        }
        
        $("#color-picker-" + whichChat).get(0).selectedIndex = 0;
        $("#color-picker-" + whichChat).attr("style", "");
        $("#" + whichChat + "-chat-color-bar").attr("style", "");
        $("#question-chat-" + whichChat).val("");
        $("#question-chat-" + whichChat).height(63);
        $("#notes-chat-" + whichChat).val("");
        $("#notes-chat-" + whichChat).height(110);
        $("#tb-div-other-" + whichChat).hide();
        $("#why-not-div-" + whichChat).hide();
    }
    
    
}

function resetAll() {
    resetInbound();
    resetOutbound("all");
    resetCustomOutbound();
    resetChat("all");
    
    $("#chat-tabs-wrapper").sortable("refreshPositions");
}

//***************************
//******** Variables ********
//***************************


//**** assign main tab buttons to variables ****
var inboundBtn = document.getElementById('inbound-btn');
var outboundBtn = document.getElementById('outbound-btn');
var chatBtn = document.getElementById('chat-btn');

//**** assign each tab content class to a variable ****
var mainTabContent = document.getElementsByClassName("main-tab-content");
var outboundTabContent = document.getElementsByClassName("outbound-tab-content");
var chatTabContent = document.getElementsByClassName("chat-tab-content");

//**** assign each tab links class to a variable ****
var mainTabLinks = document.getElementsByClassName("main-tab-links");
var outboundTabLinks = document.getElementsByClassName("outbound-tab-links");
var chatTabLinks = document.getElementsByClassName("chat-tab-links");

//**** assign main tabs to variables ****
var inboundContent = document.getElementById("inbound-content");
var outboundContent = document.getElementById("outbound-content");
var chatContent = document.getElementById("chat-content");

//**** assign the outbound template buttons to variables ****
var prefundBtn = document.getElementById('prefund-btn'); 
var signingBtn = document.getElementById('signing-btn');
var missingDocsBtn = document.getElementById('missing-docs-btn');
var wealthBtn = document.getElementById('wealth-btn');
var productSelectBtn = document.getElementById('product-select-btn');
var mortgageBtn = document.getElementById('mortgage-btn');
var voeBtn = document.getElementById('voe-btn');
var customNotesBtn = document.getElementById('custom-notes-btn');

//**** assign outbound template tabs to variables ****
var prefundContent = document.getElementById("prefund-content");
var signingContent = document.getElementById("signing-content");
var missingDocsContent = document.getElementById("missing-docs-content");
var wealthContent = document.getElementById("wealth-content");
var productSelectContent = document.getElementById("product-select-content");
var voeContent = document.getElementById("voe-content");
var mortgageContent = document.getElementById("mortgage-content");
var customNotesContent = document.getElementById("custom-notes-content");

//**** assign the chat location buttons to variables ****
var leftChatBtn = document.getElementById('left-chat-tab-btn');
var middleChatBtn = document.getElementById('middle-chat-tab-btn');
var rightChatBtn = document.getElementById('right-chat-tab-btn');

//**** assign chat tabs to variables ****
var leftChatContent = document.getElementById("left-chat-content");
var middleChatContent = document.getElementById("middle-chat-content");
var rightChatContent = document.getElementById("right-chat-content");


//**** Main tabs ****
inboundBtn.addEventListener('click', function() {
    tabs(event, inboundContent, mainTabContent, mainTabLinks);
    }, false);
outboundBtn.addEventListener('click', function() {
    tabs(event, outboundContent, mainTabContent, mainTabLinks);
    }, false);
chatBtn.addEventListener('click', function() {
    tabs(event, chatContent, mainTabContent, mainTabLinks);
    }, false);




    
//******************************
//******** INBOUND PAGE ********
//******************************

//**** Set Inbound to Default ****
document.getElementById('inbound-btn').click();

//**** Inbound Show/Hide ANI Match ****
$("#verify-fullname-div").hide();
$("#verify-dob-div").hide();
$("#verify-ssn-div").hide();
$("#verify-address-div").hide();
$(".separator").hide();

$("input[type='checkbox'][id='verify-num-on-file-yes-checkbox-inbound']").change(function() {
    if($(this).is(":checked")) {
        $("#verify-fullname-div").show();
        $("#verify-dob-div").show();
        $("#verify-ssn-div").show();
        $(".separator").show();
        $("#verify-num-on-file-no-checkbox-inbound").prop("checked", false);
        $("#verify-address-div").hide();
    } else {
        $("#verify-fullname-div").hide();
        $("#verify-dob-div").hide();
        $("#verify-ssn-div").hide();
        $("#verify-address-div").hide();
        $(".separator").hide();
    }
});

//**** Inbound Show/Hide No ANI Match ****
$("input[type='checkbox'][id='verify-num-on-file-no-checkbox-inbound']").change(function() {
    if($(this).is(":checked")) {
        $("#verify-fullname-div").show();
        $("#verify-dob-div").show();
        $("#verify-ssn-div").show();
        $("#verify-address-div").show();
        $(".separator").show();
        $("#verify-num-on-file-yes-checkbox-inbound").prop("checked", false);
    } else {
        $("#verify-fullname-div").hide();
        $("#verify-dob-div").hide();
        $("#verify-ssn-div").hide();
        $("#verify-address-div").hide();
        $(".separator").hide();
    }
});

//**** Copy inbound ****
$("#copy-btn-inbound").on('click', function() {
    
    var $calledFromNumber = $("#called-from-number").val();
    var $question = $("#question-inbound").val();
    var $notes = $("#notes-inbound").val();
    var $contactType = $("#ddl-inbound option:selected").attr("value");
    var formattedNotes = $contactType + "-C-TB" + calledFrom + $calledFromNumber + verifiedBwr +"\n\nQuestion: " + $question + "\n\nNotes: " + $notes;
    copyToClipboard(formattedNotes); 
});

//**** Reset inbound ****
$("#reset-btn-inbound").on('click', function() {
    resetInbound();
});

//*******************************
//******** OUTBOUND PAGE ********
//*******************************

//**** Outbound template tabs ****
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
mortgageBtn.addEventListener('click', function() {
    tabs(event, mortgageContent, outboundTabContent, outboundTabLinks);
}, false);   
customNotesBtn.addEventListener('click', function() {
    tabs(event, customNotesContent, outboundTabContent, outboundTabLinks);
}, false);

//**** Set Outbound to Default ****
document.getElementById('custom-notes-btn').click();

//**** Outbound page resets ****

$("#reset-prefund").on("click", function() {
    resetOutbound("prefund");
});

$("#reset-signing").on("click", function() {
    resetOutbound("signing");
});

$("#reset-missing-docs").on("click", function() {
    resetOutbound("missing-docs");
});

$("#reset-wealth").on("click", function() {
    resetOutbound("wealth");
});

$("#reset-prod-sel").on("click", function() {
    resetOutbound("product-select");
});

$("#reset-voe").on("click", function() {
    resetOutbound("voe");
});

$("#reset-mortgage").on("click", function() {
    resetOutbound("mortgage");
});

$("#reset-btn-custom-notes").on("click", function() {
    resetCustomOutbound();
})


//********************
//**** Prefunding ****
//********************

$('#prefunding-complete-btn').click( function () {
    $('.prefund-content').toggle();
});

//**** Prefunding Show/Hide ACH Amount Textbox ****
$('.extra-autopay-amount-div').hide();
$('.prefund-extra-notes-div').hide();

$("input[type='checkbox'][id='extra-autopay-checkbox']").change(function () {
    if($(this).is(":checked")) {
        $('.extra-autopay-amount-div').show();
    } else {
        $('.extra-autopay-amount-div').hide();
    }
});

//**** Prefunding Show/Hide Notes Textarea ****
$("input[type='checkbox'][id='extra-notes-checkbox']").change(function () {
    if($(this).is(":checked")) {
        $('.prefund-extra-notes-div').show();
    } else {
        $('.prefund-extra-notes-div').hide();
    }
});

//**** Prefunding Outbound/Inbound Only Checked ****
$("input[type='checkbox'][id='inbound-pf-checkbox']").change(function() {
    if($(this).is(":checked")) {
        $("#outbound-pf-checkbox").prop("checked", false);
    }
});
$("input[type='checkbox'][id='outbound-pf-checkbox']").change(function() {
    if($(this).is(":checked")) {
        $("#inbound-pf-checkbox").prop("checked", false);
    }
});

var prefundingTemplates = {
    "prefundComplete" : "Pre-funding call. Explained member benefits. Confirmed funding timeline. Confirmed auto-pay status.",
    "bwrNotAvail" : "Pre-funding. The applicant not available to speak.",
    "sysVM" : "Pre-funding. No answer. System left VM.",
    "agentVM" : "Pre-funding. No answer. I left VM."
};

//**** Get prefunding phone number ****
function getPrefundNumber() {
    return getPhoneNum($("#prefund-phone-number"));
}

//**** Get prefunding complete notes
$("#copy-btn-prefund-complete").on("click", function() {
    
    var inOrOut = "";
    var extraACH = "";
    var extraNotes = "";
    var notes = "";
    
    var phoneNum = getPrefundNumber();
    
    if($("#inbound-pf-checkbox").is(":checked")) {
        inOrOut = "ICC-C-TB:";
    } else if($("#outbound-pf-checkbox").is(":checked")) {
        inOrOut = "OCC-C-TB:";
    } else {
        alert("Please select inbound or outbound.");
        return;
    }
    
    if($("#extra-autopay-checkbox").is(":checked")) {
        extraACH = " Confirmed extra autopay amount: $" + $("#prefund-extra-autopay-amount").val() + ".";
    }
    
    if($("#extra-notes-checkbox").is(":checked")) {
        extraNotes = " " + $("#extra-notes-prefund").val();
    }
    
    if(extraACH != "") {
        if(extraNotes != "") {
            notes = inOrOut + calledFrom + phoneNum + ". " + prefundingTemplates["prefundComplete"] + extraACH + extraNotes;
        } else {
            notes = inOrOut + calledFrom + phoneNum + ". " + prefundingTemplates["prefundComplete"] + extraACH;    
        }
        
    } else if(extraNotes != "") {
        notes = inOrOut + calledFrom + phoneNum + ". " + prefundingTemplates["prefundComplete"] + extraNotes;
    } else {
        notes = inOrOut + calledFrom + phoneNum + ". " + prefundingTemplates["prefundComplete"];
    }
    
    copyToClipboard(notes);
    
});


$("#borrower-not-avail-btn-prefund").on("click", function() {
    var phoneNum = getPrefundNumber();
    formatTemplate(prefundingTemplates, "bwrNotAvail", phoneNum, "OCC-C-UNV");
});

$("#system-vm-btn-prefund").on("click", function() {
    var phoneNum = getPrefundNumber();
    formatTemplate(prefundingTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#agent-vm-btn-prefund").on("click", function() {
    var phoneNum = getPrefundNumber();
    formatTemplate(prefundingTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** Signing ****
//********************

var signingTemplates = {
    "signingComplete" : "Signing reminder call. Asked if there were questions or concerns about signing. The applicant will sign.",
    "bwrStillThinking" : "Signing reminder call. Asked if there were questions or concerns about signing. The applicant is still thinking.",
    "didntVerify" : "Signing reminder call. The applicant did not want to verify.",
    "bwrNotAvail" : "Signing reminder call. The applicant was not available to speak.",
    "sysVM" : "Signing reminder call. No answer. System left VM.",
    "agentVM" : "Signing reminder call. No answer. I left VM."
};

//**** Get signing phone number ****
function getSigningNumber() {
    return getPhoneNum($("#signing-phone-number"));
}

$("#signing-complete-btn").on("click", function() {
    var phoneNum = getSigningNumber();
    formatTemplate(signingTemplates, "signingComplete", phoneNum, "OCC-C-TB");
});

$("#still-thinking-btn-signing").on("click", function() {
    var phoneNum = getSigningNumber();
    formatTemplate(signingTemplates, "bwrStillThinking", phoneNum, "OCC-C-TB");
});

$("#didnt-verify-btn-signing").on("click", function() {
    var phoneNum = getSigningNumber();
    formatTemplate(signingTemplates, "didntVerify", phoneNum, "OCC-C-TB");
});

$("#borrower-not-avail-btn-signing").on("click", function() {
    var phoneNum = getSigningNumber();
    formatTemplate(signingTemplates, "bwrNotAvail", phoneNum, "OCC-C-UNV");
});

$("#system-vm-btn-signing").on("click", function() {
    var phoneNum = getSigningNumber();
    formatTemplate(signingTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#agent-vm-btn-signing").on("click", function() {
    var phoneNum = getSigningNumber();
    formatTemplate(signingTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** Missing Docs ****
//********************

var missingDocTemplates = {
    "missingDocComplete" : "Missing docs call. Asked if they needed help uploading docs or if they had any questions. They will upload docs soon.",
    "didntVerify" : "Missing docs call. The applicant did not want to verify.",
    "bwrNotAvail" : "Missing docs call. The applicant was not available to speak.",
    "sysVM" : "Missing docs call. No answer. System left VM.",
    "agentVM" : "Missing docs call. No answer. I left VM."
};

//**** Get missing docs phone number ****
function getMissingDocsNumber() {
    return getPhoneNum($("#missing-docs-phone-number"));
}

$("#missing-docs-complete-btn").on("click", function() {
    var phoneNum = getMissingDocsNumber();
    formatTemplate(missingDocTemplates, "missingDocComplete", phoneNum, "OCC-C-TB");
});

$("#didnt-verify-btn-missing-docs").on("click", function() {
    var phoneNum = getMissingDocsNumber();
    formatTemplate(missingDocTemplates, "didntVerify", phoneNum, "OCC-C-TB");
});

$("#borrower-not-avail-btn-missing-docs").on("click", function() {
    var phoneNum = getMissingDocsNumber();
    formatTemplate(missingDocTemplates, "bwrNotAvail", phoneNum, "OCC-TB-UNV");
});

$("#system-vm-btn-missing-docs").on("click", function() {
    var phoneNum = getMissingDocsNumber();
    formatTemplate(missingDocTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#agent-vm-btn-missing-docs").on("click", function() {
    var phoneNum = getMissingDocsNumber();
    formatTemplate(missingDocTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** Wealth ****
//********************

var wealthTemplates = {
    "wealthSignComplete" : "Wealth signing reminder call. The investor will sign.",
    "wealthFundComplete" : "Wealth funding reminder call. The investor will set up funding.",
    "invNotAvail" : "Wealth call. The applicant was not available to speak.",
    "sysVM" : "Wealth call. No answer. System left VM.",
    "agentVM" : "Wealth call. No answer. I left VM."
};

//**** Get wealth phone number ****
function getWealthNumber() {
    return getPhoneNum($("#wealth-phone-number"));
}

$("#wealth-signing-complete-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "wealthSignComplete", phoneNum, "OCC-C-TB");
});

$("#signing-investor-not-avail-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "invNotAvail", phoneNum, "OCC-C-TB");
});

$("#signing-system-vm-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#signing-agent-vm-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

$("#wealth-funding-complete-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "wealthFundComplete", phoneNum, "OCC-C-VM");
});

$("#funding-investor-not-avail-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "invNotAvail", phoneNum, "OCC-C-TB");
});

$("#funding-system-vm-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#funding-agent-vm-btn").on("click", function() {
    var phoneNum = getWealthNumber();
    formatTemplate(wealthTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** Product Select ****
//********************

var productSelTemplates = {
    "prodSelCompForward" : "Product select call. Advised of open app. Bwr will move forward with app.",
    "prodSelCompWithdraw" : "Product select call. BWR not interested. Withdrew app.",
    "bwrNotAvail" : "Product select call. The applicant was not available to speak.",
    "sysVM" : "Product select call. No answer. System left VM.",
    "agentVM" : "Product select call. No answer. I left VM."
};

//**** Get wealth phone number ****
function getProdSelNumber() {
    return getPhoneNum($("#product-select-phone-number"));
}

$("#product-select-complete-mf-btn").on("click", function() {
    var phoneNum = getProdSelNumber();
    formatTemplate(productSelTemplates, "prodSelCompForward", phoneNum, "OCC-C-TB");
});

$("#product-select-complete-wa-btn").on("click", function() {
    var phoneNum = getProdSelNumber();
    formatTemplate(productSelTemplates, "prodSelCompWithdraw", phoneNum, "OCC-C-TB");
});

$("#borrower-not-avail-btn-prod-sel").on("click", function() {
    var phoneNum = getProdSelNumber();
    formatTemplate(productSelTemplates, "bwrNotAvail", phoneNum, "OCC-C-TB");
});

$("#system-vm-btn-prod-sel").on("click", function() {
    var phoneNum = getProdSelNumber();
    formatTemplate(productSelTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#agent-vm-btn-prod-sel").on("click", function() {
    var phoneNum = getProdSelNumber();
    formatTemplate(productSelTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** VOE ****
//********************

var voeTemplates = {
    "voeComplete" : "VOE call. Asked if they needed help with the VOE or if they had any questions. They will have their employer take care of it.",
    "bwrNotAvail" : "VOE call. The applicant was not available to speak.",
    "sysVM" : "VOE call. No answer. System left VM.",
    "agentVM" : "VOE call. No answer. I left VM."
};

//**** Get voe phone number ****
function getVoeNumber() {
    return getPhoneNum($("#voe-phone-number"));
}

$("#voe-complete-btn").on("click", function() {
    var phoneNum = getVoeNumber();
    formatTemplate(voeTemplates, "voeComplete", phoneNum, "OCC-C-TB");
});

$("#borrower-not-avail-btn-voe").on("click", function() {
     var phoneNum = getVoeNumber();
    formatTemplate(voeTemplates, "bwrNotAvail", phoneNum, "OCC-C-UNV");
});

$("#system-vm-btn-voe").on("click", function() {
     var phoneNum = getVoeNumber();
    formatTemplate(voeTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#agent-vm-btn-voe").on("click", function() {
     var phoneNum = getVoeNumber();
    formatTemplate(voeTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** MORTGAGE ****
//********************

var mortgageTemplates = {
    "mortgageComplete" : "Adv bwr about open mortgage app. Bwr wanting to continue. Adv of next step.",
    "mortgageWithdraw" : "Adv bwr about open mortgage app. Bwt not interested. Sent email to mortgage to have app withdrawn",
    "bwrNotAvail" : "Mortgage call. The applicant was not able to speak.",
    "sysVM" : "Mortgage call. No answer. System left VM.",
    "agentVM" : "Mortgage call. No answer. I left VM."
};

//**** Get mortgage phone number ****
function getMortgageNumber() {
    return getPhoneNum($("#mortgage-phone-number"));
}

$("#mortgage-complete-btn").on("click", function() {
    var phoneNum = getMortgageNumber();
    formatTemplate(mortgageTemplates, "mortgageComplete", phoneNum, "OCC-C-TB");
});

$("#mortgage-withdraw-btn").on("click", function() {
    var phoneNum = getMortgageNumber();
    formatTemplate(mortgageTemplates, "mortgageWithdraw", phoneNum, "OCC-C-TB");
});

$("#borrower-not-avail-btn-mortgage").on("click", function() {
    var phoneNum = getMortgageNumber();
    formatTemplate(mortgageTemplates, "bwrNotAvail", phoneNum, "OCC-C-UNV");
});

$("#system-vm-btn-mortgage").on("click", function() {
    var phoneNum = getMortgageNumber();
    formatTemplate(mortgageTemplates, "sysVM", phoneNum, "OCC-C-VM");
});

$("#agent-vm-btn-mortgage").on("click", function() {
    var phoneNum = getMortgageNumber();
    formatTemplate(mortgageTemplates, "agentVM", phoneNum, "OCC-C-VM");
});

//********************
//**** Custom Notes ****
//********************

$("#copy-btn-custom-notes").on('click', function() {
    var $phoneNum = $("#custom-phone-num").val();
    var $contactType = $("#contact-type-ddl-outbound option:selected").attr("value");
    var $contactPerson = $("#contact-person-ddl-outbound option:selected").attr("value");
    var $callNum = $("#call-number-ddl-outbound option:selected").attr("value");
    var $notes = $("#custom-extra-notes").val();
    
    var formattedNotes = $contactType + "-C-" + $callNum + "-" + $contactPerson + numCalled + $phoneNum + verifiedBwr + $notes;
    
    copyToClipboard(formattedNotes);
});


//**************************************************************************
//*********** CHAT PAGE ****************************************************
//**************************************************************************

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

//**** Chat Default ****
document.getElementById('left-chat-tab-btn').click();

var colors = {
    "starting" : "#FFF",
    "pompadour" : "#6C0063",
    "vivid-violet" : "#7F3F97",
    "vin-rouge" : "#943C62",
    "flirt" : "#B00093",
    "razzmatazz" : "#EE005D",
    "wild-strawberry" : "#FF4995",
    "heliotrope" : "#EE43FF",
    "hot-pink" : "#FF56B9",
    "mona-lisa" : "#FF9598",
    "indochine" : "#D07400",
    "amber" : "#FFBF00",
    "tree-poppy" : "#F59C1F",
    "golden-dream" : "#EEE537",
    "bordeaux" : "#610020",
    "guardsmen-red" : "#C30000",
    "burnt-sienna" : "#E85D46",
    "mine-shaft" : "#333333",
    "bright-gray" : "#3D4652",
    "trout" : "#515964",
    "emperor" : "#515151",
    "aluminium" : "#A6A8AB",
    "japanese-laurel" : "#00AA0B",
    "apple" : "#35C53E",
    "bright-green" : "#61EE00",
    "shamrock" : "#29D28B",
    "astronaut" : "#25286F",
    "pigment-indigo" : "#350097",
    "science-blue" : "#0044D9",
    "pacific-blue" : "#0098C0",
    "azure-radiance" : "#087CFF",
    "dodger-blue" : "#00B6FF",
    "robins-egg blue" : "#00C4CE",
    "turquise-blue" : "#55E3CF" 
    };

//**** Populate Color DDL ****

var tempColors = "";
$.each(colors, function(name, hex) {
        tempColors += "<option id='" + name + "' value='" + name + "' style='background-color:" + hex + ";'>" + "" + "</option>";
});
$(".color-picker-ddl").html(tempColors);

//**** Set BG of DDL after color chosen ***
$("#color-picker-left").change(function() {
    var currentColor = $(this).val();
    setDdlBgColor("left", currentColor);
});
$("#color-picker-middle").change(function() {
    var currentColor = $(this).val();
    setDdlBgColor("middle", currentColor);
});
$("#color-picker-right").change(function() {
    var currentColor = $(this).val();
    setDdlBgColor("right", currentColor);
});

//**** Sortable Chat buttons ***
$ (function () {
    $("#chat-tabs-wrapper").sortable({
        revert: true
    });
});

//**** Chat Show/Hide Why Not Textbox ****

$(".why-not-div").hide();
$(".tb-div-other").hide();

//**** Left S/H ****

var verifyYesLeft = $("input[type='checkbox'][id='verify-yes-left']");
var verifyNoLeft = $("input[type='checkbox'][id='verify-no-left']");
var generalQuestionLeft = $("input[type='checkbox'][id='general-question-cb-left']");
var otherLeft = $("input[type='checkbox'][id='other-cb-left']");

$(verifyYesLeft).change(function() {
    if($(this).is(":checked")) {
        $(verifyNoLeft).prop("checked", false);
        $(generalQuestionLeft).prop("checked", false);
        $(otherLeft).prop("checked", false);
        $("#tb-div-other-left").hide();
        $("#why-not-div-left").hide();
    } else {
        
    }
});

$(verifyNoLeft).change(function() {
    if($(this).is(":checked")) {
        $("#why-not-div-left").show();
        $(verifyYesLeft).prop("checked", false);
    } else {
       $("#why-not-div-left").hide(); 
    }
});

$(generalQuestionLeft).change(function() {
    if($(this).is(":checked")) {
        $("#tb-div-other-left").hide();
        $(otherLeft).prop("checked", false);
    } else {
        
    }
    
});

$(otherLeft).change(function() {
    if($(this).is(":checked")) {
        $("#tb-div-other-left").show();
        $(generalQuestionLeft).prop("checked", false);
    } else {
        $("#tb-div-other-left").hide();
    }
});

//**** Middle S/H ****

var verifyYesMiddle = $("input[type='checkbox'][id='verify-yes-middle']");
var verifyNoMiddle = $("input[type='checkbox'][id='verify-no-middle']");
var generalQuestionMiddle = $("input[type='checkbox'][id='general-question-cb-middle']");
var otherMiddle = $("input[type='checkbox'][id='other-cb-middle']");

$(verifyYesMiddle).change(function() {
    if($(this).is(":checked")) {
        $(verifyNoMiddle).prop("checked", false);
        $(generalQuestionMiddle).prop("checked", false);
        $(otherMiddle).prop("checked", false);
        $("#tb-div-other-middle").hide();
        $("#why-not-div-middle").hide();
    } else {
        
    }
});

$(verifyNoMiddle).change(function() {
    if($(this).is(":checked")) {
        $("#why-not-div-middle").show();
        $(verifyYesMiddle).prop("checked", false);
    } else {
       $("#why-not-div-middle").hide(); 
    }
});

$(generalQuestionMiddle).change(function() {
    if($(this).is(":checked")) {
        $("#tb-div-other-middle").hide();
        $(otherMiddle).prop("checked", false);
    } else {
        
    }
    
});

$(otherMiddle).change(function() {
    if($(this).is(":checked")) {
        $("#tb-div-other-middle").show();
        $(generalQuestionMiddle).prop("checked", false);
    } else {
        $("#tb-div-other-middle").hide();
    }
});

//**** Right S/H ****

var verifyYesRight = $("input[type='checkbox'][id='verify-yes-right']");
var verifyNoRight = $("input[type='checkbox'][id='verify-no-right']");
var generalQuestionRight = $("input[type='checkbox'][id='general-question-cb-right']");
var otherRight = $("input[type='checkbox'][id='other-cb-right']");

$(verifyYesRight).change(function() {
    if($(this).is(":checked")) {
        $(verifyNoRight).prop("checked", false);
        $(generalQuestionRight).prop("checked", false);
        $(otherRight).prop("checked", false);
        $("#tb-div-other-right").hide();
        $("#why-not-div-right").hide();
    } else {
        
    }
});

$(verifyNoRight).change(function() {
    if($(this).is(":checked")) {
        $("#why-not-div-right").show();
        $(verifyYesRight).prop("checked", false);
    } else {
       $("#why-not-div-right").hide(); 
    }
});

$(generalQuestionRight).change(function() {
    if($(this).is(":checked")) {
        $("#tb-div-other-right").hide();
        $(otherRight).prop("checked", false);
    } else {
        
    }
    
});

$(otherRight).change(function() {
    if($(this).is(":checked")) {
        $("#tb-div-other-right").show();
        $(generalQuestionRight).prop("checked", false);
    } else {
        $("#tb-div-other-right").hide();
    }
});

//**** Copy Notes Chat ****

$("#copy-btn-left").on("click", function() {
    formatChatNotes("left");
});

$("#copy-btn-middle").on("click", function() {
    formatChatNotes("middle");
});

$("#copy-btn-right").on("click", function() {
    formatChatNotes("right");
});

//**** Reset Chats ****

$("#reset-left").on("click", function() {
    resetChat("left");
});

$("#reset-middle").on("click", function() {
    resetChat("middle");
});

$("#reset-right").on("click", function() {
    resetChat("right");
});