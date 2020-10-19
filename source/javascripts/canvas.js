
$('.alert').click(function() {
  $(this).fadeOut();
});


function submitTextToCanvas(id) {
  var value = document.getElementById('addText').value;
  var textbox = new fabric.Textbox(value, {
    left:100,
    top: 100,
    width: 200,
    fontSize: 40
  });
  canvas.add(textbox).setActiveObject(textbox);
}

// $(window).bind("load",function() {

  //  var canvasHeight=600;
  // var canvasWidth=600;

  var canvasHeight=window.innerWidth*0.45;
  var canvasWidth=window.innerWidth*0.45;

  var canvas = new fabric.Canvas('canvas', {
    selection: false,
    height: window.innerWidth*0.45,
    width: window.innerWidth*0.45
    });


//Adding the tianzige
    function drawGrid(c) {
      const options = {
          distance: c.width/4,
          width: c.width,
          height: c.height,
          param: {
            stroke: "#ebebeb",
            strokeWidth: 1,
            selectable: false
          }
        },
        gridLen = options.width / options.distance;

      for (var i = 0; i < gridLen; i++) {
        var distance = i * options.distance,
          horizontal = new fabric.Line(
            [distance, 0, distance, options.width],
            options.param
          ),
          vertical = new fabric.Line(
            [0, distance, options.width, distance],
            options.param
          );
        c.add(horizontal);
        c.add(vertical);
        if (i % 4 === 0) {
          horizontal.set({ stroke: "#cccccc" });
          vertical.set({ stroke: "#cccccc" });
        }
      }
  }


  drawGrid(canvas);


  var textbox = new fabric.Textbox('This is a textbox. You can double click to edit, or press delete to get rid of me.', {
    left:100,
    top: 100,
    width: 200,
    fontSize: 40
  });

  canvas.add(textbox).setActiveObject(textbox);

  var currentlyDragging;


  //Snap to Grid
  // var distance = canvas.width/8;
  //   canvas.on('object:moving', function(options) {
  //     w = options.target.width * options.target.scaleX,
  //     h = options.target.height * options.target.scaleY,
  //     options.target.set({
  //       right: Math.round((options.target.left + w) / distance) * distance,
  //       left: Math.round(options.target.left / distance) * distance,
  //       top: Math.round(options.target.top / distance) * distance
  //     });
  //   });

//Add to canvas

var radicalCursor = 0;
function add(e) {
  var svgURL = e.currentTarget.getAttribute('data');
  var definition = e.currentTarget.getAttribute('data-rad-type');
  fabric.loadSVGFromURL(svgURL, function(objects, options) {
    for(var i=0; i < objects.length; i++) {
      objects[i].definition = definition;
      if (objects[i].height > objects[i].width) {
        objects[i].scaleToHeight(canvasHeight/2);
      } else {
        objects[i].scaleToWidth(canvasWidth/2);
      }
      if (radicalCursor % 4 == 1 || radicalCursor % 4 == 2) {
        objects[i].left = canvasWidth / 2;
      }
      if (radicalCursor % 4 == 2 || radicalCursor % 4 == 3) {
        objects[i].top = canvasHeight / 2;
      }
      radicalCursor++;
      canvas.add(objects[i]);
    }
  });

  document.getElementById('definition-tracker').innerHTML += definition + ' ';

  //commented out below is grouping SVG
  // fabric.loadSVGFromURL(svgURL, function(objects, options) {
  //     var svg = fabric.util.groupSVGElements(objects, options);
  //     // svg.left = e.layerX;
  //     // svg.top = e.layerY;
  //     svg.scaleToWidth(canvasWidth/2);
  //     svg.scaleToHeight(canvasHeight/2);
  //   canvas.add(svg);
  // });
}


var radicalButtons = document.getElementsByClassName("radical-button");
for (var i = 0; i < radicalButtons.length; i++) {
  radicalButtons[i].addEventListener('click', add, false);
}

var wordButtons = document.getElementsByClassName("word-button");
for (var i = 0; i < wordButtons.length; i++) {
  wordButtons[i].addEventListener('click', add, false);
}


//Deleting all objects on canvas
function clearAll() {
  canvas.clear();
  document.getElementById('definition-tracker').innerHTML = "";
  drawGrid(canvas);
}


//Deleting active object

function definitionDeleter (definition) {
  var newDefinition = document.getElementById('definition-tracker').innerHTML.replace(definition, '');
  document.getElementById('definition-tracker').innerHTML = newDefinition;
}

function deleteActiveObject() {
  var activeObject = canvas.getActiveObject();
  definitionDeleter(activeObject.definition);
  canvas.remove(activeObject);
}

$("#delete").click(deleteActiveObject);
$("body").on("keydown", function(e) {
  if (e.which == 8 || e.which == 46) {
    deleteActiveObject();
  }
});



// Downloading the image

function backgroundColor (c) {
  c.setBackgroundColor('rgba(255, 73, 64, 0.6)', canvas.renderAll.bind(canvas));
}

function showBg (c) {
  c.setBackgroundColor('rgba(0, 0, 0, 0.6)', canvas.renderAll.bind(canvas));
}

function removeGrid() {
    var objects = canvas.getObjects('line');
    for (let i in objects) {
        canvas.remove(objects[i]);
    }
}

var link = document.getElementById('download-link-href');
    // link.innerHTML = 'download image';
    link.addEventListener('click', function(ev) {

    // destinationCanvas = document.createElement("canvas");
    // destinationCanvas.width = srcCanvas.width;
    // destinationCanvas.height = srcCanvas.height;
    //
    // destCtx = destinationCanvas.getContext('2d');
    //
    // //create a rectangle with the desired color
    // destCtx.fillStyle = "#FFFFFF";
    // destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);
    //
    // //draw the original canvas onto the destination canvas
    // destCtx.drawImage(srcCanvas, 0, 0);

    //finally use the destinationCanvas.toDataURL() method to get the desired output;

    var destCtx = canvas.getContext('2d');

    backgroundColor(destCtx);


    link.href =  destCtx.toDataURL();
    link.download = "my-new-hanzi.jpg";
}, false);

document.body.getElementById('download-link').appendChild(link);



// Auto-arrange layout buttons
// The main class


var specialRadicals = {
  'radical-1': 'left',
  'radical-2': 'whole'
}

function horizontalTwo(){
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 3) {
    var radicalLeft = objectsOnly[0];
    var radicalRight = objectsOnly[1];

    //Scale to
    radicalLeft.scale((canvas.height/2.5)/radicalLeft.height);
    radicalRight.scale((canvas.height/2.5)/radicalRight.height);

    radicalLeft.left=(canvas.height/3)-(radicalLeft.width*4);
    radicalLeft.top=(canvas.height/3)-radicalLeft.height;
    radicalLeft.setCoords();

    radicalRight.left=radicalLeft.oCoords.tr.x + 3;
    radicalRight.top=radicalLeft.oCoords.tr.y;
    radicalRight.setCoords();

    canvas.renderAll();
  } else {
    var x = document.getElementsByClassName("alert-warn-two")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function horizontalThree(){
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 4) {
    var radicalLeft = objectsOnly[0];
    var radicalMiddle = objectsOnly[1];
    var radicalRight = objectsOnly[2];

    //Scale to smaller sizes
    radicalLeft.scale((canvas.height/4)/radicalLeft.height);
    radicalMiddle.scale((canvas.height/4)/radicalMiddle.height);
    radicalRight.scale((canvas.height/4)/radicalRight.height);

    radicalLeft.left=(canvas.height/3)-(radicalLeft.width*4);
    radicalLeft.top=(canvas.height/2.5)-radicalLeft.height;
    radicalLeft.setCoords();


    radicalMiddle.left = radicalLeft.oCoords.tr.x + 5;
    radicalMiddle.top=radicalLeft.oCoords.tr.y;
    radicalMiddle.setCoords();


    radicalRight.left=radicalMiddle.oCoords.tr.x + 5;
    radicalRight.top=radicalMiddle.oCoords.tr.y;
    radicalRight.setCoords();

    canvas.renderAll();
  } else {
    var x = document.getElementsByClassName("alert-warn-three")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function subDivideRight(){
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 4) {
    var radicalLeft = objectsOnly[0];
    var radicalRightTop = objectsOnly[1];
    var radicalRightBottom = objectsOnly[2];

    var radicalLeftScaleFactor = (canvas.height/2)/radicalLeft.height;
    //Scale to
    radicalLeft.scale(radicalLeftScaleFactor);

    radicalRightTop.scale((canvas.height/4)/radicalRightTop.height);
    radicalRightBottom.scale((canvas.height/4)/radicalRightTop.height);


    radicalLeft.left=(canvas.width/4)-(radicalLeft.width*3);
    radicalLeft.top=(canvas.height/3)-radicalLeft.height;
    radicalLeft.setCoords();

    radicalRightTop.left=radicalLeft.oCoords.tr.x + 3;
    radicalRightTop.top=radicalLeft.oCoords.tr.y;
    radicalRightTop.setCoords();

    radicalRightBottom.left=radicalRightTop.oCoords.bl.x + 3;
    radicalRightBottom.top=radicalRightTop.oCoords.bl.y;
    radicalRightBottom.setCoords();

    canvas.renderAll();

  } else {
    var x = document.getElementsByClassName("alert-warn-three")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function subDivideLeft () {
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 4) {
    var radicalRight = objectsOnly[0];
    var radicalLeftTop = objectsOnly[1];
    var radicalLeftBottom = objectsOnly[2];

    var radicalRightScaleFactor = (canvas.height/2)/radicalRight.height;
    //Scale to
    radicalRight.scale(radicalRightScaleFactor);

    radicalLeftTop.scale((canvas.height/4)/radicalLeftTop.height);
    radicalLeftBottom.scale((canvas.height/4)/radicalLeftTop.height);

    var radicalLeftTopWidth = radicalLeftTop.width;

    radicalRight.left=(canvas.width/2)-(radicalRight.width*3);
    radicalRight.top=(canvas.height/3)-radicalRight.height;
    radicalRight.setCoords();

    radicalLeftTop.left=radicalRight.oCoords.tl.x-(radicalLeftTopWidth*4);
    radicalLeftTop.top=radicalRight.oCoords.tl.y;
    radicalLeftTop.setCoords();

    radicalLeftBottom.left=radicalLeftTop.oCoords.bl.x;
    radicalLeftBottom.top=radicalLeftTop.oCoords.bl.y;
    radicalLeftBottom.setCoords();

    canvas.renderAll();

  } else {
    var x = document.getElementsByClassName("alert-warn-three")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

}


function verticalTwo() {
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 3) {
    var radicalTop = objectsOnly[0];
    var radicalBottom = objectsOnly[1];

    //Scale to
    radicalTop.scale((canvas.height/2.5)/radicalTop.height);
    radicalBottom.scale((canvas.height/2.5)/radicalBottom.height);

    radicalTop.left=(canvas.width/2)-(radicalTop.width*4);
    radicalTop.top=canvas.height-(canvas.height-(radicalTop.height+radicalBottom.height));
    radicalTop.setCoords();

    radicalBottom.left=radicalTop.oCoords.bl.x + 3;
    radicalBottom.top=radicalTop.oCoords.bl.y;
    radicalBottom.setCoords();

    canvas.renderAll();
  } else {
    var x = document.getElementsByClassName("alert-warn-two")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function verticalThree() {
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 4) {
    var radicalTop = objectsOnly[0];
    var radicalMiddle = objectsOnly[1];
    var radicalBottom = objectsOnly[2];

    //Scale to
    radicalTop.scale((canvas.height/5)/radicalTop.height);
    radicalMiddle.scale((canvas.height/5)/radicalTop.height);
    radicalBottom.scale((canvas.height/5)/radicalBottom.height);

    radicalTop.left=(canvas.width/2)-(radicalTop.width*4);
    radicalTop.top=canvas.height-(canvas.height-(radicalTop.height+radicalBottom.height));
    radicalTop.setCoords();

    radicalMiddle.left=radicalTop.oCoords.bl.x + 3;
    radicalMiddle.top=radicalTop.oCoords.bl.y;
    radicalMiddle.setCoords();

    radicalBottom.left=radicalMiddle.oCoords.bl.x + 3;
    radicalBottom.top=radicalMiddle.oCoords.bl.y;
    radicalBottom.setCoords();

    canvas.renderAll();
  } else {
    var x = document.getElementsByClassName("alert-warn-three")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function subDivideTop() {
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 4) {
    var radicalTopLeft = objectsOnly[0];
    var radicalTopRight = objectsOnly[1];
    var radicalBottom = objectsOnly[2];

    //Scale to
    radicalTopLeft.scale((canvas.height/5)/radicalTopLeft.height);
    radicalTopRight.scale((canvas.height/5)/radicalTopRight.height);
    radicalBottom.scale((canvas.height/2)/radicalBottom.height);

    radicalTopLeft.left=(canvas.width/2)-(radicalTopLeft.width*4);
    radicalTopLeft.top=canvas.height-(canvas.height-(radicalTopLeft.height+radicalBottom.height));
    radicalTopLeft.setCoords();

    radicalTopRight.left=radicalTopLeft.oCoords.tr.x + 3;
    radicalTopRight.top=radicalTopLeft.oCoords.tr.y;
    radicalTopRight.setCoords();

    radicalBottom.left=radicalTopLeft.oCoords.bl.x + 3;
    radicalBottom.top=radicalTopLeft.oCoords.bl.y;
    radicalBottom.setCoords();

    canvas.renderAll();
  } else {
    var x = document.getElementsByClassName("alert-warn-three")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function subDivideBottom() {
  var allObjects = canvas.getObjects();
  var objectsOnly = allObjects.slice(8, allObjects.length);
  if (objectsOnly.length < 4) {
    var radicalTopLeft = objectsOnly[0];
    var radicalBottomRight = objectsOnly[1];
    var radicalBottomLeft = objectsOnly[2];

    //Scale to
    radicalTopLeft.scale((canvas.height/2)/radicalTopLeft.height);
    radicalBottomLeft.scale((canvas.height/5)/radicalBottomLeft.height);
    radicalBottomRight.scale((canvas.height/5)/radicalBottomRight.height);

    radicalTopLeft.left=(canvas.width/2)-(radicalTopLeft.width*4);
    radicalTopLeft.top=canvas.height-(canvas.height-(radicalTopLeft.height+radicalBottom.height));
    radicalTopLeft.setCoords();

    radicalBottomLeft.left=radicalTopLeft.oCoords.bl.x + 3;
    radicalBottomLeft.top=radicalTopLeft.oCoords.bl.y;
    radicalBottomLeft.setCoords();

    radicalBottomRight.left=radicalBottomLeft.oCoords.tr.x + 3;
    radicalBottomRight.top=radicalBottomLeft.oCoords.tr.y;
    radicalBottomRight.setCoords();

    canvas.renderAll();
  } else {
    var x = document.getElementsByClassName("alert-warn-three")[0];
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}
