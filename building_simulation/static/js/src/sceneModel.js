var segments = 32;

var materialTypes = {
    DEFAULT: undefined,
    NEIGHBOR: new THREE.MeshLambertMaterial({color: 0x552B2B}),
    SELECTED: new THREE.MeshLambertMaterial({color: 0x555555}),
    FONT: new THREE.MeshPhongMaterial({color: 0xbbbbbb, shininess: 50, emissive: 0x222222}),

    HIGH_END_RESIDENTIAL: undefined,
    AFFORDABLE: undefined,
    CONVENIENCE: undefined,
    GROCERY: undefined,
    LOCAL: undefined,
    RESTAURANT: undefined,
    TOURISM: undefined,
    ARTISAN: undefined,
    COMMUNITY: undefined,
};

var textures = [
    { name: 'cubemap', key: 'DEFAULT' },
    { name: 'high-end', key: 'HIGH_END_RESIDENTIAL' },
    { name: 'affordable-housing', key: 'AFFORDABLE' },
    { name: 'convenience', key: 'CONVENIENCE' },
    { name: 'grocery', key: 'GROCERY' },
    { name: 'local-service', key: 'LOCAL' },
    { name: 'restaurant-bar', key: 'RESTAURANT' },
    { name: 'tourism', key: 'TOURISM' },
    { name: 'artisan', key: 'ARTISAN' },
    { name: 'community-equipment', key: 'COMMUNITY' },

];
(function loadAllTextures() {
    var s3url = 'https://s3.amazonaws.com/mit-cre-assets/building_simulation/';

    for (var i = textures.length - 1; i >= 0; i--) {
        var textureData = textures[i];
        // IIFE so textureData doesn't get messed up
        (function(textureData){
            var url = s3url + textureData.name + '.jpg';
            (new THREE.TextureLoader()).load(url, function(texture){
                materialTypes[textureData.key] = new THREE.MeshLambertMaterial({map: texture});
                buildScene();
            });
        })(textureData);
    }
})();

var sceneElements = typeof sceneModel !== 'undefined' ? sceneModel : {};

function setSceneElements(reset) {
    if(!sceneElements.core || reset) {
        sceneElements.core = {
            'firstFloor-1': {
                mitId: 'firstFloor-1',
                geometry: { l: 3, h: 5, w: 3, x: 0, y: -0.5, z: 1 },
                options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
            },
            'firstFloor-2': {
                mitId: 'firstFloor-2',
                geometry: { l: 3, h: 5, w: 3, x: 0, y: -0.5, z: -2 },
                options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
            },
            'firstFloor-3': {
                mitId: 'firstFloor-3',
                geometry: { l: 3, h: 5, w: 3, x: 0, y: -0.5, z: -5 },
                options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
            },
            'firstFloor-4': {
                mitId: 'firstFloor-4',
                geometry: { l: 3, h: 5, w: 3, x: -12, y: -0.5, z: 1 },
                options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
            },
            'firstFloor-5': {
                mitId: 'firstFloor-5',
                geometry: { l: 3, h: 5, w: 3, x: -12, y: -0.5, z: -2 },
                options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
            },
            'firstFloor-6': {
                mitId: 'firstFloor-6',
                geometry: { l: 3, h: 5, w: 3, x: -12, y: -0.5, z: -5 },
                options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
            },
            'firstFloor-7': {
                mitId: 'firstFloor-7',
                geometry: { l: 15, h: 5, w: 3, x: -6, y: -0.5, z: 4 },
                options: { type: 'commercial', multiplier: 3, material: 'DEFAULT' }
            },
            'firstFloor-8': {
                mitId: 'firstFloor-8',
                geometry: { l: 15, h: 5, w: 3, x: -6, y: -0.5, z: -8 },
                options: { type: 'commercial', multiplier: 3, material: 'DEFAULT' }
            },
            'secondFloor-1': {
                mitId: 'secondFloor-1',
                geometry: { l: 3, h: 4, w: 6, x: 0, y: 4.25, z: -0.5 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-2': {
                mitId: 'secondFloor-2',
                geometry: { l: 3, h: 4, w: 6, x: 0, y: 4.25, z: -6.5 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-3': {
                mitId: 'secondFloor-3',
                geometry: { l: 3, h: 4, w: 6, x: -12, y: 4.25, z: 2.5 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-4': {
                mitId: 'secondFloor-4',
                geometry: { l: 3, h: 4, w: 6, x: -12, y: 4.25, z: -3.5 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-5': {
                mitId: 'secondFloor-5',
                geometry: { l: 6, h: 4, w: 3, x: -1.5, y: 4.25, z: 4 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-6': {
                mitId: 'secondFloor-6',
                geometry: { l: 6, h: 4, w: 3, x: -7.5, y: 4.25, z: 4 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-7': {
                mitId: 'secondFloor-7',
                geometry: { l: 6, h: 4, w: 3, x: -4.5, y: 4.25, z: -8 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            },
            'secondFloor-8': {
                mitId: 'secondFloor-8',
                geometry: { l: 6, h: 4, w: 3, x: -10.5, y: 4.25, z: -8 },
                options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
            }
        };
    }

    if(!sceneElements.neighbors || reset) {
        sceneElements.neighbors = {
            'neighbors-1': {
                mitId: 'neighbors-1',
                geometry: { l: 15, h: 8, w: 10, x: -13, y: 0, z: 22 },
                options: { type: 'neighboring', multiplier: 0.11, material: 'NEIGHBOR', initialValue: 1200000 }
            },
            'neighbors-2': {
                mitId: 'neighbors-2',
                geometry: { l: 10, h: 8, w: 10, x: 12, y: 0, z: 25 },
                options: { type: 'neighboring', multiplier: 0.19, material: 'NEIGHBOR', initialValue: 2000000 }
            },
            'neighbors-3': {
                mitId: 'neighbors-3',
                geometry: { l: 10, h: 8, w: 20, x: 15, y: 0, z: 5 },
                options: { type: 'neighboring', multiplier: 0.07, material: 'NEIGHBOR', initialValue: 750000 }
            },
            'neighbors-4': {
                mitId: 'neighbors-4',
                geometry: { l: 10, h: 8, w: 10, x: 20, y: 0, z: -22 },
                options: { type: 'neighboring', multiplier: 0.17, material: 'NEIGHBOR', initialValue: 1750000 }
            },
            'neighbors-5': {
                mitId: 'neighbors-5',
                geometry: { l: 25, h: 8, w: 10, x: -5, y: 0, z: -23 },
                options: { type: 'neighboring', multiplier: 0.08, material: 'NEIGHBOR', initialValue: 800000 }
            },
            'neighbors-6': {
                mitId: 'neighbors-6',
                geometry: { l: 10, h: 8, w: 10, x: -27, y: 0, z: -17 },
                options: { type: 'neighboring', multiplier: 0.08, material: 'NEIGHBOR', initialValue: 850000 }
            },
            'neighbors-7': {
                mitId: 'neighbors-7',
                geometry: { l: 10, h: 8, w: 15, x: -28, y: 0, z: 5.5 },
                options: { type: 'neighboring', multiplier: 0.15, material: 'NEIGHBOR', initialValue: 1600000 }
            },
            'neighbors-8': {
                mitId: 'neighbors-8',
                geometry: { l: 10, h: 8, w: 10, x: -30, y: 0, z: 22 },
                options: { type: 'neighboring', multiplier: 0.14, material: 'NEIGHBOR', initialValue: 1500000 }
            }
        };
    }
};

setSceneElements();

// wait for the above to execute
// setTimeout(function(){StateBuffer.init(sceneElements)}, 0);

// builds scene from scratch
// very cpu expensive and should be used only when absolutely needed
function buildScene() {
    for (var i = textures.length - 1; i >= 0; i--) {
        var textureData = textures[i];
        // do not build until all materials have loaded
        if(!materialTypes[textureData.key]) {
            return;
        }
    }

    // remove all blocks from the scene
    for (var a = 0; a < scene.children.length; a++) {
        var child = scene.children[a];
        if(child && child.mitId) {
            scene.children.splice(a, 1);
        }
    }

    for(var mitId in sceneElements.core) {
        var element = sceneElements.core[mitId];
        addBlock(element);
    }
    for(var mitId in sceneElements.neighbors) {
        var element = sceneElements.neighbors[mitId];
        addBlock(element);
    }
}

function updateScene(newModel) {
    if(!newModel) return;

    var coreElements = sceneElements.core;
    var newCoreElements = newModel.core;

    for(var newElementId in newCoreElements) {
        var newElement = newCoreElements[newElementId];
        var oldElement = coreElements[newElementId]; // old el ID and new el ID will be the same

        if(JSON.stringify(newElement) != JSON.stringify(oldElement)) {
            rebuildElement(newElement);
        }
    }

    sceneElements = newModel;
    MIT.updateValue();
}

function getElement(mitId) {
    return sceneElements.core[mitId];
}

function rebuildElement(elementData) {
    for (var a = 0; a < scene.children.length; a++) {
        var child = scene.children[a];
        if(child && child.mitId === elementData.mitId) {
            scene.children.splice(a, 1);
        }
    }
    addBlock(elementData);
}

function addBlock(data) {
    var geometry = data.geometry;
    var options = data.options;

    var material = materialTypes[data.type] || materialTypes[options.material];

    var blockGeo = new THREE.BoxGeometry(geometry.l, geometry.h, geometry.w, segments, segments, segments);
    var block = new THREE.Mesh(blockGeo, material);
    block.position.x = geometry.x;
    block.position.y = geometry.y;
    block.position.z = geometry.z;
    block.castShadow = true;

    block.mitId = data.mitId;
    block.type = options.type;

    scene.add(block);

    // show neighboring property value only on last exercise
    if(MIT.currentExercise >= 3 && options.type === 'neighboring') {
        addBlockText(data);
    }
}

function addBlockText(data) {
    if(textSettings.font) {
        var text = '$' + numeral(data.options.initialValue).format('0,0');
        var textGeometry = new THREE.TextGeometry(text, textSettings);
        textGeometry.center();

        textBlock = new THREE.Mesh(textGeometry, materialTypes['FONT'])
        textBlock.position.x = data.geometry.x;
        textBlock.position.z = data.geometry.z;
        textBlock.position.y = 7;

        textBlock.mitId = 'text-' + data.mitId;
        textBlock.type = 'text';

        scene.add(textBlock);
    }
}

function textLookAtCamera() {
    for (var i = 0; i < scene.children.length; i++) {
        var child = scene.children[i];
        if(child.type === 'text') {
            child.lookAt({ x: camera.position.x, y: 15, z: camera.position.z });
        }
    }
}
