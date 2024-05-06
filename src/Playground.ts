import { ArcRotateCamera, BackgroundMaterial, Color4, CubeTexture, HemisphericLight, MeshBuilder, Scene, Texture, Vector3, type Engine, type Mesh, type Node, type Nullable } from 'babylonjs';
import { Assets } from './Assets';
import { createDiorama } from './Diorama';

export function createPlayground(engine: Engine, canvas: HTMLCanvasElement): Scene {
	// Create scene
	const scene = new Scene(engine);

	// Create Camera
	const camera = new ArcRotateCamera('camera', 0, Math.PI / 3, 5, Vector3.Zero(), scene);
	// const camera = new FreeCamera("camera1", new Vector3(5, 3, 0), scene);
	camera.setTarget(new Vector3(0, .7, 0));
	camera.attachControl();
	camera.speed = 0.35;
	camera.checkCollisions = true;
	scene.activeCamera = camera;

	// Create Light
	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
	// light.intensity = 0.7;

	// Create Skybox
	const size = 100;
	const skybox = MeshBuilder.CreateBox("skyBox", { size, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene);
	skybox.position.y = size / 2 - 0.1;
	skybox.isPickable = false;
	// skybox.infiniteDistance = true;

	const sky = new BackgroundMaterial("skyBox", scene);
	sky.backFaceCulling = false;
	sky.enableGroundProjection = true;

	// Environment
	scene.clearColor = new Color4(1, 1, 1, 1);
	scene.environmentIntensity = 0.5;

	// Create Assets
	Assets.getInstance(scene).loadAssets().then((assets) => {
		// sky.reflectionTexture = assets.getHDRCubeTexture('Skybox') as HDRCubeTexture;
		sky.reflectionTexture = CubeTexture.CreateFromPrefilteredData('./environment/sky.env', scene);
		sky.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
		skybox.material = sky;

		createDiorama(scene, assets);
	}).catch(console.error);

	// Pointer Events
	let pickedMesh: Nullable<Node> | undefined;
	scene.onPointerDown = (evt, pickInfo) => {
		let m: Nullable<Node> | undefined = pickInfo.pickedMesh;
		pickedMesh = m;
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		while (m = m?.parent) pickedMesh = m;
	};
	scene.onPointerMove = (evt, pickInfo) => {
		if (pickedMesh) {
			camera.detachControl();
			(pickedMesh as Mesh).rotation.addInPlaceFromFloats(0, 0.01, 0);
		}
	};
	scene.onPointerUp = () => {
		pickedMesh = undefined;
		camera.attachControl();
	};

	return scene;
}
