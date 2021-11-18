/*jslint unparam: true */
/*global window, $ */
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var uploadHandler = '/typo3conf/ext/t3s_jobs/Resources/Public/upload/server/php/';
    var dataType = 'json'
    var maxFileSize = 5000000;
    var acceptedFileTypes = /(\.|\/)(pdf)$/i;
    function handleXhrResponse(xhr, inputIndex) {
        var errorMsg = "";
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                var responseText = xhr.responseText;
                var jsonValidated = false;
                if (responseText.indexOf('{') === 0 && responseText.lastIndexOf('}') === responseText.length - 1) {
                    try {
                        var data = JSON.parse(responseText);
                        jsonValidated = true;
                    } catch (e) {
                    }
                    if (jsonValidated) {
                        $.each(data.files, function (index, file) {
                            $('#files-' + inputIndex).text(file.name);
                            $('#file-hidden-' + inputIndex).val(file.url);
                        });
                    }
                }
                if (!jsonValidated) {
                    errorMsg = "ERROR: The server response was not JSON.";
                }
            } else {
                errorMsg = "ERROR: The server encountered an error.";
            }
        } else {
            errorMsg = "ERROR: The server encountered an error.";
        }
        if (errorMsg.length) {
            console.log(errorMsg);
            $('#files-' + inputIndex).html('<span style="color:red;">' + errorMsg + '<br />Please try the upload again.</span>');
        }
    }

    $('#file1').fileupload({
        url: uploadHandler,
        dataType: dataType,
        maxFileSize: maxFileSize,
        acceptFileTypes: acceptedFileTypes,
        complete: function(xhr) {
            handleXhrResponse(xhr, 1);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-1 .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $('#file2').fileupload({
        url: uploadHandler,
        dataType: dataType,
        maxFileSize: maxFileSize,
        acceptFileTypes: acceptedFileTypes,
        complete: function(xhr) {
            handleXhrResponse(xhr, 2);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-2 .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $('#file3').fileupload({
        url: uploadHandler,
        dataType: dataType,
        maxFileSize: maxFileSize,
        acceptFileTypes: acceptedFileTypes,
        complete: function(xhr) {
            handleXhrResponse(xhr, 3);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-3 .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $('#file4').fileupload({
        url: uploadHandler,
        dataType: dataType,
        maxFileSize: maxFileSize,
        acceptFileTypes: acceptedFileTypes,
        complete: function(xhr) {
            handleXhrResponse(xhr, 4);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-4 .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $('#file5').fileupload({
        url: uploadHandler,
        dataType: dataType,
        maxFileSize: maxFileSize,
        acceptFileTypes: acceptedFileTypes,
        complete: function(xhr) {
            handleXhrResponse(xhr, 5);
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-5 .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');

});

// Opens the hidden application form
$('#applicationButton').click(function(){
    $('#applicationForm').toggleClass("hidden");
    return false;
});

// validates the user data before submit
$( "#applicationForm").submit(function( event ) {
    $("input.required").each(function() {
        checkInput(this);
    });
    $("select.required").each(function() {
        checkSelect(this);
    });
    $("input[type='checkbox'].required").each(function() {
        checkBox(this);
    });
   
    $('#error-message').html(' ');
    if($('input').hasClass('error')){
        $('#error-message').html('Please fill all red marked fields.');
        event.preventDefault();
    }
});

function checkInput(field){
    if($(field).val()==""){
        $(field).addClass("error");
        $(field).removeClass("okay");
    } else {
        $(field).addClass("okay");
        $(field).removeClass("error");
    }        
}
function checkSelect(field){
    if($(field).val()==0){
        $(field).addClass("error");
        $(field).removeClass("okay");
    } else {
        $(field).addClass("okay");
        $(field).removeClass("error");
    }        
}
function checkBox(field){
    if($(field).prop("checked")){
        $(field).addClass("okay");
        $(field).removeClass("error");
    } else {
        $(field).addClass("error");
        $(field).removeClass("okay");
    }        
}
