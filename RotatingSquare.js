"use strict";

/*
 * Course: CS 4722
 * Section: 01
 * Name: Brandon Portier
 * Professor: Dr. Alan Shaw
 * Assignment #: 2
 */

var canvas;
var gl;
var theta = 0.0;
var dtheta = 0.1;
var thetaLoc;
var speed = 50;
var bufferId;
var vertices;
var speed = 50;
var dir = -1;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext( 'webgl2', {} );
    if ( !gl ) { alert( "WebGL2 not available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1, 0),
        vec2(0, -1)
    ];

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // uniform variable declaration in init()
    thetaLoc = gl.getUniformLocation(program, "theta");
    gl.uniform1f(thetaLoc,theta);

    // Associate our shader variables with our data buffer
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // slider handler
    document.getElementById("sliderval").oninput =
      function (event) {
        speed = Number(event.target.value);
      };

    // button handler
    document.getElementById("buttonval").onclick =
      function () {
        dir = -dir;
      };

    render();
};

function render() {
    // new render() function:
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += dir * dtheta * speed / 100;
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimFrame(render);
}