/* global $ */

//*********** Variables ***********
var phoneOnFile = $("input[type='checkbox'][id='phoneonfile-checkbox']");
var verifyPhone = $("input[type='checkbox'][id='verify-phone-checkbox']");
var verifyAddress = $("input[type='checkbox'][id='verify-address-checkbox']");
var verifyDOB = $("input[type='checkbox'][id='verify-dob-checkbox']");
var verifySSN = $("input[type='checkbox'][id='verify-ssn-checkbox']");
var colonSpace = ": ";
var periodSpace = ". ";
var hyphen = "-";

//*************************************
//********* Inbound Call Page *********
//*************************************

//*********** Variables ***********
var phoneOnFileInbound = $("input[type='checkbox'][id='phone-on-file-checkbox-inbound']");
var verifyPhoneInbound = $("input[type='checkbox'][id='verify-phone-checkbox-inbound']");
var verifyAddressInbound = $("input[type='checkbox'][id='verify-address-checkbox-inbound']");
var verifyDOBInbound = $("input[type='checkbox'][id='verify-dob-checkbox-inbound']");
var verifySSNInbound = $("input[type='checkbox'][id='verify-ssn-checkbox-inbound']");

//********* Inbound Format Paragraph Function *********
function makeParagraphForInbound() {
    
    var bwrVerified = "Verified BWR. ";
    var calledFrom = "Called from ";
    var paragraphToCopy = "";
    
    // Called from Number
    var calledFromNumber = $('#calledFromNumber').val();
    
    // Notes
    var notes = $("#notes-inbound").val();
    
    // Contact Type ex. ICC or IEV
    var contactTypeDdl = $('#contact-type-ddl').val();
    
    // Contact Medium
    var contactMediumDdl = "C";
    
    // Contact Person
    var contactPersonDdl = "TB";
    
    return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + calledFrom + calledFromNumber + periodSpace + notes;

}

//********* Inbound Copy To Clipboard Function *********
function copyToClipboardInbound() {
    
    // Copy prepared paragraph from makeParagraphForInbound func
    var finalParagraph = makeParagraphForInbound();
    // Get hidden text area 
    var copyToTextarea = document.getElementById("formated-copy-textarea-inbound");
    // Clear textarea
    $(copyToTextarea).val('');
    // Add prepared paragraph to text area
    copyToTextarea.value += finalParagraph;
    // Select text area
    copyToTextarea.select();
    
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

//********* Inbound Clear Form Function *********
function clearInboundForm() {
    $('.clear-form-inbound').val('');
    $('.verify-checkbox-input-inbound').prop('checked', false);
    $(verifyPhoneInbound).parent().removeClass('checkbox-checked-bg');
    $(verifyAddressInbound).parent().removeClass('checkbox-checked-bg');
    $(verifyDOBInbound).parent().removeClass('checkbox-checked-bg');
    $(verifySSNInbound).parent().removeClass('checkbox-checked-bg');
    $('.ddl-inbound').prop('selectedIndex', 0);
    resetSnackbar();
}

//********* Inbound Change Check Box Background Functions *********
phoneOnFileInbound.on('change', function(){
    verifyPhoneInbound.prop('checked',this.checked);
    if($(this).is(":checked")){
        $(verifyPhoneInbound).parent().addClass('checkbox-checked-bg');
    }else {
        $(verifyPhoneInbound).parent().removeClass('checkbox-checked-bg');
    }
});
verifyPhoneInbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifyAddressInbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifyDOBInbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifySSNInbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});

//*************************************
//********* Outbound Call Page *********
//*************************************

//*********** Variables ***********
var verifyAddressOutbound = $("input[type='checkbox'][id='verify-address-checkbox-outbound']");
var verifyDOBOutbound = $("input[type='checkbox'][id='verify-dob-checkbox-outbound']");
var verifySSNOutbound = $("input[type='checkbox'][id='verify-ssn-checkbox-outbound']");
var verifyYes = $("input[type='checkbox'][id='verify-yes']");
var verifyNo = $("input[type='checkbox'][id='verify-no']");

var numberCalled = "Number called: ";

//********* Outbound Format Paragraph Function *********
function makeParagraphForOutbound() {
    
    var bwrVerified = "Verified BWR. ";
    var paragraphToCopy = "";
    
    // Notes
    var notes = $("#notes-outbound").val();
    
    // Number called
    var numberCalledOutbound = $('#number-called-outbound').val();
    
    // Contact Type ex. ODR, OCC, etc.
    var contactTypeDdl = $('#contact-type-ddl-outbound').val();
    
    // Contact Medium
    var contactMediumDdl = "C";
    
    // Contact Person
    var contactPersonDdl = $('#contact-person-ddl-outbound').val();
    
    // Contact Number
    var contactNumberDdl = $("#call-number-ddl-outbound").val();
    
    if (contactNumberDdl == "1") {
        return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactNumberDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + numberCalled + numberCalledOutbound + periodSpace + notes;
    }
    else if (contactNumberDdl == "2") {
        return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactNumberDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + numberCalled + numberCalledOutbound + periodSpace + notes;
    }
    else if (contactNumberDdl == "3") {
        return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactNumberDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + numberCalled + numberCalledOutbound + periodSpace + notes;   
    }
    else /* Not a call */ {
        return "OMG AN ERROR OCCURRED!!!";
    }
}


//********* Outbound Copy To Clipboard Function *********
function copyToClipboardOutbound() {
    
    // Copy prepared paragraph from makeParagraphForInbound func
    var finalParagraph = makeParagraphForOutbound();
    // Get hidden text area 
    var copyToTextarea = document.getElementById("formated-copy-textarea-outbound");
    // Clear textarea
    $(copyToTextarea).val('');
    // Add prepared paragraph to text area
    copyToTextarea.value += finalParagraph;
    // Select text area
    copyToTextarea.select();
    
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

//********* Outbound Change Check Box Background Functions *********
verifyAddressOutbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifyDOBOutbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifySSNOutbound.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifyNo.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});
verifyYes.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});
//******* Outbound Show/Hide ACH Amount Function **********

$('#extra-ach-amount-container').hide();
var extraAchYes = $("input[type='checkbox'][id='extra-ach-yes']");
extraAchYes.change(function () {
    if($(this).is(":checked")) {
        $('#extra-ach-amount-container').show();
    } else {
        $('#extra-ach-amount-container').hide();
    }
});


//******* Outbound Templates Function **********

function chooseTemplate(category, template) {
    
    var templateOcc = 'OCC';
    var templateOdr = 'ODR';
    var templateOsd = 'OSD';
    var templateCall = 'C';
    var templateTb = 'TB';
    var templateVm = 'VM';
    var templateUnv = 'UNV';
    var switchCategory = category;
    var switchTemplate = template;
    // Number called
    var numberCalledOutbound = $('#number-called-outbound').val();
    
    var finalTemplate = '';
    var completedTemplate = '';
    var extraAch = " Confirmed extra ACH amount: ";
    var extraAchAmount = $('#extra-ach-amount').val();
    
    switch (switchCategory) {
        case "prefund":
            
            switch (switchTemplate) {
                case 'complete':
                    if (extraAchAmount != '') {
                        finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Pre-funding. Verified Bwr. Explained benefits. Confirmed auto-pay. " + extraAch + "$" + extraAchAmount + periodSpace + "Confirmed timeline for funding. ";
                    } else {
                        finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Pre-funding. Verified Bwr. Explained benefits. Confirmed auto-pay.  Confirmed timeline for funding. ";
                    }
                    
                    break;
                case 'not-avail':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateUnv + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Pre-funding. The applicant not available to speak.";
                    break;
                case 'sys-vm':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Pre-funding. No answer. System left VM.";
                    break;
                case 'agent-vm':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Pre-funding. No answer. I left VM.";
                    break;
                
                default:
                    alert("NO CASE HIT, ERROR!!!")
            }
            break;
        case 'signing':
           
            switch (switchTemplate) {
                case 'complete':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Verified Bwr. Signing reminder call. Asked if there were questions or concerns about signing. The applicant will sign.";
                    break;
                case 'thinking':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Verified Bwr. Signing reminder call. Asked if there were questions or concerns about signing. The applicant is still thinking.";
                    break;
                case 'no-verify':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateUnv + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Signing reminder call. The applicant did not verify.";
                    break;
                case 'not-avail':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateUnv + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Signing reminder call. The applicant was not available to speak.";
                    break;
                case 'sys-vm':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Signing reminder call. System left VM.";
                    break;
                case 'agent-vm':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Signing reminder call. I left VM.";
                    break;
                
                default:
                    alert("NO CASE HIT, ERROR!!!")
            }
            break;
        case 'miss-doc':
         
            switch (switchTemplate) {
                case 'complete':
                    finalTemplate = templateOdr + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Verified Bwr. Missing docs call. Asked if they needed help uploading docs or if they had any questions. They will upload docs soon.";
                    break;
                case 'no-verify':
                    finalTemplate = templateOdr + hyphen + templateCall + hyphen + templateUnv + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Missing docs call. The applicant did not verify.";
                    break;
                case 'not-avail':
                    finalTemplate = templateOdr + hyphen + templateCall + hyphen + templateUnv + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Missing docs call. The applicant was not available to speak.";
                    break;
                case 'sys-vm':
                    finalTemplate = templateOdr + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Missing docs call. System left VM.";
                    break;
                case 'agent-vm':
                    finalTemplate = templateOdr + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Missing docs call. Agent left VM.";
                    break;
                
                default:
                    alert("NO CASE HIT, ERROR!!!");
            }
            break;
        case 'wealth':
            
            switch (switchTemplate) {
                case 'sign-complete':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Verified BWR. Wealth signing reminder call. The investor will sign.";
                    break;
                case 'sign-sys-vm':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Wealth signing reminder call. System Left VM.";
                    break;
                case 'sign-agent-vm':
                    finalTemplate = templateOsd + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Wealth signing reminder call. Agent Left VM.";
                    break;
                case 'fund-complete':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Verified BWR. Wealth funding reminder call. The investor will set up funding.";
                    break;
                case 'fund-sys-vm':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Wealth funding reminder call. System Left VM.";
                    break;
                case 'fund-agent-vm':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Wealth funding reminder call. Agent Left VM.";
                    break;
                
                default:
                    alert("NO CASE HIT, ERROR!!!");
            }
            break;
        case 'product':
            
            switch (switchTemplate) {
                case 'complete-forward':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Verified BWR. Product select. Advised of open app. Bwr will move forward with app.";
                    break;
                case 'complete-withdraw':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateTb + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Not Verified. Product select. BWR not interested. BWR hung up. Withdrew app.";
                    break;
                case 'not-avail':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateUnv + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Product select. The applicant was not available to speak.";
                    break;
                case 'sys-vm':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Product select. No answer. System left VM.";
                    break;
                case 'agent-vm':
                    finalTemplate = templateOcc + hyphen + templateCall + hyphen + templateVm + colonSpace + numberCalled + numberCalledOutbound + periodSpace + "Product select. No answer. Agent left VM.";
                    break;
                
                default:
                    alert("NO CASE HIT, ERROR!!!");
            }
            break;
        
        default:
            alert("NO CASE HIT, ERROR!!!");
    }
     
    completedTemplate = finalTemplate;
    
        
    // Get hidden text area 
    var copyToTextarea = document.getElementById("formated-copy-textarea-outbound");
    // Clear textarea
    $(copyToTextarea).val('');
    // Add prepared paragraph to text area
    copyToTextarea.value += completedTemplate;
    // Select text area
    copyToTextarea.select();
    
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

//******* Outbound Clear Form Function**********

function clearOutboundForm() {
    // Clear all areas
    $('.clear-form-outbound').val('');
    $('.outbound-checkbox-input').prop('checked', false);
    $(verifyYes).parent().addClass('checkbox-checked-bg');
    $(verifyNo).parent().addClass('checkbox-checked-bg');
    $('#extra-ach-amount-container').hide();
    var rmAcc = document.getElementsByClassName('accordion');
    var i;
    
    // for (i = 0; i < rmAcc.length; i++) {
    //     if ($('.accordion').classList.hasClass('active')) {
    //         $('.accordion').classList.removeClass('active');
    //         if ($('.accordion').nextElementSibling.classList.hasClass('acc-panel')) {
    //             $('.accordion').nextElementSibling.classList.remove('acc-panel');
    //         }
            
    //     }
    // }
    
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
    function prefund_close_accordion_section() {
        $('.prefund-accordion .prefund-accordion-section-title').removeClass('active');
        $('.prefund-accordion .prefund-accordion-section-content').slideUp(300).removeClass('open');
    }
    close_accordion_section();
    prefund_close_accordion_section();
    $('.ddl-outbound').prop('selectedIndex', 0);
    resetSnackbar();
}





//*************************************
//********* Chat Page *********
//*************************************


var verifyYesLeft = $("input[type='checkbox'][id='verify-yes-left']");
var verifyNoLeft = $("input[type='checkbox'][id='verify-no-left']");

var verifyYesMiddle = $("input[type='checkbox'][id='verify-yes-middle']");
var verifyNoMiddle = $("input[type='checkbox'][id='verify-no-middle']");

var verifyYesRight = $("input[type='checkbox'][id='verify-yes-right']");
var verifyNoRight = $("input[type='checkbox'][id='verify-no-right']");

verifyNoLeft.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});
verifyYesLeft.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});

verifyNoMiddle.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});
verifyYesMiddle.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});

verifyNoRight.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});
verifyYesRight.change(function(){
    if($(this).is(":checked")){
        $(this).parent().removeClass('checkbox-checked-bg');
    }else {
        $(this).parent().addClass('checkbox-checked-bg');
    }
});
//*****************************************
//******* Left CHAT COLOR CHANGE ************
//*****************************************


// Creates new style and adds rule variable then appends it to the body
function injectStyles(rule, chat) {
    var div = $("<div />", {
        id: 'added-color-' + chat,
        html: '&shy;<style>' + rule + '</style>'
    }).appendTo("body");
}

var leftSelectDdl = document.getElementById('left-color-picker');
leftSelectDdl.onchange = function() {
    $('#added-color-left').remove();
    var colorChoice = $('#left-color-picker').val();
    var rgbColorChoice;
    switch (colorChoice) {
        case "hot-pink":
            leftSelectDdl.className = 'hot-pink';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "apple":
            leftSelectDdl.className = 'apple';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "wild-strawberry":
            leftSelectDdl.className = 'wild-strawberry';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "japanese-laurel":
            leftSelectDdl.className = 'japanese-laurel';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "mona-lisa":
            leftSelectDdl.className = 'mona-lisa';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "pompadour":
            leftSelectDdl.className = 'pompadour';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "shamrock":
            leftSelectDdl.className = 'shamrock';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "aluminium":
            leftSelectDdl.className = 'aluminium';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "burnt-sienna":
            leftSelectDdl.className = 'burnt-sienna';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "vivid-violet":
            leftSelectDdl.className = 'vivid-violet';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "guardsman-red":
            leftSelectDdl.className = 'guardsman-red';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "astronaut":
            leftSelectDdl.className = 'astronaut';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "robins-egg-blue":
            leftSelectDdl.className = 'robins-egg-blue';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "indochine":
            leftSelectDdl.className = 'indochine';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "science-blue":
            leftSelectDdl.className = 'science-blue';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "tree-poppy":
            leftSelectDdl.className = 'tree-poppy';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "turquoise-blue":
            leftSelectDdl.className = 'turquoise-blue';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "pigment-indigo":
            leftSelectDdl.className = 'pigment-indigo';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "heliotrope":
            leftSelectDdl.className = 'heliotrope';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "amber":
            leftSelectDdl.className = 'amber';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "vin-rouge":
            leftSelectDdl.className = 'vin-rouge';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "bright-grey":
            leftSelectDdl.className = 'bright-grey';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "azure-radiance":
            leftSelectDdl.className = 'azure-radiance';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "bordeaux":
            leftSelectDdl.className = 'bordeaux';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "pacific-blue":
            leftSelectDdl.className = 'pacific-blue';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "flirt":
            leftSelectDdl.className = 'flirt';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "trout":
            leftSelectDdl.className = 'trout';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "dodger-blue":
            leftSelectDdl.className = 'dodger-blue';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "golden-dream":
            leftSelectDdl.className = 'golden-dream';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "mine-shaft":
            leftSelectDdl.className = 'mine-shaft';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "razzmatazz":
            leftSelectDdl.className = 'razzmatazz';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        case "emperor":
            leftSelectDdl.className = 'emperor';
            rgbColorChoice = $('#left-color-picker').css("background-color");
            injectStyles('#left-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'left');
            break;
        
        default:
            alert("OH GOD NOT THIS!!!!");
    }
};

//*****************************************
//******* MID CHAT COLOR CHANGE ************
//*****************************************

var middleSelectDdl = document.getElementById('middle-color-picker');
middleSelectDdl.onchange = function() {
    $('#added-color-middle').remove();
    var colorChoice = $('#middle-color-picker').val();
    var rgbColorChoice;
    switch (colorChoice) {
        case "hot-pink":
            middleSelectDdl.className = 'hot-pink';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "apple":
            middleSelectDdl.className = 'apple';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "wild-strawberry":
            middleSelectDdl.className = 'wild-strawberry';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "japanese-laurel":
            middleSelectDdl.className = 'japanese-laurel';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "mona-lisa":
            middleSelectDdl.className = 'mona-lisa';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "pompadour":
            middleSelectDdl.className = 'pompadour';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "shamrock":
            middleSelectDdl.className = 'shamrock';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "aluminium":
            middleSelectDdl.className = 'aluminium';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "burnt-sienna":
            middleSelectDdl.className = 'burnt-sienna';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "vivid-violet":
            middleSelectDdl.className = 'vivid-violet';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "guardsman-red":
            middleSelectDdl.className = 'guardsman-red';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "astronaut":
            middleSelectDdl.className = 'astronaut';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "robins-egg-blue":
            middleSelectDdl.className = 'robins-egg-blue';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "indochine":
            middleSelectDdl.className = 'indochine';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "science-blue":
            middleSelectDdl.className = 'science-blue';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "tree-poppy":
            middleSelectDdl.className = 'tree-poppy';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "turquoise-blue":
            middleSelectDdl.className = 'turquoise-blue';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "pigment-indigo":
            middleSelectDdl.className = 'pigment-indigo';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "heliotrope":
            middleSelectDdl.className = 'heliotrope';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "amber":
            middleSelectDdl.className = 'amber';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "vin-rouge":
            middleSelectDdl.className = 'vin-rouge';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "bright-grey":
            middleSelectDdl.className = 'bright-grey';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "azure-radiance":
            middleSelectDdl.className = 'azure-radiance';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "bordeaux":
            middleSelectDdl.className = 'bordeaux';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "pacific-blue":
            middleSelectDdl.className = 'pacific-blue';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "flirt":
            middleSelectDdl.className = 'flirt';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "trout":
            middleSelectDdl.className = 'trout';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "dodger-blue":
            middleSelectDdl.className = 'dodger-blue';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "golden-dream":
            middleSelectDdl.className = 'golden-dream';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "mine-shaft":
            middleSelectDdl.className = 'mine-shaft';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "razzmatazz":
            middleSelectDdl.className = 'razzmatazz';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        case "emperor":
            middleSelectDdl.className = 'emperor';
            rgbColorChoice = $('#middle-color-picker').css("background-color");
            injectStyles('#middle-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'middle');
            break;
        
        default:
            alert("OH GOD NOT THIS!!!!");
    }
};

//*****************************************
//******* RIGHT CHAT COLOR CHANGE ************
//*****************************************

var rightSelectDdl = document.getElementById('right-color-picker');
rightSelectDdl.onchange = function() {
    var colorChoice = $('#right-color-picker').val();
    $('#added-color-right').remove();
    var rgbColorChoice;
    switch (colorChoice) {
        case "hot-pink":
            rightSelectDdl.className = 'hot-pink';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "apple":
            rightSelectDdl.className = 'apple';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "wild-strawberry":
            rightSelectDdl.className = 'wild-strawberry';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "japanese-laurel":
            rightSelectDdl.className = 'japanese-laurel';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "mona-lisa":
            rightSelectDdl.className = 'mona-lisa';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "pompadour":
            rightSelectDdl.className = 'pompadour';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "shamrock":
            rightSelectDdl.className = 'shamrock';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "aluminium":
            rightSelectDdl.className = 'aluminium';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "burnt-sienna":
            rightSelectDdl.className = 'burnt-sienna';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "vivid-violet":
            rightSelectDdl.className = 'vivid-violet';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "guardsman-red":
            rightSelectDdl.className = 'guardsman-red';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "astronaut":
            rightSelectDdl.className = 'astronaut';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "robins-egg-blue":
            rightSelectDdl.className = 'robins-egg-blue';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "indochine":
            rightSelectDdl.className = 'indochine';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "science-blue":
            rightSelectDdl.className = 'science-blue';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "tree-poppy":
            rightSelectDdl.className = 'tree-poppy';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "turquoise-blue":
            rightSelectDdl.className = 'turquoise-blue';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "pigment-indigo":
            rightSelectDdl.className = 'pigment-indigo';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "heliotrope":
            rightSelectDdl.className = 'heliotrope';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "amber":
            rightSelectDdl.className = 'amber';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "vin-rouge":
            rightSelectDdl.className = 'vin-rouge';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "bright-grey":
            rightSelectDdl.className = 'bright-grey';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "azure-radiance":
            rightSelectDdl.className = 'azure-radiance';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "bordeaux":
            rightSelectDdl.className = 'bordeaux';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "pacific-blue":
            rightSelectDdl.className = 'pacific-blue';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "flirt":
            rightSelectDdl.className = 'flirt';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "trout":
            rightSelectDdl.className = 'trout';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "dodger-blue":
            rightSelectDdl.className = 'dodger-blue';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "golden-dream":
            rightSelectDdl.className = 'golden-dream';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "mine-shaft":
            rightSelectDdl.className = 'mine-shaft';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "razzmatazz":
            rightSelectDdl.className = 'razzmatazz';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        case "emperor":
            rightSelectDdl.className = 'emperor';
            rgbColorChoice = $('#right-color-picker').css("background-color");
            injectStyles('#right-chat-color-bar { background-color: ' + rgbColorChoice + ' !important; }', 'right');
            break;
        
        default:
            alert("OH GOD NOT THIS!!!!");
    }
};


function makeParagraphForChat(chat) {
    
    
    
    var hyphen = "-";
    var bwrVerified;
    var colonSpace = ": ";
    var paragraphToCopy = "";

    // Notes
    var notes = $('#notes-chat-' + chat).val();
    
    // Contact Type ex. ODR, ICC, etc.
    var contactTypeDdl = 'ICC';
    
    // Contact Medium
    var contactMediumDdl = 'SC';
    
    // Contact Person
    var contactPersonDdl = 'TB';
    if ($("input[type='checkbox'][id='verify-yes-" + chat + "']").prop('checked')) {
        bwrVerified = "Verified BWR. ";
    } else {
        bwrVerified = "Not verified. ";
    }
    
    return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + notes;
}

function copyToClipboardChat(chat) {
    
    // Copy prepared paragraph from makeParagraphForChat func
    var finalParagraph = makeParagraphForChat(chat);
    // Get hidden text area 
    var copyToTextarea = document.getElementById("formated-copy-textarea-chat-" + chat);
    // Clear textarea
    $(copyToTextarea).val('');
    // Add prepared paragraph to text area
    copyToTextarea.value += finalParagraph;
    // Select text area
    copyToTextarea.select();
    
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

function clearChatForm(chat) {
    // Clear notes area
    $('#formated-copy-textarea-chat-' + chat).val('');
    // Clear name box
    $('.clear-form-chat-' + chat).val('');
    // Uncheck Yes and No checkboxes based on which reset button is pressed
    $("input[type='checkbox'][id='verify-yes-" + chat + "']").prop('checked', false);
    $("input[type='checkbox'][id='verify-no-" + chat + "']").prop('checked', false);
    $("input[type='checkbox'][id='verify-yes-" + chat + "']").parent().addClass('checkbox-checked-bg');
    $("input[type='checkbox'][id='verify-no-" + chat + "']").parent().addClass('checkbox-checked-bg');
    $('#' + chat +'-color-picker').prop('selectedIndex', 0);
    $('#' + chat +'-color-picker').removeClass();
    $('#added-color-' + chat).remove();
    $('#notes-chat-' + chat).val('');
    resetSnackbar();
}

//*************************************
//********* Left Chat Page *********
//*************************************

//********* Left Format Paragraph Function *********
function makeParagraphForLeftChat() {
    
    
    
    var hyphen = "-";
    var bwrVerified = "Verified BWR. ";
    var colonSpace = ": ";
    var periodSpace = ". ";
    var paragraphToCopy = "";
    
    // Notes
    var notes = $("#notes-chat-left").val();
    
    // Contact Type ex. ODR, ICC, etc.
    var contactTypeDdl = 'ICC';
    
    // Contact Medium
    var contactMediumDdl = 'SC';
    
    // Contact Person
    var contactPersonDdl = 'TB';
    
    return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + periodSpace + notes;
}

//*************************************
//********* Middle Chat Page *********
//*************************************


//********* Middle Format Paragraph Function *********
function makeParagraphForMidChat() {
    
    
    
    var hyphen = "-";
    var bwrVerified = "Verified BWR. ";
    var colonSpace = ": ";
    var periodSpace = ". ";
    var paragraphToCopy = "";
    
    // Notes
    var notes = $("#notes-chat-middle").val();
    
    // Contact Type ex. ODR, ICC, etc.
    var contactTypeDdl = 'ICC';
    
    // Contact Medium
    var contactMediumDdl = 'SC';
    
    // Contact Person
    var contactPersonDdl = 'TB';
    
    return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + periodSpace + notes;
}


//*************************************
//********* Right Chat Page *********
//*************************************


//********* Right Format Paragraph Function *********
function makeParagraphForRightChat() {
    
    
    
    var hyphen = "-";
    var bwrVerified = "Verified BWR. ";
    var colonSpace = ": ";
    var periodSpace = ". ";
    var paragraphToCopy = "";
    
    // Notes
    var notes = $("#notes-chat-right").val();
    
    // Contact Type ex. ODR, ICC, etc.
    var contactTypeDdl = 'ICC';
    
    // Contact Medium
    var contactMediumDdl = 'SC';
    
    // Contact Person
    var contactPersonDdl = 'TB';
    
    return paragraphToCopy = contactTypeDdl + hyphen + contactMediumDdl + hyphen + contactPersonDdl + colonSpace + bwrVerified + periodSpace + notes;
}

//********* Copy To Clipboard Function *********
function copyToClipboard() {
    
    // Copy prepared paragraph from makeParagraphForInbound func
    var finalParagraph = makeParagraphForInbound();
    // Get hidden text area 
    var copyToTextarea = document.getElementById("formated-copy-textarea");
    // Clear textarea
    $(copyToTextarea).val('');
    // Add prepared paragraph to text area
    copyToTextarea.value += finalParagraph;
    // Select text area
    copyToTextarea.select();
    
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

//********* Clear Form Function *********
function clearForm() {
    // Clear all areas
    $('.clear-form').val('');
    $('.verify-checkbox-input').prop('checked', false);
    $(verifyPhone).parent().removeClass('checkbox-checked-bg');
    $(verifyAddress).parent().removeClass('checkbox-checked-bg');
    $(verifyDOB).parent().removeClass('checkbox-checked-bg');
    $(verifySSN).parent().removeClass('checkbox-checked-bg');
    $('.ddl').prop('selectedIndex', 0);
    resetSnackbar();
}

//********* Clear All Forms Function *********
function clearAllForms() {
    clearChatForm('left');
    clearChatForm('middle');
    clearChatForm('right');
    clearOutboundForm();
    clearInboundForm();
}

//********* Change Check Box Background Functions *********
phoneOnFile.on('change', function(){
    verifyPhone.prop('checked',this.checked);
    if($(this).is(":checked")){
        $(verifyPhone).parent().addClass('checkbox-checked-bg');
    }else {
        $(verifyPhone).parent().removeClass('checkbox-checked-bg');
    }
});
verifyPhone.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifyAddress.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifyDOB.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});
verifySSN.change(function(){
    if($(this).is(":checked")){
        $(this).parent().addClass('checkbox-checked-bg');
    }else {
        $(this).parent().removeClass('checkbox-checked-bg');
    }
});

//********* Snackbar Functions *********
function copySnackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("copy-snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
}

function resetSnackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("reset-snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 2.5 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
}


//********* Main Page Tabs Function *********

function openContactType(evt, contactType) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="contact-type-tabcontent" and hide them
    tabcontent = document.getElementsByClassName("contact-type-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="contact-type-tabcontent" and remove the class "active"
    tablinks = document.getElementsByClassName("main-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(contactType).style.display = "block";
    evt.currentTarget.className += " active";
}

//********* Chats Tabs Functions *********

function openChat(evt, chatLocation) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="chat-tabcontent" and hide them
    tabcontent = document.getElementsByClassName("chat-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="chat-tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("chat-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(chatLocation).style.display = "block";
    evt.currentTarget.className += " active";
}

//********* Inbound Default *********
document.getElementById('default-tab').click();

//********* Chat Default *********
document.getElementById('left-chat-tab').click();


$(document).ready(function() {
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
 
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    });
});

$(document).ready(function() {
    function prefund_close_accordion_section() {
        $('.prefund-accordion .prefund-accordion-section-title').removeClass('active');
        $('.prefund-accordion .prefund-accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.prefund-accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
 
        if($(e.target).is('.active')) {
            prefund_close_accordion_section();
        }else {
            prefund_close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.prefund-accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    });
});