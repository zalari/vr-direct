import { BackgroundMaterial, Color4, FreeCamera, HemisphericLight, MeshBuilder, PointerEventTypes, Scene, Texture, Vector3, type Engine, type HDRCubeTexture, type Mesh } from 'babylonjs';
import { Assets } from './Assets';
import { createDiorama } from './Diorama';

export function createPlayground(engine: Engine, canvas: HTMLCanvasElement): Scene {
	// Create scene
	const scene = new Scene(engine);

	// Create Camera
	// const camera = new ArcRotateCamera('camera', 0, Math.PI / 4, 10, Vector3.Zero(), scene);
	const camera = new FreeCamera("camera1", new Vector3(5, 3, 0), scene);
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
	// sky.backFaceCulling = false;
	sky.enableGroundProjection = true;

	// Environment
	scene.clearColor = new Color4(1, 1, 1, 1);
	scene.environmentIntensity = 0.5;

	let ground: Mesh;

	// Create Assets
	Assets.getInstance(scene).loadAssets().then((assets) => {
		// Add skybox texture
		sky.reflectionTexture = assets.getHDRCubeTexture('Skybox') as HDRCubeTexture;
		sky.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
		skybox.material = sky;

		createDiorama(scene, assets);
		ground = scene.getMeshByName('Ground') as Mesh;
	}).catch(console.error);


	// Drag'n'drop ///////////////////////////////////////////////////////////
	let startingPoint: Vector3 | null;
	let currentMesh: Mesh;

	function getGroundPosition() {
		const pickinfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => mesh === ground);
		if (pickinfo.hit) {
			return pickinfo.pickedPoint;
		}

		return null;
	};

	function pointerDown(mesh: Mesh) {
		currentMesh = mesh;
		startingPoint = getGroundPosition();
		if (startingPoint) { // we need to disconnect camera from canvas
			console.log('down');
			camera.detachControl();
		}
	};

	function pointerUp() {
		if (startingPoint) {
			camera.attachControl();
			startingPoint = null;
			return;
		}
	};

	function pointerMove() {
		if (!startingPoint) {
			return;
		}
		const current = getGroundPosition();
		if (!current) {
			return;
		}

		const diff = current.subtract(startingPoint);
		currentMesh.position.addInPlace(diff);

		startingPoint = current;
	}

	scene.onPointerObservable.add((pointerInfo) => {
		switch (pointerInfo.type) {
			case PointerEventTypes.POINTERDOWN:
				if (pointerInfo.pickInfo!.hit && pointerInfo.pickInfo!.pickedMesh !== ground) {
					console.log(ground);
					pointerDown(pointerInfo.pickInfo!.pickedMesh);
				}
				break;
			case PointerEventTypes.POINTERUP:
				pointerUp();
				break;
			case PointerEventTypes.POINTERMOVE:
				pointerMove();
				break;
		}
	});

	return scene;
}
