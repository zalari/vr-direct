import { MeshBuilder, PBRMaterial, Vector3, type Scene, type Texture } from 'babylonjs';
import type { Assets } from './Assets';

export function createDiorama(scene: Scene, assets: Assets) {
	// Create a ground
	const ground = MeshBuilder.CreateGround('Ground', { width: 10, height: 10 }, scene);
	const groundMat = createPBRMaterial('GroundMat', scene, assets.getTexture('FloorDiff') as Texture, assets.getTexture('FloorNor') as Texture, assets.getTexture('FloorARM') as Texture, 2);
	ground.material = groundMat;
	ground.isPickable = false;

	// Move meshes, apply textures, etc.
	const banner = assets.getMesh('Banner');
	const banner2 = banner?.clone('Banner', null);
	const banner3 = banner?.clone('Banner', null);
	if (banner) {
		banner.position = new Vector3(-0.8, 0, -3.5);
		banner.rotation = new Vector3(0, -2.3, 0);
		const mat = new PBRMaterial('Banner1', scene);
		mat.albedoTexture = assets.getTexture('Banner1') as Texture;
		mat.roughness = 1;
		const A = banner.getChildMeshes().find((m) => m.name === 'Cube_6_2.001_primitive1');
		if (A) A.material = mat;
	}
	if (banner2) {
		banner2.name = 'Banner2';
		banner2.position = new Vector3(-1.6, 0, -2.1);
		banner2.rotation = new Vector3(0, -2, 0);
		const mat = new PBRMaterial('Banner2', scene);
		mat.albedoTexture = assets.getTexture('Banner2') as Texture;
		mat.roughness = 1;
		const B = banner2.getChildMeshes().find((m) => m.name === 'Banner.Banner.001.Cube_6_2.001.Cube_6_2.001_primitive1');
		if (B) B.material = mat;
	}
	if (banner3) {
		banner3.name = 'Banner3';
		banner3.position = new Vector3(-2, 0, -.625);
		banner3.rotation = new Vector3(0, -1.7, 0);
		const mat = new PBRMaterial('Banner3', scene);
		mat.albedoTexture = assets.getTexture('Banner3') as Texture;
		mat.roughness = 1;
		const C = banner3.getChildMeshes().find((m) => m.name === 'Banner.Banner.001.Cube_6_2.001.Cube_6_2.001_primitive1');
		if (C) C.material = mat;
	}

	const barstool = assets.getMesh('Barstool');
	const barstool2 = barstool?.clone('Barstool', null);
	const barstool3 = barstool?.clone('Barstool', null);
	const barstool4 = barstool?.clone('Barstool', null);
	const legsMat = createPBRMaterial('BarstoolLeg', scene, assets.getTexture('PlywoodDiff') as Texture, assets.getTexture('PlywoodNor') as Texture, assets.getTexture('PlywoodARM') as Texture);
	if (barstool) {
		barstool.position = new Vector3(1, 0, 0);
		barstool.rotation = new Vector3(0, 0, 0);
		const seat = barstool.getChildMeshes().find((m) => m.id === 'Seat')!;
		seat.material = createPBRMaterial('Barstool', scene, assets.getTexture('DenimDiff') as Texture, assets.getTexture('DenimNor') as Texture, assets.getTexture('DenimARM') as Texture);;
		const legs = barstool.getChildMeshes().find((m) => m.id === 'legs')!;
		legs.material = legsMat;
	}
	if (barstool2) {
		barstool2.name = 'Barstool2';
		barstool2.position = new Vector3(0, 0, 1);
		barstool2.rotation = new Vector3(0, 0, 0);
		const seat = barstool2.getChildMeshes().find((m) => m.id === 'Barstool.Barstool.Seat.Seat')!;
		seat.material = createPBRMaterial('Barstool', scene, assets.getTexture('FabricDiff') as Texture, assets.getTexture('FabricNor') as Texture, assets.getTexture('FabricARM') as Texture);;
		const legs = barstool2.getChildMeshes().find((m) => m.id === 'Barstool.Barstool.legs.legs')!;
		legs.material = legsMat;
	}
	if (barstool3) {
		barstool3.name = 'Barstool3';
		barstool3.position = new Vector3(0, 0, -1);
		barstool3.rotation = new Vector3(0, 0, 0);
		const seat = barstool3.getChildMeshes().find((m) => m.id === 'Barstool.Barstool.Seat.Seat')!;
		seat.material = createPBRMaterial('Barstool', scene, assets.getTexture('LeatherWhiteDiff') as Texture, assets.getTexture('LeatherWhiteNor') as Texture, assets.getTexture('LeatherWhiteARM') as Texture);
		const legs = barstool3.getChildMeshes().find((m) => m.id === 'Barstool.Barstool.legs.legs')!;
		legs.material = legsMat;
	}
	if (barstool4) {
		barstool4.name = 'Barstool4';
		barstool4.position = new Vector3(-1, 0, 0);
		barstool4.rotation = new Vector3(0, 0, 0);
		const seat = barstool4.getChildMeshes().find((m) => m.id === 'Barstool.Barstool.Seat.Seat')!;
		seat.material = createPBRMaterial('Barstool', scene, assets.getTexture('LeatherRedDiff') as Texture, assets.getTexture('LeatherRedNor') as Texture, assets.getTexture('LeatherRedARM') as Texture);
		const legs = barstool4.getChildMeshes().find((m) => m.id === 'Barstool.Barstool.legs.legs')!;
		legs.material = legsMat;
	}

	const table = assets.getMesh('Table');
	if (table) {
		const top = table.getChildMeshes().find((m) => m.id === 'TableTop')!;
		top.material = createPBRMaterial('Barstool', scene, assets.getTexture('WornWoodDiff') as Texture, assets.getTexture('WornWoodNor') as Texture, assets.getTexture('WornWoodARM') as Texture);;
	}
	const flag = assets.getMesh('Flag');
	if (flag) {
		const m = new PBRMaterial('Flag', scene);
		const t = assets.getTexture('ZalariLogo') as Texture;
		t.wAng = -(Math.PI / 2);
		t.vAng = -.1;
		m.albedoTexture = t;
		m.roughness = 1;
		flag.getChildMeshes().find((m) => m.id === 'Flag___Wind_Def')!.material = m;
	}

	const monitor = assets.getMesh('Monitor');
	if (monitor) {
		monitor.position = new Vector3(-2, 1.2, 2);
		monitor.rotation = new Vector3(0, 2, 0);
	}
}

function createPBRMaterial(name: string, scene: Scene, albedoTexture: Texture, bumpTexture: Texture, metallicTexture: Texture, UVScale?: number) {
	const mat = new PBRMaterial(name, scene);
	mat.albedoTexture = albedoTexture;
	mat.bumpTexture = bumpTexture;
	mat.invertNormalMapX = true;
	mat.invertNormalMapY = true;
	mat.metallicTexture = metallicTexture;
	mat.useAmbientOcclusionFromMetallicTextureRed = true;
	mat.useRoughnessFromMetallicTextureGreen = true;
	mat.useMetallnessFromMetallicTextureBlue = true;
	if (UVScale) {
		(mat.albedoTexture as Texture).uScale! = UVScale;
		(mat.albedoTexture as Texture).vScale! = UVScale;
		(mat.bumpTexture as Texture).uScale! = UVScale;
		(mat.bumpTexture as Texture).vScale! = UVScale;
		(mat.metallicTexture as Texture).uScale! = UVScale;;
		(mat.metallicTexture as Texture).vScale! = UVScale;;
	}
	return mat;
}
