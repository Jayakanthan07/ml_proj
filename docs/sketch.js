//const URL = 'https://tamilcharpred.herokuapp.com/'
const URL = 'https://cryptic-beach-64926.herokuapp.com/'
//const URL = 'http://localhost:5000/'
function setup() {
  var canvas = createCanvas(450, 380);
  background(255);
  canvas.parent('drawingBoard');
}

function draw() {
  stroke(0);
  strokeWeight(6);
  noFill();
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function typeWriteResult(){
  $("#predH").show();
  $("#predS").hide();
  $("#predH div.result > p:first-child").addClass("type-write");
  document.querySelector("#predH div.result > p:first-child").addEventListener("animationend",function(){
    $("#predH div.result > p:last-child").show().addClass("type-write");
  });
}

$(document).ready(function () {
  $("#predict").click(function () {
    var button = $(this);
    button.html("<i class=\"fas fa-spinner fa-spin\"></i> Predicting");
    button.attr("disabled", true);

    saveFrames('out', 'png', 1, 1, data => {
      payload = JSON.stringify({
        "img": data[0]['imageData']
      });
      $.ajax({
        type: 'POST',
        url: URL,
        headers: {
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        data: payload,
        success: function (data) {
          vals = Object.values(data);
         $("#predS").html(vals[0]);
         $("#predH").show();
          button.html("Predict");
          button.attr("disabled", false);
        
      },
        error: function (e) {
          button.html("Predict");
          button.attr("disabled", false);
        },
        dataType: "json",
        contentType: "application/json"
      });
    });
    typeWriteResult(); // In this function I made predH show so let the above line 49 be as such
  });

  $("#reset").click(function () {
    background(255);
    $("#predH").hide();
    $(".type-write").removeClass("type-write");
  });
});