
var color = creamColor;
var shape = "ellipse";
/*give default*/

/*define color*/
var creamColor = {
    strokeStyle: "#f1f1f1",
    fillStyle: "#ffffff",
    shadowColor: "#f1f1f1"
};

var chocolateColor = {
    strokeStyle: "#8B4513",
    fillStyle: "#8B4513",
    shadowColor: "#8B5A2B"
};

var strawberryColor = {
    strokeStyle: "#FFC0CB",
    fillStyle: "#FFC0CB",
    shadowColor: "#FFAEB9"
};


/*define shape*/

var ellipse = {
    strokeStyle: "#f1f1f1",
    fillStyle: "#ffffff",
    shadowColor: "#f1f1f1",
    strokeWidth: 1,
    shadowBlur: 0,
    shadowX: -2, shadowY: 10,
    x: 150, y: 75,
    width: 161, height: 100
};

var rectangle =
{
    strokeStyle: "#f1f1f1",
    strokeWidth: 1,
    fillStyle: "#ffffff",
    shadowColor: "#f1f1f1",
    shadowBlur: 0,
    shadowX: -2, shadowY: 10,
    x: 150, y: 75,
    cornerRadius: 10,
    width: 161, height: 100
};

var heartShape = {
    fillStyle: "#ffffff",
    shadowColor: "#f1f1f1",
    shadowBlur: 0,
    shadowX: -2, shadowY: 10,
    strokeStyle: "#f1f1f1",
    strokeWidth: 1,
    x1: 150, y1: 30, // Start point
    cx1: 200, cy1: 0, // Control point
    cx2: 300, cy2: 30, // Control point
    x2: 150, y2: 120, // Start/end point
    cx3: 0, cy3: 30, // Control point
    cx4: 100, cy4: 0, // Control point
    x3: 150, y3: 30 // Start/end point
};

/*main function of painting */
function paint() {
    initialCanvas();
    switch (shape) {
        case "ellipse": circleShape();
            break;
        case "rectangle": rectangleShape();
            break;
        case "heartShape": HeartShaped();
            break;
        default: circleShape();
    }

}



function About() {
    $("#aboutButton").button({
        text: false
    });

    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 300
        },
        hide: {
            effect: "explode",
            duration: 300
        }
    });

    $("#aboutButton").click(function () {
        $("#dialog").dialog("open");
    });

}


function music() {
    $("#MusicButton").button({
        text: false
    });

    $("#playerMoveOut").button({
        text: false
    });

    $("#MusicButton").click(function () {
        $("#musicPlayer").animate({
            right: "60px"
        }
        ).animate({ right: "50px" }
        );
    });

    $("#playerMoveOut").click(function () {
        $("#musicPlayer").animate({
            right: "-500px"
        })
    });
}



function OrnamentControl() {
    $("#AllOrnamentDiv").hide();
    $("#OrnamentButton").button({
        text: false
    }).click(function () {
        $("#AllOrnamentDiv").show(500);
    });

    $("#AllOrnamentDivClose").button({
        text: false
    }).click(function () {
        $("#AllOrnamentDiv").hide(500);
    });

    $(".OrnamentContent").draggable({
        cursor: "move", containment: "body", scroll: false, revert: true,cursorAt: { top: 20, left: 20 },
        revertDuration: 0
        , stop: function (e) {
            var offset = $(this).offset();
            $(this).clone().appendTo("#OrnamentCanvas");
            $(".OrnamentContent").last().css("position", "absolute")
                .css("top", e.pageY-20)
                .css("left", e.pageX-20)
            .draggable({ cursor: "move", containment: "body", scroll: false });
            
        }
    });

}

function toolsInitial() {
    $("#toolButton").hide();
    $("#toolButton").button({
        text: false
    }).click(function () {
        $("#stepDiv").show(500);
        $("#toolButton").hide();
    });


    $("#closeStepButton").button({
        text: false
    }).click(function () {
        $("#stepDiv").hide(500);
        $("#toolButton").show();
    });


    $("#stepDiv").draggable({ cursor: "move", containment: "body", scroll: false });

    /*初始化按钮形状*/
    $("#shapeRadioGroup").buttonset();
    $("#SourceGroup").buttonset();
    $("#FruitGroup").buttonset();

    $("#circleShape").click(function () {
        shape = "ellipse";
        paint();
    });

    $("#rectangleShape").click(function () {

        shape = "rectangle";
        paint();
    });

    $("#heartShape").click(function () {
        shape = "heartShape";
        paint();
    });

    $("#CreamSource").click(function () {
        color = creamColor;
        paint();
    });


    $("#ChocolateSource").click(function () {
        color = chocolateColor;
        paint();
    });

    $("#StrawberrySource").click(function () {
        color = strawberryColor;
        paint();
    });

    $("#StrawberryFruit").click(function () {
        $("body").css("cursor", "url(images/strawberry.fw.png)");
    });


    $(".fruitImage").draggable({
        cursor: "move", cursorAt: { top: 30, left: 30 },
        containment: "body", scroll: false, revert: true, clone: true
    });

}

/*这里花了一个圆*/
function circleShape() {
    $("#paintCanvas").drawEllipse(jQuery.extend(ellipse, color));
}

function rectangleShape() {

    $("#paintCanvas").drawRect(jQuery.extend(rectangle, color));

}

function HeartShaped() {
    $("#paintCanvas").drawBezier(jQuery.extend(heartShape, color));

}

/*初始化画板*/
function initialCanvas() {
    $("#paintCanvas").clearCanvas();
    var radial = $("#paintCanvas").createGradient({
        x1: 150, y1: 75,
        x2: 150, y2: 75,
        r1: 0, r2: 200,
        c1: "rgba( 255,255,224, 0.80)",
        c2: "rgba(255,215,0, 0.80)"
    });


    $("#paintCanvas").drawRect({
        fillStyle: radial,
        x: 0, y: 0,
        width: 800,
        height: 600,
        fromCenter: true
    });
}


/*main function*/
$(function () {
    About();
    music();
    toolsInitial();
    OrnamentControl();
});
