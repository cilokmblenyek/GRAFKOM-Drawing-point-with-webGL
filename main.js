function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertexShaderCode = `
        attribute vec2 a_Position;
        void main() {
            gl_Position = vec4(a_Position, 0.0, 1.0);
            gl_PointSize = 30.0;
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(0.001,0.980,0.186,1.000);  
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Define the positions for the 3 points
    var points = new Float32Array([
        -0.5, 0.5,  // Top-left point
        0.5, 0.5,   // Top-right point
        0.0, -0.5   // Bottom-middle point
    ]);

    // Create a buffer to store the positions
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    // Get the location of the attribute variable a_Position in the shader
    var aPosition = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Set the background to white
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw 3 points
    gl.drawArrays(gl.POINTS, 0, 3);
}