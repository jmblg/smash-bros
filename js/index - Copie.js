import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// Créer une scène, une caméra et un rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Ajouter le rendu au body

// Créer un dégradé bleu comme fond de scène
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dessiner un dégradé sur le canvas
const context = canvas.getContext('2d');
const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, 'rgb(0, 122, 204)'); // Bleu foncé en haut
gradient.addColorStop(1, 'rgb(135, 206, 235)'); // Bleu clair en bas
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

// Créer une texture à partir du canvas
const texture = new THREE.CanvasTexture(canvas);

// Appliquer la texture comme arrière-plan de la scène
scene.background = texture;

// Lumière
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

// Positionner la caméra pour mieux voir le cube
camera.position.y = 0;
camera.position.z = -5;

// Charger le château FBX
let castleModel;
let castleModeldirection = "right";
const textureLoader = new THREE.TextureLoader();
let textures = [];

    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario173a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario01_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario02_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_floating_plate_lit.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario05a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario10a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario11_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112b_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112_2_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario12_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_main_ring_lit.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smariopa_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario18a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario21_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smariopa_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_carpet_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_carpet_nor.png'));

 /* 
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario01_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario02_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario04a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario11_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario18a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario22a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario052_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112_2_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112b_ao.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112b_mtl.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112b_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112b_rgh.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bnsmy_mc64_smario112b_spc.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/bumperf1.00_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/dammy_white8bit_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_cube_specular_0.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_cube_specular_1.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_cube_specular_2.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_cube_specular_3.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_cube_specular_4.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_cube_specular_5.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_yuka_cube_specular_0.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_yuka_cube_specular_1.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_yuka_cube_specular_2.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_yuka_cube_specular_3.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_yuka_cube_specular_4.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mario_castle64_yuka_cube_specular_5.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_bg1_4_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_carpet_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_carpet_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_move_bake_lit.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_ring_bake_lit.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_ring_indirect_bake_lit.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_rope_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario01_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario01_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario02_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario02_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario04a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario05a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario10a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario11_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario11_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario12_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario21_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario22a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario23_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario052_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario112_2_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario112_2_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario112b_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario112b_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_smario173a_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_surinuke_bake_lit.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_triangle_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_triangle_nor.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/mc64_white32_col.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/transition_background01_con.png'));
    textures.push(textureLoader.load('mdl/peach_castle/Textures/transition_ground01_con.png'));
    */

const loader = new FBXLoader();
loader.load(
  'mdl/peach_castle/Battlefield/main_ring_set.fbx',
  (fbx) => {
    // Le modèle est chargé avec succès
    castleModel = fbx; // Stocker le modèle dans la variable
    scene.add(castleModel); // Ajouter le modèle FBX à la scène

    // Optionnel : Ajuste la taille et la position du modèle si nécessaire
    castleModel.scale.set(1, 1, 1);
    castleModel.position.set(0, -12.5, 0);
    castleModel.rotation.x = Math.PI / 2;

    // Remplacer le matériau du modèle pour appliquer une couleur
    let textureIndex = 0;
    castleModel.traverse((child) => {
        if (child.isMesh) {
        if (textureIndex < textures.length) {
            child.material = new THREE.MeshStandardMaterial({ map: textures[textureIndex] });
            textureIndex++;
         }
        }
    });
  },
);

let startZ = -10, startY = 0;
let endZ = 85, endY = -10;
let duration = 2000;  // Durée de l'animation en millisecondes
let startTime = null;
function animateCameraPosition() {
  if (!startTime) startTime = performance.now();  // Initialisation du moment de départ

  const currentTime = performance.now();  // Moment actuel
  const elapsedTime = currentTime - startTime;  // Temps écoulé depuis le début de l'animation
  
  // Calcul de la progression de l'animation (entre 0 et 1)
  const progress = Math.min(elapsedTime / duration, 1);  
  
  // Calcul de la position intermédiaire de la caméra
  camera.position.z = startZ + (endZ - startZ) * progress;
  camera.position.y = startY + (endY - startY) * progress;

  // Si l'animation n'est pas terminée, continuer l'animation
  if (progress < 1) {
    requestAnimationFrame(animateCameraPosition);  // Appel récursif pour la prochaine frame
  }
}

// Fonction d'animation pour faire tourner le modèle et le cube
function animate() {
    requestAnimationFrame(animate);

    // Si le modèle a été chargé, faire tourner le modèle
    if (castleModel) {
        if (castleModeldirection == "right") {
            if (castleModel.rotation.z < 0.5) {
                castleModel.rotation.z += 0.001;
                castleModel.rotation.y -= 0.00025;
                castleModel.rotation.x += 0.00025;
            }
            else {
                castleModeldirection = "left";
            }
        } else {
            if (castleModel.rotation.z > -0.5) {
                castleModel.rotation.z -= 0.001;
                castleModel.rotation.y += 0.00025;
                castleModel.rotation.x -= 0.00025;
            }
            else {
                castleModeldirection = "right";
            }
        }
    }

    // Rendre la scène avec la caméra
    renderer.render(scene, camera);
}

// Démarrer l'animation
animate();



////// API

class Characters {

    constructor(id, name, availability) {
        this.id = id;
        this.name = name;

        this.name_url = this.name.toLowerCase();
        this.name_url = this.name_url.replaceAll(". ","_");
        this.name_url = this.name_url.replaceAll(" ","_");
        this.name_url = this.name_url.replaceAll("-","_");
        this.name_url = this.name_url.replaceAll("é","e");
        this.name_url = this.name_url.replaceAll("&","and");
        this.name_url = this.name_url.replaceAll("jr.","jr");
        if (this.name_url == "isabelle") { this.name_url = "shizue"; }
        if (this.name_url == "r.o.b.") { this.name_url = "rob"; }
        if (this.name_url == "mii_brawler") { this.name_url = "mii_fighter"; }
        if (this.name_url == "mii_swordfighter") { this.name_url = "mii_fighter"; }
        if (this.name_url == "mii_gunner") { this.name_url = "mii_fighter"; }
        if (this.name_url == "hero") { this.name_url = "dq_" + this.name_url; }
        if (this.name_url == "incineroar") { this.name_url = "gaogaen"; }
        if (this.name_url == "piranha_plant") { this.name_url = "packun_flower"; }
        if (this.name_url == "min_min") { this.name_url = "minmin"; }

        this.img = `img/characters/main/${this.name_url}.png`;
    //    this.img = `https://www.smashbros.com/assets_v2/img/fighter/${this.name_url}/main.png`;
        this.img_thumb_v = `img/characters/thumb_v/${this.name_url}.png`;
    //    this.img_thumb_v = `https://www.smashbros.com/assets_v2/img/fighter/thumb_v/${this.name_url}.png`;
        this.img_thumb_h = `img/characters/thumb_h/${this.name_url}.png`;
    //    this.img_thumb_h = `https://www.smashbros.com/assets_v2/img/fighter/thumb_h/${this.name_url}.png`;

        this.availability = availability;

        let attributesT = this.build_attributes();
        this.force = attributesT[0];
        this.defense = attributesT[1];
        this.endurance = attributesT[2];
        this.agility = attributesT[3];
        this.wisdom = attributesT[4];

        // Si Mario :
        if (id == 1) {
            this.force = 3;
            this.defense = 3;
            this.endurance = 3;
            this.agility = 3;
            this.wisdom = 3;
        }
    }

    // cette méthode va permettre d'équilibre répartition des attributs :
    build_attributes() {
        let t = new Array(1,1,1,1,1);
        let cpt = 10;
        while (cpt != 0) {
            let nb = nbralet(0, 5);
            if (t[nb] < 5) { t[nb]++; cpt--; }
        }
        return t;
    }
}

class Hits {
    static id = 1;

    constructor(name, type, power) {
        this.id = Hits.id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.img = `img/items/${name}.png`;

        Hits.id++;
    }
}

const apiUrl = 'http://localhost:3000/api/v1/ultimate/characters';

let characterst = new Array();
let hitst = new Array();
let star = new Image(); star.src = "img/hud/star.png";
let heart = new Image(); heart.src = "img/hud/heart.png";

hitst.push(new Hits("barrel", "attack", 500));
hitst.push(new Hits("beam_sword", "attack", 400));
hitst.push(new Hits("bob-omb", "attack", 1000));
hitst.push(new Hits("bunny_hood", "speed", 0));
hitst.push(new Hits("flower", "attack", 450));
hitst.push(new Hits("gun", "attack", 350));
hitst.push(new Hits("hammer", "speed", 850));
hitst.push(new Hits("mushroom", "speed", 0));
hitst.push(new Hits("shell", "attack", 750));
hitst.push(new Hits("shield", "defense", 0));

// Fonction pour récupérer tous les personnages
async function getAllCharacters() {
    try {
        const answer = await fetch(apiUrl);
        if (!answer.ok) {
            throw new Error('Erreur de chargement des personnages');
        }
        const answert = await answer.json();
        displayCharacterList(answert);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour afficher la liste des personnages sur la page
function displayCharacterList(answert) {
    const container = document.getElementById('character-container');
    let charactersList = "";
    let curl = "";

    answert.forEach(character => {
        characterst.push(new Characters(character.order, character.name.toLowerCase(), character.availability));
        let t = characterst[characterst.length-1];

        charactersList += `
            <div id='character-container-blocks-id-${t.id}' class='character-container-blocks inline-block mt-0 w-30'>
                <div class="relative">
                    <img src="${t.img_thumb_v}" alt="${t.name} Portrait" class="duration-200 hover:scale-110 cursor-pointer w-full" />
                    <div class='absolute bottom-1 left-1 bg-red-500 text-white font-bold rounded-full w-12 p-3'>${t.id}</div>
                </div>
                <h4 class="text-base font-bold font-mono break-words overflow-hidden max-w-full">${t.name}</h4>
            </div>
        `;
        curl += `curl -o ${t.name_url}.png ${t.img}`;
        curl += `\n`;
    });

    container.innerHTML = charactersList;
//    console.log(curl);
}

let characterO = null;
let characterOpponentO = null;

function beforeStart(id) {
    // Vérifie si le personnage a bien été trouvé
    characterO = characterst.find(o => o.id.toString() === id.toString());
    characterOpponentO = characterst[nbralet(0,characterst.length-1)];

    characterO.lives = 5;
    characterOpponentO.lives = 5;

    document.getElementById("characters").style.display = "none";

    document.getElementById("before-start-character-h2").textContent = characterO.name;
    document.getElementById("before-start-character-img").src = characterO.img;
    document.getElementById("before-start-character_opponent-h2").textContent = characterOpponentO.name;
    document.getElementById("before-start-character_opponent-img").src = characterOpponentO.img;

    document.getElementById("before-start").style.display = "inline";
}

function fight() {
    // faire reculer caméra :
    animateCameraPosition();

    fight_build_card(characterO,"");
    fight_build_card(characterOpponentO,"_opponent");

    fight_build_hits(characterO,"");
    fight_build_hits(characterOpponentO,"_opponent");

    document.getElementById("before-start").style.display = "none";
    document.getElementById("fight").style.display = "inline";
}

function fight_build_card(o, who) {
    document.getElementById("fight-character" + who + "-card-img").src = o.img_thumb_h;
    document.getElementById("fight-character" + who + "-card-name").textContent = o.name;
    let html = "";
    for (let i = 0; i < o.force; i++) {
        html += "<img src='" + star.src + "' class='inline-block w-5 mr-1' />";
      }
    document.getElementById("fight-character" + who + "-force").innerHTML = html;
    html = "";
    for (let i = 0; i < o.defense; i++) {
        html += "<img src='" + star.src + "' class='inline-block w-5 mr-1' />";
      }
    document.getElementById("fight-character" + who + "-defense").innerHTML = html;
    html = "";
    for (let i = 0; i < o.endurance; i++) {
        html += "<img src='" + star.src + "' class='inline-block w-5 mr-1' />";
      }
    document.getElementById("fight-character" + who + "-endurance").innerHTML = html;
    html = "";
    for (let i = 0; i < o.agility; i++) {
        html += "<img src='" + star.src + "' class='inline-block w-5 mr-1' />";
      }
    document.getElementById("fight-character" + who + "-agility").innerHTML = html;
    html = "";
    for (let i = 0; i < o.wisdom; i++) {
        html += "<img src='" + star.src + "' class='inline-block w-5 mr-1' />";
      }
    document.getElementById("fight-character" + who + "-wisdom").innerHTML = html;

    html = "";
    for (let i = 0; i < o.lives; i++) {
        html += "<img src='" + heart.src + "' class='inline-block w-5 mr-1' />";
      }
    document.getElementById("fight-character" + who + "-card-lives").innerHTML = html;
}

function fight_build_hits(o, who) {
    for (let i = 1; i < 5; i++) {
        let html = "<img src='" + hitst[nbralet(0,hitst.length-1)].img + "' class='w-full' />";
        document.getElementById("fight-character" + who + "-hit-" + i).innerHTML = html;
       }
}

function nbralet(min,max) {
	return Math.floor(Math.random() * max) + min;
	}

document.addEventListener('DOMContentLoaded', function() {
    let m = null;
    m = document.querySelector("main");
    m.addEventListener('click', function(event) {
        // La méthode closest() permet de remonter l'arbre DOM et de trouver le premier élément parent qui correspond au sélecteur donné
        const targetBlock = event.target.closest('.character-container-blocks');
        if (targetBlock) {
                let id = targetBlock.id.replace("character-container-blocks-id-", "").toString();
                beforeStart(id);
            }
        });
    
    m =  document.getElementById("before-start");
    m.addEventListener('click', function(event) {
        fight();
        });
});

window.onload = function() {
    getAllCharacters(); // Appel de la fonction une fois la page complètement chargée
};