(function ($) {
  $.fn.colorChanger = function (options) {
    var settings = $.extend(
      {
        affectThis: ".example",
        canvasHeight: "1",
        canvasWidth: "1",
      },
      options
    );

    return this.each(function () {
      $(this).on("click", function () {
        $(this).addClass(settings.affectThis);

        var canvas = $("<canvas></canvas");
        var ctx = $(canvas)[0].getContext("2d");
        var width = settings.canvasWidth;
        var height = settings.canvasHeight;
        $(canvas).prop({
          width: width,
          height: height,
        });
        $(canvas).attr("id", "canvas");
        $("body").append(canvas);
        var gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "black");
        gradient.addColorStop("0.2", "magenta");
        gradient.addColorStop("0.4", "blue");
        gradient.addColorStop("0.6", "green");
        gradient.addColorStop("0.8", "yellow");
        gradient.addColorStop("0.9", "red");
        gradient.addColorStop(1, "white");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        $("canvas").on("click", function (e) {
          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          var imgData = ctx.getImageData(x, y, 1, 1).data;
          var r = imgData[0];
          var g = imgData[1];
          var b = imgData[2];
          var hexColor = "#" + rgbToHex(r, g, b);
          $(settings.affectThis).css("background-color", hexColor);
          $(canvas).remove();
        });
      });

      function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return (
          "0123456789ABCDEF".charAt((n - (n % 16)) / 16) +
          "0123456789ABCDEF".charAt(n % 16)
        );
      }

      function rgbToHex(r, g, b) {
        return toHex(r) + toHex(g) + toHex(b);
      }
    });
  };
})(jQuery);
