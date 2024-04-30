import { MeshBuilder, MultiMaterial, StandardMaterial, Vector3, type Scene, type Texture } from 'babylonjs';
import type { Assets } from './Assets';

export function createDiorama(scene: Scene, assets: Assets) {
	// Create a ground
	const ground = MeshBuilder.CreateGround('Ground', { width: 10, height: 10 }, scene);
	const groundMat = new StandardMaterial('GroundMat', scene);
	const texture = assets.getTexture('Floor') as Texture;
	texture.uScale = 2;
	texture.vScale = 2;
	groundMat.diffuseTexture = texture;
	ground.material = groundMat;

	// Move meshes, apply textures, etc.
	const banner = assets.getMesh('Banner');
	const banner2 = banner?.clone('Banner', null);
	const banner3 = banner?.clone('Banner', null);
	if (banner) {
		banner.position = new Vector3(-1.5, 0, -2);
		banner.rotation = new Vector3(0, -2, 0);
		const stdMat = new StandardMaterial('Banner1', scene);
		stdMat.diffuseTexture = assets.getTexture('Banner1') as Texture;
		const A = banner.getChildMeshes().find((m) => m.name === 'Cube_6_2.001_primitive1')
		if (A) A.material = stdMat;
	}
	if (banner2) {
		banner2.name = 'Banner2';
		banner2.position = new Vector3(-1.5, 0, 2);
		banner2.rotation = new Vector3(0, -1, 0);
		const stdMat = new StandardMaterial('Banner2', scene);
		stdMat.diffuseTexture = assets.getTexture('Banner2') as Texture;
		const B = banner2.getChildMeshes().find((m) => m.name === 'Banner.Banner.001.Cube_6_2.001.Cube_6_2.001_primitive1');
		if (B) B.material = stdMat;
	}
	if (banner3) {
		banner3.name = 'Banner3';
		banner3.position = new Vector3(-0.5, 0, -3.6);
		banner3.rotation = new Vector3(0, -2.3, 0);
		const stdMat = new StandardMaterial('Banner3', scene);
		stdMat.diffuseTexture = assets.getTexture('Banner3') as Texture;
		const C = banner3.getChildMeshes().find((m) => m.name === 'Banner.Banner.001.Cube_6_2.001.Cube_6_2.001_primitive1');
		if (C) C.material = stdMat;
	}

	const barstool = assets.getMesh('Barstool');
	if (barstool) {
		barstool.position = new Vector3(1, 0, 0);
	}
	const barstool2 = barstool?.clone('Barstool', null);
	if (barstool2) {
		barstool2.name = 'Barstool2';
		barstool2.position = new Vector3(0, 0, 1);
	}
	const barstool3 = barstool?.clone('Barstool', null);
	if (barstool3) {
		barstool3.name = 'Barstool3';
		barstool3.position = new Vector3(0, 0, -1);
	}
	const barstool4 = barstool?.clone('Barstool', null);
	if (barstool4) {
		barstool4.name = 'Barstool4';
		barstool4.position = new Vector3(-1, 0, 0);
	}

	// Monitor
	// meshes[0].position = new Vector3(-1.8, 1, 0);
	// meshes[0].rotation = new Vector3(0, 1.57, 0);
}
