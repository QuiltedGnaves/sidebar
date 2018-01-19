/* global $ */

var phoneOnFile = $("input[type='checkbox'][id='phoneonfile-checkbox']");
var verifyPhone = $("input[type='checkbox'][id='verify-phone-checkbox']");
var verifyAddress = $("input[type='checkbox'][id='verify-address-checkbox']");
var verifyDOB = $("input[type='checkbox'][id='verify-dob-checkbox']");
var verifySSN = $("input[type='checkbox'][id='verify-ssn-checkbox']");

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

