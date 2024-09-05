"use strict";

/*
 * Course: CS 4722
 * Section: 01
 * Name: Brandon Portier
 * Professor: Dr. Alan Shaw
 * Assignment #: 3
 */

var canvas;
var gl;

var theta = vec3( 45, 45, 45 );
var thetaLoc;

var vertices = [
    vec3(-0.5, -0.5, 0.5),         // Vertex 0
    vec3(-0.5, 0.5, 0.5),          // Vertex 1
    vec3(0.5, 0.5, 0.5),           // Vertex 2
    vec3(0.5, -0.5, 0.5),          // Vertex 3
    vec3(-0.5, -0.5, -0.5),        // Vertex 4
    vec3(-0.5, 0.5, -0.5),         // Vertex 5
    vec3(0.5, 0.5, -0.5),          // Vertex 6
    vec3(0.5, -0.5, -0.5),         // Vertex 7
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),      // black for Vertex 0
    vec4(1.0, 0.0, 0.0, 1.0),      // red for Vertex 1
    vec4(1.0, 1.0, 0.0, 1.0),      // yellow for Vertex 2
    vec4(0.0, 1.0, 0.0, 1.0),      // green for Vertex 3
    vec4(0.0, 0.0, 1.0, 1.0),      // blue for Vertex 4
    vec4(1.0, 0.0, 1.0, 1.0),      // magenta for Vertex 5
    vec4(1.0, 1.0, 1.0, 1.0),      // white for Vertex 6
    vec4(0.0, 1.0, 1.0, 1.0),      // cyan for Vertex 7
];

var points = [
    vertices [1], vertices[0], vertices[3],
    vertices [3], vertices[2], vertices[1],
    vertices [2], vertices[3], vertices[7],
    vertices [7], vertices[6], vertices[2],
    vertices [3], vertices[0], vertices[4],
    vertices [4], vertices[7], vertices[3],
    vertices [6], vertices[2], vertices[1],
    vertices [1], vertices[5], vertices[6],
    vertices [4], vertices[5], vertices[6],
    vertices [6], vertices[7], vertices[4],
    vertices [5], vertices[4], vertices[0],
    vertices [0], vertices[1], vertices[5],
];

var colors = [
    vertexColors [1], vertexColors[0], vertexColors[3],
    vertexColors [3], vertexColors[2], vertexColors[1],
    vertexColors [2], vertexColors[3], vertexColors[7],
    vertexColors [7], vertexColors[6], vertexColors[2],
    vertexColors [3], vertexColors[0], vertexColors[4],
    vertexColors [4], vertexColors[7], vertexColors[3],
    vertexColors [6], vertexColors[2], vertexColors[1],
    vertexColors [1], vertexColors[5], vertexColors[6],
    vertexColors [4], vertexColors[5], vertexColors[6],
    vertexColors [6], vertexColors[7], vertexColors[4],
    vertexColors [5], vertexColors[4], vertexColors[0],
    vertexColors [0], vertexColors[1], vertexColors[5],
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext( 'webgl2', {} );
    if ( !gl ) { alert( "WebGL2 not available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //
    // vertex array attribute buffer code
    //

    // Allocating array buffer space for an Attribute buffers in Javascript:
    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    // Associating vPosition Attribute for a vec3 buffer in Javascript:
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //
    // color array attribute buffer code
    //

    // Allocating array buffer space for an Attribute buffers in Javascript:
    let cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    // Associating vColor Attribute for a vec4 buffer in Javascript:
    let vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    //
    // thetaLoc uniform variable code
    //

    // Associating a Uniform vec4 with a location variable in Javascript:
    thetaLoc = gl.getUniformLocation(program, "theta");

    // Updating/passing the associated vec4 value to the uniform in or before the render() method:
    gl.uniform3fv(thetaLoc, theta);

    render();
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length); 
}