"use strict";

/*
 * Course: CS 4722
 * Section: 01
 * Name: Brandon Portier
 * Professor: Dr. Alan Shaw
 * Assignment #: 1
 */

var gl;
var points;

// Four Vertices
var vertices = [
    vec2( -0.5, -0.5 ),
    vec2(  -0.5,  0.5 ),
    vec2(  0.5, 0.5 ),
    vec2( 0.5, -0.5)
];

var length = 0.5;
var height = 0.5;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );
    
    gl = canvas.getContext( 'webgl2', {} );
    if ( !gl ) { alert( "WebGL2 not available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    let vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();

    document.getElementById("lengthslider").oninput =
        function (event) {
            length = event.target.value;
            vertices = [
                vec2(-length, -height),
                vec2(-length, height),
                vec2(length, height),
                vec2(length, -height)
            ];
            render();
        };

    document.getElementById("heightslider").oninput =
        function (event) {
            height = event.target.value;
            vertices = [
                vec2(-length, -height),
                vec2(-length, height),
                vec2(length, height),
                vec2(length, -height)
            ];
            render();
        };
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}
