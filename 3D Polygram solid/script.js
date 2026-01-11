const canvas = document.getElementById('polygramCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation variables
let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;
let mouseX = 0;
let mouseY = 0;
let autoRotate = true;

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    autoRotate = false;
});

document.addEventListener('mouseleave', () => {
    autoRotate = true;
});

// Touch interaction for mobile
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
    mouseY = (touch.clientY / window.innerHeight) * 2 - 1;
    autoRotate = false;
}, { passive: false });

// 3D Point class
class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    rotateX(angle) {
        const rad = angle * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const y = this.y * cos - this.z * sin;
        const z = this.y * sin + this.z * cos;
        return new Point3D(this.x, y, z);
    }

    rotateY(angle) {
        const rad = angle * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x = this.x * cos - this.z * sin;
        const z = this.x * sin + this.z * cos;
        return new Point3D(x, this.y, z);
    }

    rotateZ(angle) {
        const rad = angle * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        return new Point3D(x, y, this.z);
    }

    project(fov, viewerDistance) {
        const factor = fov / (fov + this.z);
        const x = this.x * factor + canvas.width / 2;
        const y = this.y * factor + canvas.height / 2;
        return { x, y, z: this.z };
    }
}

// Create hexagram vertices
function createHexagramVertices(size, depth) {
    const vertices = [];
    const outerRadius = size;
    const innerRadius = size * 0.4;

    // Create star points
    for (let i = 0; i < 6; i++) {
        const angleOuter = (i * 60 - 90) * Math.PI / 180;
        const angleInner = (i * 60 - 90 + 30) * Math.PI / 180;

        // Outer point (front and back)
        vertices.push(new Point3D(
            Math.cos(angleOuter) * outerRadius,
            Math.sin(angleOuter) * outerRadius,
            -depth / 2
        ));
        vertices.push(new Point3D(
            Math.cos(angleOuter) * outerRadius,
            Math.sin(angleOuter) * outerRadius,
            depth / 2
        ));

        // Inner point (front and back)
        vertices.push(new Point3D(
            Math.cos(angleInner) * innerRadius,
            Math.sin(angleInner) * innerRadius,
            -depth / 2
        ));
        vertices.push(new Point3D(
            Math.cos(angleInner) * innerRadius,
            Math.sin(angleInner) * innerRadius,
            depth / 2
        ));
    }

    return vertices;
}

// Create hexagram edges
function createHexagramEdges() {
    const edges = [];

    // Connect outer points to form hexagon
    for (let i = 0; i < 6; i++) {
        // Front hexagon
        edges.push([i * 4, ((i + 1) % 6) * 4]);
        // Back hexagon
        edges.push([i * 4 + 1, ((i + 1) % 6) * 4 + 1]);
        // Depth connections
        edges.push([i * 4, i * 4 + 1]);

        // Connect to inner points for star shape
        const nextInner = ((i + 1) % 6) * 4 + 2;
        edges.push([i * 4, nextInner]);
        edges.push([i * 4, i * 4 + 2]);

        // Inner depth connections
        edges.push([i * 4 + 2, i * 4 + 3]);
    }

    // Connect inner points
    for (let i = 0; i < 6; i++) {
        edges.push([i * 4 + 2, ((i + 2) % 6) * 4 + 2]);
    }

    return edges;
}

// Create hexagram faces for solid rendering
function createHexagramFaces() {
    const faces = [];

    // Create triangular faces for each star point
    for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;

        // Front faces
        faces.push([i * 4, next * 4, i * 4 + 2]); // Outer triangle
        faces.push([i * 4 + 2, next * 4, next * 4 + 2]); // Inner triangle

        // Back faces
        faces.push([i * 4 + 1, i * 4 + 3, next * 4 + 1]);
        faces.push([i * 4 + 3, next * 4 + 3, next * 4 + 1]);

        // Side faces
        faces.push([i * 4, i * 4 + 1, next * 4]);
        faces.push([i * 4 + 1, next * 4 + 1, next * 4]);
        faces.push([i * 4 + 2, i * 4 + 3, next * 4 + 2]);
        faces.push([i * 4 + 3, next * 4 + 3, next * 4 + 2]);
    }

    return faces;
}

// Draw the polygram
function drawPolygram() {
    // Clear with subtle fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update rotation
    if (autoRotate) {
        rotationX += 0.3;
        rotationY += 0.4;
        rotationZ += 0.2;
    } else {
        rotationY = mouseX * 180;
        rotationX = -mouseY * 90;
    }

    // Calculate size based on canvas
    const size = Math.min(canvas.width, canvas.height) * 0.2;
    const depth = size * 0.6;
    const fov = 400;
    const viewerDistance = 800;

    // Create geometry
    const vertices = createHexagramVertices(size, depth);
    const edges = createHexagramEdges();
    const faces = createHexagramFaces();

    // Rotate vertices
    const rotatedVertices = vertices.map(v => {
        return v.rotateX(rotationX)
            .rotateY(rotationY)
            .rotateZ(rotationZ);
    });

    // Project vertices
    const projectedVertices = rotatedVertices.map(v =>
        v.project(fov, viewerDistance)
    );

    // Sort faces by depth for proper rendering
    const sortedFaces = faces.map((face, index) => {
        const z = face.reduce((sum, idx) => sum + projectedVertices[idx].z, 0) / face.length;
        return { face, z, index };
    }).sort((a, b) => b.z - a.z);

    // Draw faces with gradient fill
    sortedFaces.forEach(({ face, index }) => {
        const [a, b, c] = face;
        const pointA = projectedVertices[a];
        const pointB = projectedVertices[b];
        const pointC = projectedVertices[c];

        // Create gradient based on face orientation
        const gradient = ctx.createLinearGradient(
            pointA.x, pointA.y,
            pointC.x, pointC.y
        );

        const hue = (index * 40 + rotationY) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.2)`);
        gradient.addColorStop(0.5, `hsla(${hue + 30}, 90%, 50%, 0.3)`);
        gradient.addColorStop(1, `hsla(${hue + 60}, 70%, 70%, 0.1)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.lineTo(pointC.x, pointC.y);
        ctx.closePath();
        ctx.fill();
    });

    // Draw edges with glowing effect
    edges.forEach(edge => {
        const [startIdx, endIdx] = edge;
        const start = projectedVertices[startIdx];
        const end = projectedVertices[endIdx];

        // Create gradient for edge
        const edgeGradient = ctx.createLinearGradient(
            start.x, start.y,
            end.x, end.y
        );

        edgeGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        edgeGradient.addColorStop(0.5, 'rgba(100, 200, 255, 1)');
        edgeGradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

        ctx.strokeStyle = edgeGradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    });

    // Draw vertices with pulsing effect
    const pulse = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;
    projectedVertices.forEach(vertex => {
        const gradient = ctx.createRadialGradient(
            vertex.x, vertex.y, 0,
            vertex.x, vertex.y, 8
        );

        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Animation loop
function animate() {
    drawPolygram();
    requestAnimationFrame(animate);
}

// Start animation
animate();