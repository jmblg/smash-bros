import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Ajouter le rendu au body

// Dégradé bleu pour le ciel
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
scene.background = texture;

// Lumière
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

// Caméra
camera.position.y = 0;
camera.position.z = 2000;

// Feu d'artifice
let fireworksVideo, fireworksTexture, fireworksSprite, fireworksFight;
fireworksVideo = document.createElement('video'); // Créer un élément vidéo HTML
fireworksVideo.src = "img/effects/firework.webm"; 
fireworksVideo.load();
fireworksVideo.play();
fireworksVideo.loop = true;
fireworksTexture = new THREE.VideoTexture(fireworksVideo);
const fireworksSpriteMaterial = new THREE.SpriteMaterial({
  map: fireworksTexture,
  transparent: true,
  opacity: 1,
});
fireworksSprite = new THREE.Sprite(fireworksSpriteMaterial);
fireworksSprite.scale.set(20, 20, 1);  // Ajuste selon la taille souhaitée
fireworksSprite.position.set(10, 10, 0);
fireworksSprite.visible = false;
scene.add(fireworksSprite);

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

        this.snd = new Audio(`snd/characters/${this.name_url}.wav`);

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

const apiUrl = 'json/characters.json';

let characterst = new Array();
let hitst = new Array();
let star = new Image(); star.src = "img/hud/star.png";
let heart = new Image(); heart.src = "img/hud/heart.png";

let fightEnd = false;

hitst.push(new Hits("barrel", "attack", 500));
hitst.push(new Hits("beam_sword", "attack", 400));
hitst.push(new Hits("bob-omb", "attack", 1000));
hitst.push(new Hits("bunny_hood", "speed", 0));
hitst.push(new Hits("flower", "attack", 450));
hitst.push(new Hits("gun", "attack", 350));
hitst.push(new Hits("hammer", "attack", 850));
hitst.push(new Hits("mushroom", "speed", 0));
hitst.push(new Hits("shell", "attack", 750));
hitst.push(new Hits("shield", "defense", 0));
hitst.push(new Hits("punch", "attack", 200));
hitst.push(new Hits("green_block", "defense", 200));
hitst.push(new Hits("spicy_curry", "speed", 200));
hitst.push(new Hits("missile", "attack", 200));

let music = new Audio("snd/theme/theme.mp3");
music.volume = 0.5;
music.loop = true;

let item_snd = new Audio("snd/item/get.wav")

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
    const container = document.getElementById("character-container");
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

    characterO.lives = characterO.wisdom; characterOpponentO.lives = characterOpponentO.wisdom;
    characterO.energy = characterO.endurance * 20; characterOpponentO.energy = characterOpponentO.endurance * 20;
    characterO.turns = 1; characterOpponentO.turns = 1;

    characterO.snd.play();
    setTimeout(function() {
        characterOpponentO.snd.play();
    }, 1500);

    document.getElementById("characters").style.display = "none";

    document.getElementById("before-start-character-h2").textContent = characterO.name;
    document.getElementById("before-start-character-img").src = characterO.img;
    document.getElementById("before-start-character_opponent-h2").textContent = characterOpponentO.name;
    document.getElementById("before-start-character_opponent-img").src = characterOpponentO.img;

    document.getElementById("before-start").style.display = "inline";
}

function fight() {
    // faire reculer caméra :
    startZ = -10, startY = 0;
    endZ = 85, endY = -10;
    duration = 2000;  // Durée de l'animation en millisecondes
    startTime = null;
    animateCameraPosition();

    fight_build_card(characterO,"");
    fight_build_card(characterOpponentO,"_opponent");

    fight_build_energy(characterO,"");
    fight_build_energy(characterOpponentO,"_opponent");

    fight_build_hits("");
    fight_build_hits("_opponent");

    setTimeout(function() {
            document.getElementById("fight-character-hits-table").classList.add("fight-character-hits-table-left");
        }, 100);

    fightAlert(`Player 1 (${characterO.name.toUpperCase()}), choose your attack !`);

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

    fight_build_lives(o, who);
}

function fight_build_hits(who) {
    for (let i = 1; i < 5; i++) {
        let html = "";
        let o = hitst[nbralet(0,hitst.length)];
        html += "<img src='" + o.img + "' class='w-full' />";
        html += "<input id='fight-character" + who + "-hit-id-" + i + "' type='hidden' value='" + o.id + "' />";
        document.getElementById("fight-character" + who + "-hit-" + i).innerHTML = html;
       }
}

function fight_build_energy(o, who) {
    let html = "";
    let hLevel = 0, vLevel = 0;
    for (let i = 0; i < o.energy; i++) {
        if (i % 10 === 0 && i !== 0) { hLevel = 0; vLevel++; }
        let hVw = hLevel * 0.75, vVh = vLevel * 0.75;
        html += `<div class='absolute left-[${hVw}vw] top-[${vVh}vw] bg-emerald-400 w-[0.75vw] h-[0.75vw]'></div>`;
        hLevel++;
       }
    document.getElementById("fight-character" + who + "-card-energy").innerHTML = html;
}

function fight_build_lives(o, who) {
    let html = "";
    for (let i = 0; i < o.lives; i++) {
        html += "<img src='" + heart.src + "' class='inline-block w-5 mr-1' />";
    }
    document.getElementById("fight-character" + who + "-card-lives").innerHTML = html;
}

function fightHits(id, who) {
    if (fightEnd == false) {
        let id_hits = document.getElementById("fight-character" + who + "-hit-id-" + id).value;
        let hitsO = hitst.find(hit => hit.id === parseInt(id_hits));

        let o1, o2, who_opponent = "";

        document.getElementById("fight-character" + who + "-hit-" + id).innerHTML = "";

        if (who == "") {
            o1 = characterO;
            o2 = characterOpponentO;
            who_opponent = "_opponent";

            document.getElementById("fight-character-hits-table").classList.remove("fight-character-hits-table-left");

            document.getElementById("fight-hit-img").classList.remove("animate-heartbeat-mirror");
            document.getElementById("fight-hit-img").classList.add("animate-heartbeat");
        } else {
            o1 = characterOpponentO;
            o2 = characterO;

            document.getElementById("fight-character_opponent-hits-table").classList.remove("fight-character-hits-table-right");
            
            document.getElementById("fight-hit-img").classList.remove("animate-heartbeat");
            document.getElementById("fight-hit-img").classList.add("animate-heartbeat-mirror");
        }

        switch (hitsO.type) {
            case "attack" :
                // adversaire peut éviter attaque :
                if (o2.agility > nbralet(1, 
                    12)) {
                    fightAlert(`${o2.name.toUpperCase()} avoided the attack of ${o1.name.toUpperCase()}`);
                } else {
                    fireworksSprite.visible = true;

                    fightAlert(`${o1.name.toUpperCase()} is attacking ${o2.name.toUpperCase()}.`);

                    setTimeout(function(){
                        let defenseLevel = 10 - o2.defense; defenseLevel *= 2;
                        let forceLevel = o1.force;
                        o2.energy = o2.energy-defenseLevel;
                        o2.energy -= forceLevel;
                        fight_build_energy(o2, who_opponent);
                        if (o2.energy <= 0) {
                            o2.lives--;
                            fight_build_lives(o2, who_opponent);
                            if (o2.lives <= 0) {
                                fightEnd = true;
                                o1.snd.play();
                                fightAlert(`${o1.name.toUpperCase()} won the game`);

                                startZ = camera.position.z, startY = camera.position.y;
                                endZ = 1750, endY = -20;
                                duration = 2000;  // Durée de l'animation en millisecondes
                                startTime = null;
                                animateCameraPosition();

                                document.getElementById("winner-start-character-img").src = o1.img;
                                document.getElementById("winner-h2").textContent = `${o1.name.toUpperCase()} won the game`;

                                document.getElementById("fight").style.display = "none";
                                document.getElementById("winner").style.display = "block";
                            } else {
                                o2.energy = o2.endurance * 20; fight_build_energy(o2, who_opponent);
                            }
                        }
                    }, 2000);
                }
            break;
            case "defense" :
                o1.defense++;
                let html = "";
                for (let i = 0; i < o1.defense; i++) {
                    html += "<img src='" + star.src + "' class='inline-block w-5 mr-1' />";
                }
                document.getElementById("fight-character" + who + "-defense").innerHTML = html;
                fightAlert(`${o1.name.toUpperCase()} is more resistant.`);
            break;
            case "speed" :
                o1.turns = 3; fightAlert(`${o1.name.toUpperCase()} can attack with 2 items.`);
            break;
        }

        if (fightEnd == false) {
            document.getElementById("fight-hit").style.display = "block";
            document.getElementById("fight-hit-img").src = hitsO.img;

            setTimeout(function(){
                fireworksSprite.visible = false;
                document.getElementById("fight-hit").style.display = "none";

                fightAlert("");

                let html = "";
                let hitsNewO = hitst[nbralet(0,hitst.length)];
                html += "<img src='" + hitsNewO.img + "' class='w-full' />";
                html += "<input id='fight-character" + who + "-hit-id-" + id + "' type='hidden' value='" + hitsNewO.id + "' />";
                document.getElementById("fight-character" + who + "-hit-" + id).innerHTML = html;

                if (o1.turns == 1) {
                    if (who == "") {
                        // au tour de l'opposant à attaquer !
                        let nb = nbralet(1, 4);
                        document.getElementById("fight-character_opponent-hits-table").classList.add("fight-character-hits-table-right");
                        setTimeout(function(){
                            fightHits(nb, "_opponent");
                        }, 1000);
                    } else {
                        document.getElementById("fight-character-hits-table").classList.add("fight-character-hits-table-left");
                    }
                } else {
                    o1.turns--;
                    if (who == "") {
                        document.getElementById("fight-character-hits-table").classList.add("fight-character-hits-table-left");
                    } else {
                        // au tour de l'opposant à attaquer !
                        let nb = nbralet(1, 4);
                        document.getElementById("fight-character_opponent-hits-table").classList.add("fight-character-hits-table-right");
                        setTimeout(function(){
                            fightHits(nb, "_opponent");
                        }, 1000);
                    }
                }
            }, 3000);
        }
    }
}

function fightAlert(msg) {
    document.getElementById("fight-alert-p").textContent = msg;
}

function nbralet(min,max) {
	return Math.floor(Math.random() * max) + min;
}

document.addEventListener("DOMContentLoaded", function() {
    let m = null;

    m =  document.getElementById("title");
    m.addEventListener('click', function(event) {
                music.play();

                startZ = 100, startY = camera.position.y;
                endZ = -5, endY = 0;
                duration = 1000;  // Durée de l'animation en millisecondes
                startTime = null;
                animateCameraPosition()

                document.getElementById("title").style.transition = "opacity 1.5s";
                document.getElementById("title").style.opacity = "0";

                document.getElementById("characters").style.display = "block"; 

                setTimeout(function() {
                    document.getElementById("title").style.display = "none";
                }, 1500);
            });

    m = document.querySelector("main");
    m.addEventListener("click", function(event) {
        // La méthode closest() permet de remonter l'arbre DOM et de trouver le premier élément parent qui correspond au sélecteur donné
        const targetBlock = event.target.closest(".character-container-blocks");
        if (targetBlock) {
                let id = targetBlock.id.replace("character-container-blocks-id-", "").toString();
                beforeStart(id);
            }

        const fightCharacterHits = event.target.closest(".fight-character-hits");
        if (fightCharacterHits) {
                let id = fightCharacterHits.id.replace("fight-character-hit-", "").toString();
                item_snd.play();

                fightHits(id, "");
            }
        });

    m =  document.getElementById("before-start");
    m.addEventListener('click', function(event) {
        fight();
        });
});

window.onload = function() {
    getAllCharacters();

    fireworksFight = setInterval(function(){
        fireworksSprite.scale.set(nbralet(5,50), nbralet(5,50), nbralet(5,50));  // Ajuste selon la taille souhaitée
        fireworksSprite.position.set(nbralet(-50,200), nbralet(5,20), nbralet(0,2));
    }, 150);
};