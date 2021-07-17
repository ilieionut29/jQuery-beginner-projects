$(function () {
    let submitButton = $("#save-button");
    $(submitButton).click(takeInformation);

    let resetButton = $("#cancel-button");
    $(resetButton).click(resetData);

    $.validator.setDefaults({
        highlight: function (element) {
            $(element)
                .closest(".error-highlight")
                .addClass("error")
        },
        unhighlight: function(element) {
            $(element)
                .closest(".error-highlight")
                .removeClass("error")
        },
        errorPlacement: function (error, element) {
            if (element.prop("type") == "radio") {
                error.insertBefore(element.parent());
            } else if (element.prop("type") == "file") {
                error.insertBefore(element.parent());
            } else {
                error.insertBefore(element);
            }
        }
    });

    $.validator.addMethod("lenghtFirstName", function (value, element) {
        return value.length >= 3 && value.length <=30;
    }, "❌ - First name should be minimum 3 and maximum 30 characters!")

    $.validator.addMethod("lenghtLastName", function (value, element) {
        return value.length >= 5 && value.length <=30;
    }, "❌ - Last name should be minimum 5 and maximum 30 characters!")

    $.validator.addMethod("onlyLetters", function (value, element) {
        return value.match(/^[a-z]+$/);
    }, "❌ - Your name should contain only alpha characters!")

    $.validator.addMethod("over18", function (value, element) {
        let birthDay = new Date(value);
        let calcAge = (Date.now() - birthDay) / 31557600000;
        age = parseInt(calcAge);
        if (18 <= age && age <= 50)
        return age;
    }, "❌ - Minimum age is 18 and maximum age is 50!")

    $("#form-register").validate({
        rules: {
            firstName: {
                required: true,
                lenghtFirstName: true,
                onlyLetters: true
            },
            lastName: {
                required: true,
                lenghtLastName: true,
                onlyLetters: true
            },
            gender: {
                required: true
            },
            birthDate: {
                required: true,
                over18: true
            },
            roles: {
                required: true
            }
        },

        messages: {
            firstName: {
                required: "❌ - First name is required."
            },
            lastName: {
                required: "❌ - Last name is required."
            },
            gender: {
                required: "❌ - Gender is required."
            },
            birthDate: {
                required: "❌ - Birth date is required."
            },
            roles: {
                required: "❌ - Role is required."
            }
        }
    })

    function takeInformation() {
        if ($("#form-register").valid()) {
            if (imgRequired == true) {
                let firstName = $("#first-name");
                let lastName = $("#last-name");
                let gender = $(".gender");
                if (gender[0].checked) {
                    gender = "Male";
                } else if (gender[1].checked) {
                    gender = "Femeale"; 
                }
                let birthDate = $("#birth-date");
                let role = $("#role");
                let logEntry = {
                    firstName: firstName.val(),
                    lastName: lastName.val(),
                    gender: gender,
                    birthDate: birthDate.val(),
                    age: age,
                    role: role.val()
                };
                console.log(logEntry);
            } else {
                $(".upload-here").hide();
                $(".type").hide();
                $(".size").hide();
                $(".valid-upload").show();
                $(".uploader").addClass("error");
            }
        }
    }

    function resetData () {
        alert("⚠️ - By pressing cancel button you will reset all the data - ⚠️");
        $("form").validate().resetForm();
        imageLoader.val("");
        $("#imgPreview").hide();
        imgRequired = false;
        $(".uploader img").attr("src", "#");
        $(".upload-here").show();
        $(".drop-here").hide();
        $(".upload").hide();
        $(".type").hide();
        $(".size").hide();
        $(".valid-upload").hide();
        $(".uploader").removeClass("error");
        $(".uploader").removeClass("validImg");
        $(dropBox).removeClass("dragover");   
    }

    $(".drop").hide();
    $(".type").hide();
    $(".size").hide();
    $(".upload").hide();
    $(".valid-upload").hide();

    var clearButton = $("#clear-button");
    $(clearButton).click(function () {
        imageLoader.val("");
        $("#imgPreview").hide();
        imgRequired = false;
        $(".uploader img").attr("src", "#");
        $(".upload-here").show();
        $(".drop-here").hide();
        $(".upload").hide();
        $(".type").hide();
        $(".size").hide();
        $(".valid-upload").hide();
        $(".uploader").removeClass("error");
        $(".uploader").removeClass("validImg");
        $(dropBox).removeClass("dragover");
    })

    $(".uplaoder").click(function() {
        $("#filePhoto").click();
    })

    let dropBox = $(".uploader");
    $(dropBox).on("dragover dragenter", function () {
        $("#clear-button").click();
        $(".upload-here").hide();
        $(".drop").show();
    })
    $(dropBox).on("dragleave dragend drop", function () {
        $(".drop").hide();
        $(".upload-here").show();
    })

    let checker = 0;
    let imgRequired = false;
    let imageLoader = $("#filePhoto");
    $(imageLoader).change(handleImage);

    function imgValidate(file) {
        let test = $("#filePhoto");
        let validFile = file;
        let fileType = validFile["type"];
        let validImgTypes = ["image/png", "image/jpg", "image/jpeg", "image/bmp"];
        if ($.inArray(fileType, validImgTypes) >= 0) {
            if (validFile.size <= 51200) {
                $("#imgPreview").show();
                checker = 1;
                imgRequired = true;
            } else {
                checker = 2;}
        } else {
            checker = 3;
        } 
    }

    function handleImage(e) {
        imgValidate(e.target.files[0]);
        if (checker == 1 && imgRequired == true) {
            $(".upload-here").hide();
            $(dropBox).removeClass("dragover");
            $(".drop").hide();
            $(".type").hide();
            $(".size").hide();
            $(".valid-upload").hide();
            $(".uploader").addClass("validImg");
        }
        else if (checker == 2) {
            $(".upload-here").hide();
            $(".drop").hide();
            $(".type").hide();
            $(".size").show();
            $(".valid-upload").hide();
            $(".uploader").addClass("error");
            $(".uploader").removeClass("validImg");
            $("#imgPreview").hide();
        }
        else if (checker == 3) {
            $(".upload-here").hide();
            $(".drop").hide();
            $(".type").show();
            $(".size").hide();
            $(".valid-upload").hide();
            $(".uploader").addClass("error");
            $(".uploader").removeClass("validImg");
            $("#imgPreview").hide();
        } 
        var reader = new FileReader();
        reader.onload = function (event) {
            $(".uploader img").attr("src", event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
})