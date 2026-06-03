import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        // Try loading a female character model first; fallback to default if unavailable
        let encryptedBlob: ArrayBuffer | null = null;
        try {
          encryptedBlob = await decryptFile(
            "./models/character.enc",
            "Character3D#@"
          );
          console.info("Loaded female character model (character_female.enc).");
        } catch (e) {
          // Female model not available — use programmatic female placeholder instead
          console.warn(
            "Female character model not found or failed to decrypt — using programmatic female placeholder.",
            e
          );
          encryptedBlob = null;
        }
        // If we have an encrypted blob, try to load it as GLTF. Otherwise create a simple female placeholder.
        let character: THREE.Object3D | null = null;
        const createPlaceholder = async () => {
          const group = new THREE.Group();
          // head
          const headMat = new THREE.MeshStandardMaterial({ color: 0xffd1c1 });
          const head = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), headMat);
          head.position.set(0, 6.2, 0);
          head.name = "head";
          group.add(head);

          // hair (simple cap)
          const hairMat = new THREE.MeshStandardMaterial({ color: 0x2b1b0b });
          const hair = new THREE.Mesh(new THREE.SphereGeometry(1.28, 32, 16, 0, Math.PI * 2, 0, Math.PI / 1.9), hairMat);
          hair.position.set(0, 6.25, 0);
          hair.name = "hair";
          group.add(hair);

          // body
          const bodyMat = new THREE.MeshStandardMaterial({ color: 0x7b5a4b });
          const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 3.5, 32), bodyMat);
          body.position.set(0, 3.4, 0);
          body.name = "body";
          group.add(body);

          // legs (as boxes) with footR / footL named so timelines don't break
          const legMat = new THREE.MeshStandardMaterial({ color: 0x3b2b2b });
          const footR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 1.2), legMat);
          footR.position.set(-0.45, 0.6, 0);
          footR.name = "footR";
          group.add(footR);
          const footL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 1.2), legMat);
          footL.position.set(0.45, 0.6, 0);
          footL.name = "footL";
          group.add(footL);

          // arms
          const armMat = new THREE.MeshStandardMaterial({ color: 0x8b5e3c });
          const armR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.2, 0.6), armMat);
          armR.position.set(-1.6, 3.8, 0);
          armR.rotation.z = 0.1;
          armR.name = "armR";
          group.add(armR);
          const armL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.2, 0.6), armMat);
          armL.position.set(1.6, 3.8, 0);
          armL.rotation.z = -0.1;
          armL.name = "armL";
          group.add(armL);

          group.position.set(0, 0, 0);
          await renderer.compileAsync(group, camera, scene);
          return group;
        };

        try {
          if (encryptedBlob) {
            const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
            loader.load(
              blobUrl,
              async (gltf) => {
                character = gltf.scene;
                await renderer.compileAsync(character, camera, scene);
                character.traverse((child: any) => {
                  if (child.isMesh) {
                    const mesh = child as THREE.Mesh;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    mesh.frustumCulled = true;
                  }
                });
                resolve(gltf);
                setCharTimeline(character, camera);
                setAllTimeline();
                try {
                  character!.getObjectByName("footR")!.position.y = 3.36;
                  character!.getObjectByName("footL")!.position.y = 3.36;
                } catch (e) {
                  // ignore if feet aren't named in model
                }
                dracoLoader.dispose();
              },
              undefined,
              async (error) => {
                console.error("Error loading GLTF model, using placeholder:", error);
                const placeholder = await createPlaceholder();
                const fakeGltf = { scene: placeholder, animations: [] } as unknown as GLTF;
                character = placeholder;
                resolve(fakeGltf);
                setCharTimeline(character, camera);
                setAllTimeline();
                dracoLoader.dispose();
              }
            );
          } else {
            const placeholder = await createPlaceholder();
            const fakeGltf = { scene: placeholder, animations: [] } as unknown as GLTF;
            character = placeholder;
            resolve(fakeGltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            dracoLoader.dispose();
          }
        } catch (loadErr) {
          console.error("Character load failed, using placeholder.", loadErr);
          try {
            const placeholder = await createPlaceholder();
            const fakeGltf = { scene: placeholder, animations: [] } as unknown as GLTF;
            character = placeholder;
            resolve(fakeGltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            dracoLoader.dispose();
          } catch (placeholderErr) {
            reject(placeholderErr);
          }
        }
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
