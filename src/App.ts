import {
	AxesViewer,
	Engine,
	Vector3,
	type Scene,
} from 'babylonjs';
import 'babylonjs-loaders';
import { createPlayground } from './Playground';

export class App {
	readonly canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;

	worldAxis?: AxesViewer;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.engine = new Engine(canvas, true);
		this.scene = createPlayground(this.engine, canvas);

		window.addEventListener('resize', () => this.engine.resize());
	}

	async run() {
		this.debug(false);
		await this.#xr();
		this.engine.runRenderLoop(() => this.scene.render());
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

	async #xr() {
		// const xrHelper = await WebXRExperienceHelper.CreateAsync(this.scene);
		// const sessionManager = await xrHelper.enterXRAsync("immersive-vr", "local-floor");

		const xrHelper = await this.scene.createDefaultXRExperienceAsync({
			// floorMeshes: [this.scene.getMeshByName('ground')]
		});
		xrHelper.baseExperience.camera.position = new Vector3(3, 3, 0);

		// To exit, simply call the exitXRAsync function:
		// await xrHelper.exitXRAsync();
	}

	// Not needed, as the engine will be disposed when the window is closed
	// destroy() {
	// 	this.scene.dispose();
	// 	this.engine.dispose();
	// }
}
