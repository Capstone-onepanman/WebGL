import global from 'global';

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

if (gl){
    /* 초기화 부분 */
    global.set('gl', gl);

    /* 데이터 버퍼에 담기 */
    const data = new Float32Array([
        -0.5,  0.5, // 왼쪽 위
        -0.5, -0.5, // 왼쪽 아래
        0.5, -0.5, // 오른쪽 아래
        -0.5,  0.5, // 왼쪽 위
        0.5, -0.5, // 오른쪽 아래
        0.5,  0.5  // 오른쪽 위
    ]);

    /* 새로운 BO 생성하고 bind */
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    /* 데이터 BO에 전송 */
    gl.bufferData(gl.ARRAY_BUFFER, data.buffer, gl.STATIC_DRAW);

    /* 전송 후 bind 풀기 */
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /* VAO 생성 및 bind */
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    /* BO bind */
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    /* Vertex Attrib Array 설정 */
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 2, 0);
    gl.enableVertexAttribArray(0);

    /* 설정 후 bind 풀기 */
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    const vertexShaderSource = 
    `#version 300 es
    layout(location = 0) in vec2 position;
    void main() {
        gl_Position = vec4(position, 0, 1);
    }
    `
    const fragmentShaderSource = 
    `#version 300 es
    precision mediump float;
    out vec4 out_color;
    void main() {
        out_color = vec4(1, 1, 1, 1);
    }
    `
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    /* 그리는 부분 */
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
} else {
    alert('IE나 Edge인 경우 Chrome으로 접속해주세여')
}