$(document).ready(function () {
  var openEditor = 0;
  $(window).focus(function () {
    if (openEditor == 1) {
      var newSrc = localStorage.getItem("imgSource");
      var newImage = $(".active");
      var imageSrc = newImage.children().eq(1);
      imageSrc.attr("src", newSrc);
    }
  });

  $(document)
    .on("mouseenter", "img", function () {
      $(".edit-text").addClass("on");
    })
    .on("mouseleave", "img", function () {
      $(".edit-text").removeClass("on");
    });

  $("#upload-file").change(function (e) {
    openEditor = 0;
    var imageFile = e.target.files[0];
    var image = $("<div></div>").addClass("image");
    var imgReader = new FileReader();
    if (imageFile.type.match("image")) {
      var img = document.createElement("img");
      var removeButton = $(
        "<div>♻️ &nbsp; REMOVE CURRENT IMAGE &nbsp; ♻️ </div>"
      ).addClass("remove-button");
      img.classList.add("image-selected");
      img.classList.add("responsive850");
      img.classList.add("responsive550");
      imgReader.onload = function () {
        img.src = imgReader.result;
        $(".images-slider").append(image);
        image.append(removeButton);
        image.append(img);
        $(".image").removeClass("active");
        image.addClass("active");
      };
      imgReader.readAsDataURL(imageFile);
    }
    if ($(".images-slider").children().length > 0) {
      $(".arrow").removeClass("off");
    }
    $(".intro-text").addClass("off");
    $(".intro-text").removeClass("on");
    $("#upload-file").val("");
    $(".slider-box").removeClass("off");
  });

  $(document).on("click", ".remove-button", function (event) {
    $(event.target).parent().remove();
    // FIX ERROR //
    $(".right").trigger("click");
    // --------------- //
    if ($(".images-slider").children().length == 0) {
      $(".intro-text").addClass("on");
      $(".intro-text").removeClass("off");
    }
    if ($(".images-slider").children().length == 1) {
      $(".arrow").addClass("off");
    }
  });

  $(document).on("click", ".left", function () {
    var currentImage = $(".image.active");
    var previousImage = currentImage.prev();
    currentImage.removeClass("active");
    previousImage.addClass("active");
    if (previousImage.length === 0) {
      $(".image").last().addClass("active");
    }
  });

  $(document).on("click", ".right", function () {
    var currentImage = $(".image.active");
    var nextImage = currentImage.next();
    currentImage.removeClass("active");
    nextImage.addClass("active");
    if (nextImage.length === 0) {
      $(".image").first().addClass("active");
    }
  });

  $(document).on("click", "img", function () {
    // var imgSrc = $(this).attr("src");
    var newImage = $(".active");
    var imgSrc = newImage.children().eq(1).attr("src");
    localStorage.setItem("imgSource", imgSrc);
    window.open("editor.html", "_blank");
    openEditor = 1;
  });
});
