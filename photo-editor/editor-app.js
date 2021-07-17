$(document).ready(function () {
  var imageSource = localStorage.getItem("imgSource");

  var img = new Image();
  img.src = imageSource;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var originalWidth;
  var originalHeight;

  function draw(img) {
    ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
  }

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    originalWidth = img.width;
    originalHeight = img.height;
    draw(this);
  };

  $("#greyscale").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grey = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
      data[i] = grey;
      data[i + 1] = grey;
      data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#sepia").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grey = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
      data[i] = grey + 95;
      data[i + 1] = grey + 58;
      data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#invert").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#rbg").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const green = data[i + 1];
      data[i] = data[i];
      data[i + 1] = data[i + 2];
      data[i + 2] = green;
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#bgr").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      data[i] = data[i + 2];
      data[i + 1] = data[i + 1];
      data[i + 2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#gbr").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      data[i] = data[i + 1];
      data[i + 1] = data[i + 2];
      data[i + 2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#grb").on("click", function () {
    draw(img);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      data[i] = data[i + 1];
      data[i + 1] = red;
      data[i + 2] = data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    newImage();
  });

  $("#resize").on("change", function () {
    var scale = parseInt($(this).val()) / 150;
    redraw(ctx, scale);
    draw(img);
    newImage();
  });

  $(document).on("input change", "#resize", function () {
    $("#value").html($(this).val());
    var value = $("#resize").val();
    if (value == 25) {
      $("#value").html("🔍 - Minimum resolution!");
    }
    if (value == 150) {
      $("#value").html("💪 - Maximum resolution!");
    }
  });

  function redraw(ctx, scale) {
    ctx.canvas.width = originalWidth * scale;
    ctx.canvas.height = originalHeight * scale;
    ctx.scale(scale, scale);
  }

  $("#clear").on("click", function () {
    var img = new Image();
    img.src = imageSource;
    canvas.width = img.width;
    canvas.height = img.height;
    var originalWidth = img.width;
    var originalHeight = img.height;

    img.onload = function () {
      draw(this);
    };

    function draw(img) {
      ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
    }
  });

  function newImage() {
    var newImg = new Image();
    newImg.src = canvas.toDataURL("image/png");
    localStorage.setItem("imgSource", newImg.src);
  }

  $("#save").on("click", function () {
    newImage();
    window.close();
  });
});
