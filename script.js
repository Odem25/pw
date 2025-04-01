import * as THREE from 'three';

const particleCount = 1000;
const particles = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('particles-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
const colors = [];

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    vertices.push(x, y, z);

    const color = new THREE.Color(
        0.1 + Math.random() * 0.9,
        0.1 + Math.random() * 0.4,
        0.1 + Math.random() * 0.4
    );
    colors.push(color.r, color.g, color.b);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.02 + Math.random() * 0.015,
    vertexColors: true,
});

const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
    requestAnimationFrame(animate);

    points.rotation.x += 0.0002;
    points.rotation.y += 0.0004;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});