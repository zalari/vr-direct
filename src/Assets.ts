import { type AbstractMesh, AssetsManager, type HDRCubeTexture, MeshAssetTask, type Scene, type Texture, TextureAssetTask, HDRCubeTextureAssetTask, Vector3 } from 'babylonjs';

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
			const banner = this.#assetsMngr.addMeshTask('Banner', null, MODELS_URL, 'banner.glb');
			banner.onSuccess = (task) => {
				const A = task.loadedMeshes.find((m) => m.id === 'Cube_6_2.001_primitive1');
				if (A) {
					A.scaling.z = -1;
					A.rotation.x = 0.01;
				}
			};
			this.#assetsMngr.addMeshTask('Barstool', null, MODELS_URL, 'Barstool.glb');
			this.#assetsMngr.addMeshTask('Table', null, MODELS_URL, 'BistroTable.glb');
			const flag = this.#assetsMngr.addMeshTask('Flag', null, MODELS_URL, 'Flag.glb');
			flag.onSuccess = (task) => {
				task.loadedMeshes[0].position = new Vector3(0, 1.147, 0);
				task.loadedMeshes[0].scaling = new Vector3(0.01, 0.01, 0.01);
				task.loadedMeshes[0].rotation = new Vector3(0, 0, 0);
			};
			this.#assetsMngr.addMeshTask('Monitor', null, MODELS_URL, 'monitor.obj');

			// Textures
			// this.#assetsMngr.addTextureTask('Floor', './textures/stone-floor.jpg');
			this.#assetsMngr.addTextureTask('FloorARM', './textures/concrete_floor_worn_001_arm_4k.jpg');
			this.#assetsMngr.addTextureTask('FloorDiff', './textures/concrete_floor_worn_001_diff_4k.jpg');
			this.#assetsMngr.addTextureTask('FloorNor', './textures/concrete_floor_worn_001_nor_gl_4k.jpg');

			this.#assetsMngr.addTextureTask('DenimARM', './textures/denim_fabric_02_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('DenimDiff', './textures/denim_fabric_02_diff_2k.jpg');
			this.#assetsMngr.addTextureTask('DenimNor', './textures/denim_fabric_02_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('FabricARM', './textures/fabric_pattern_07_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('FabricDiff', './textures/fabric_pattern_07_col_1_2k.jpg');
			this.#assetsMngr.addTextureTask('FabricNor', './textures/fabric_pattern_07_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('PlywoodARM', './textures/plywood_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('PlywoodDiff', './textures/plywood_diff_2k.jpg');
			this.#assetsMngr.addTextureTask('PlywoodNor', './textures/plywood_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('LeatherRedARM', './textures/leather_red_02_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('LeatherRedDiff', './textures/leather_red_02_coll1_2k.jpg');
			this.#assetsMngr.addTextureTask('LeatherRedNor', './textures/leather_red_02_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('LeatherWhiteARM', './textures/leather_white_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('LeatherWhiteDiff', './textures/leather_white_diff_2k.jpg');
			this.#assetsMngr.addTextureTask('LeatherWhiteNor', './textures/leather_white_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('WornWoodARM', './textures/wood_table_worn_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('WornWoodDiff', './textures/wood_table_worn_diff_2k.jpg');
			this.#assetsMngr.addTextureTask('WornWoodNor', './textures/wood_table_worn_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('WoodPeelingPaintWeatheredARM', './textures/wood_peeling_paint_weathered_arm_2k.jpg');
			this.#assetsMngr.addTextureTask('WoodPeelingPaintWeatheredDiff', './textures/wood_peeling_paint_weathered_diff_2k.jpg');
			this.#assetsMngr.addTextureTask('WoodPeelingPaintWeatheredNor', './textures/wood_peeling_paint_weathered_nor_gl_2k.jpg');

			this.#assetsMngr.addTextureTask('Banner1', './textures/banner1.webp');
			this.#assetsMngr.addTextureTask('Banner2', './textures/banner2.webp');
			this.#assetsMngr.addTextureTask('Banner3', './textures/banner3.webp');

			this.#assetsMngr.addTextureTask('ZalariLogo', './textures/zalari-logo.png');

			// this.#assetsMngr.addHDRCubeTextureTask('Skybox', './environment/autumn_field_puresky_2k.hdr', 2048);
			// this.#assetsMngr.addHDRCubeTextureTask('Skybox', './environment/zwinger_night_16k.hdr', 4096);

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
				if (task instanceof HDRCubeTextureAssetTask) {
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

	getHDRCubeTexture(key: string): HDRCubeTexture | undefined {
		return this.#assets.get(key) as HDRCubeTexture;
	}

}
