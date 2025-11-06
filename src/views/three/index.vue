<template>
  <div class="wmax hmax">
    <div ref="threeContainer" class="three-container"></div>

  </div>
</template>


<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeDemo",
  mounted() {
    this.initThree();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    initThree() {
      const container = this.$refs.threeContainer;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1️⃣ 场景
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x202020); // 深色背景更显立体

      // 2️⃣ 相机
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(2, 2, 3);

      // 3️⃣ 渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio * 0.5);

      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true; // 开启阴影
      container.appendChild(renderer.domElement);

      // 4️⃣ 光照
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // 环境光
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(3, 5, 2);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // 5️⃣ 几何体 + 材质
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        metalness: 0.3,
        roughness: 0.6,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.position.y = 0.5;
      scene.add(cube);

      // 6️⃣ 地面
      const plane = new THREE.Mesh(
              new THREE.PlaneGeometry(10, 10),
              new THREE.MeshStandardMaterial({ color: 0x222222 })
      );
      plane.rotation.x = -Math.PI / 2;
      plane.receiveShadow = true;
      scene.add(plane);

      // 7️⃣ 鼠标交互控制
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // 惯性滑动更丝滑
      controls.dampingFactor = 0.05;

      // 8️⃣ 动画循环
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // 9️⃣ 自适应窗口变化
      this.onWindowResize = () => {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener("resize", this.onWindowResize);
    },
  },
};
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
