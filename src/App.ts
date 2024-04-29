import {
	ArcRotateCamera,
	AxesViewer,
	Color3,
	Engine,
	HemisphericLight,
	MeshBuilder,
	MultiMaterial,
	Scene,
	SceneLoader,
	StandardMaterial,
	Texture,
	Vector3,
} from 'babylonjs';
import 'babylonjs-loaders';

export class App {
	readonly canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;

	worldAxis?: AxesViewer;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.engine = new Engine(canvas, true);
		this.scene = new Scene(this.engine);
		this.#attachCamera();
		this.#addLight();
		this.#addGround();
		// this.#addSphere();
		this.#addBanners();
		this.#addTable();
		this.#addChair();
		this.#addMonitor();
		window.addEventListener('resize', () => this.engine.resize());
	}

	#attachCamera() {
		const camera = new ArcRotateCamera('camera', 0, Math.PI / 4, 10, Vector3.Zero(), this.scene);
		// This attaches the camera to the canvas
		camera.attachControl(this.canvas, true);
		// This creates and positions a free camera (non-mesh)
		// var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
		// This targets the camera to scene origin
		// camera.setTarget(Vector3.Zero());
	}

	#addLight() {
		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		const light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;
	}

	#addGround() {
		// // Our built-in 'ground' shape.
		// const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10, subdivisions: 2 }, this.scene);
		// const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
		// // groundMaterial.diffuseColor = new Color3(0.5, 0.8, 0.5); // RGB for a greenish color
		// // groundMaterial.bumpTexture = new Texture("./normal.jpg", this.scene);
		// // groundMaterial.bumpTexture = new Texture("./plastic_05_normal.jpg", this.scene);
		// //groundMaterial.bumpTexture.level = 0.125;
		// groundMaterial.diffuseTexture = new Texture("./texture-stone-floor.jpg", this.scene);
		// ground.material = groundMaterial;

		const ground = MeshBuilder.CreateTiledGround(
			'Tiled Ground',
			{
				xmin: -5,
				zmin: -5,
				xmax: 5,
				zmax: 5,
				precision: {
					w: 2,
					h: 2,
				},
				subdivisions: {
					h: 2,
					w: 2,
				},
			},
			this.scene,
		);

		const multimat = new MultiMaterial('multi', this.scene);
		const subMat = new StandardMaterial('sub', this.scene);
		// subMat.diffuseTexture = new Texture("./floor.png", this.scene);
		subMat.diffuseTexture = new Texture('./texture-stone-floor.jpg', this.scene);
		// subMat.diffuseTexture.wAng = Math.PI / 4;
		// subMat.bumpTexture = new Texture("./plastic_05_normal.jpg", this.scene);
		multimat.subMaterials.push(subMat);
		ground.material = multimat;
	}

	#addSphere() {
		// Our built-in 'sphere' shape.
		const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, this.scene);
		// Move the sphere upward 1/2 its height
		const startPos = 2;
		sphere.position.y = startPos;
		const redMaterial = new StandardMaterial('redMaterial', this.scene);
		redMaterial.diffuseColor = new Color3(1, 0, 0); // RGB for red
		sphere.material = redMaterial;
	}

	#addBanners() {
		// SceneLoader.AppendAsync("./models/", "banner.glb", this.scene);
		SceneLoader.ImportMesh(null, './models/', 'banner.glb', this.scene, (meshes) => {
			meshes[0].position = new Vector3(-1.5, 0, -2);
			meshes[0].rotation = new Vector3(0, -2, 0);
		});
		SceneLoader.ImportMesh(null, './models/', 'banner.glb', this.scene, (meshes) => {
			meshes[0].position = new Vector3(-1.5, 0, 2);
			meshes[0].rotation = new Vector3(0, -1, 0);
		});
		SceneLoader.ImportMesh(null, './models/', 'banner.glb', this.scene, (meshes) => {
			meshes[0].position = new Vector3(-0.5, 0, -3.6);
			meshes[0].rotation = new Vector3(0, -2.3, 0);
		});
	}

	#addTable() {
		// SceneLoader.AppendAsync("./models/", "table.obj", this.scene).catch(console.error);
		SceneLoader.ImportMesh(null, './models/', 'tisch.obj', this.scene, (meshes) => {
			meshes.forEach((mesh) => {
				mesh.position = new Vector3(0, 0.55, 0);
			});
		});
	}

	#addChair() {
		SceneLoader.ImportMesh(null, './models/', 'stuhl.obj', this.scene, (meshes) => {
			meshes.forEach((m) => {
				m.position = new Vector3(0.8, 0.416, 0);
				m.rotation = new Vector3(0, 0.93, 0);
			});
		});
	}

	#addMonitor() {
		SceneLoader.ImportMesh(null, './models/', 'monitor.obj', this.scene, (meshes) => {
			// meshes.forEach(m => {
			//     m.position = new Vector3(-0.8, 1, 0);
			// });
			meshes[0].position = new Vector3(-1.8, 1, 0);
			meshes[0].rotation = new Vector3(0, 1.57, 0);
		});
	}

	debug(debugOn = true) {
		if (debugOn) {
			this.scene.debugLayer.show({ overlay: true });
			this.worldAxis = new AxesViewer(this.scene);
		} else {
			this.scene.debugLayer.hide();
			this.worldAxis?.dispose();
		}
	}

	run() {
		this.debug(true);
		this.engine.runRenderLoop(() => this.scene.render());
	}
}
