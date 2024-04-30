import { ArcRotateCamera, type Engine, HemisphericLight, Scene, Vector3, FreeCamera } from 'babylonjs';
import { Assets } from './Assets';
import { createDiorama } from './Diorama';

export function createPlayground(engine: Engine, canvas: HTMLCanvasElement): Scene {
	// Create scene
	const scene = new Scene(engine);

	// Create Camera
	// const camera = new ArcRotateCamera('camera', 0, Math.PI / 4, 10, Vector3.Zero(), scene);
	const camera = new FreeCamera("camera1", new Vector3(5, 3, 0), scene);
	camera.setTarget(Vector3.Zero());
	camera.attachControl();
	camera.speed = 0.35;
	scene.activeCamera = camera;

	// Create Light
	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
	// light.intensity = 0.7;

	// Create Assets
	Assets.getInstance(scene).loadAssets().then((assets) => {
		createDiorama(scene, assets);
	});

	return scene;
}
