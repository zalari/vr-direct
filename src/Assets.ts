import { AssetsManager, MeshAssetTask, TextureAssetTask, type AbstractMesh, type Scene, type Texture } from 'babylonjs';

const MODELS_URL = './models/';

export class Assets {
	static #instance: Assets;
	#assetsMngr: AssetsManager;
	#assets: Map<string, unknown> = new Map();

	private constructor(scene: Scene) {
		this.#assetsMngr = new AssetsManager(scene);
	}

	static getInstance(scene: Scene): Assets {
		if (!Assets.#instance) {
			Assets.#instance = new Assets(scene);
		}

		return Assets.#instance;
	}

	async loadAssets(): Promise<Assets> {
		return new Promise((resolve, reject) => {
			// Meshes
			this.#assetsMngr.addMeshTask('Banner', null, MODELS_URL, 'banner.glb');
			this.#assetsMngr.addMeshTask('Barstool', null, MODELS_URL, 'Barstool.glb');
			this.#assetsMngr.addMeshTask('Table', null, MODELS_URL, 'BistroTable.glb');
			this.#assetsMngr.addMeshTask('Monitor', null, MODELS_URL, 'monitor.obj');

			// Textures
			this.#assetsMngr.addTextureTask('Floor', './textures/stone-floor.jpg');
			this.#assetsMngr.addTextureTask('Banner1', './textures/banner1.webp');
			this.#assetsMngr.addTextureTask('Banner2', './textures/banner2.webp');
			this.#assetsMngr.addTextureTask('Banner3', './textures/banner3.webp');

			// Events & handlers
			this.#assetsMngr.onTaskError = (task) => { reject(task.errorObject); };
			this.#assetsMngr.onTaskSuccess = (task) => {
				if (task instanceof MeshAssetTask) {
					task.loadedMeshes[0].name = task.name;
					this.#assets.set(task.name, task.loadedMeshes[0]);
					return;
				}
				if (task instanceof TextureAssetTask) {
					this.#assets.set(task.name, task.texture);
					return;
				}
			};
			this.#assetsMngr.onFinish = () => { resolve(this); };
			this.#assetsMngr.load();
		});
	}

	getMesh(key: string): AbstractMesh | undefined {
		return this.#assets.get(key) as AbstractMesh;
	}

	getTexture(key: string): Texture | undefined {
		return this.#assets.get(key) as Texture;
	}

}
