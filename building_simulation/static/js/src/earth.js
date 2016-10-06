if($('.xblock-render').length > 0) {
    var width = 600;
    var height = 300;
}
else {
    var width = window.innerWidth;
    var height = window.innerHeight;
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(50, width / height, 1, 500);
var editObject;
var textSettings = {
    size: 1,
    height: 0.4,
    curveSegments: 16,
    font: undefined
};

$(function () {
    var webglEl = document.getElementById('webgl');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var radius = 90;
    var segments = 32;

    camera.position.set(40, 0, 40);

    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    var scene = new THREE.Scene();

    // scene.add(createSky(radius, segments));
    scene.add(createGround());

    var hemLight = new THREE.HemisphereLight(0xeeffee, 0x665555, 1);
    scene.add(hemLight);

    scene.add(createDirLight());

    // controls
    controls = new THREE.OrbitControls( camera );

    document.addEventListener( 'dblclick', onDocumentDoubleClick, false );
    document.addEventListener( 'click', onDocumentClick, false );
    window.addEventListener( 'resize', onWindowResize, false );

    webglEl.appendChild(renderer.domElement);
    window.scene = scene;


    // load font and draw text
    var loader = new THREE.FontLoader();
    loader.load( 'https://s3.amazonaws.com/mit-cre/Building+Simulation+Assets/optimer_regular.typeface.json', function (font) {
        textSettings.font = font;

        // build scene after the font is loaded
        buildScene();
    });

    render();

    setTimeout(
        function(){$('#splashBegin').css('visibility', 'initial');},
        1000
    );

    // end init

    // define functions below
    function render() {
        controls.update();
        requestAnimationFrame(render);
        textLookAtCamera();
        renderer.render(scene, camera);
    }

    function createGround() {
        var texture = new THREE.TextureLoader().load('https://s3.amazonaws.com/mit-cre/Building+Simulation+Assets/floor.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        var groundGeo = new THREE.PlaneGeometry(600, 600, segments, segments);
        var groundMat = new THREE.MeshPhongMaterial({ map:texture });

        var ground = new THREE.Mesh(groundGeo,groundMat);
        ground.position.z = -3;
        ground.position.y = -3;

        ground.rotation.x = -Math.PI/2;
        ground.receiveShadow = true;

        return ground;
    }

    function createDirLight() {
        var dirLight = new THREE.DirectionalLight(0xccffff, 0.7);
        dirLight.position.set(300, 400, 50);
        dirLight.position.multiplyScalar(1.3);
        dirLight.shadow.camera.near = true;
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 512;
        dirLight.shadow.mapSize.height = 512;
        var d = 200;

        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.top = d;

        dirLight.shadow.camera.far = 1000;

        dirLight.shadowCameraFov = 45;
        dirLight.shadowBias = 0.0001;
        dirLight.shadowDarkness = 0.6;
        dirLight.shadowMapWidth = 2048;
        dirLight.shadowMapHeight = 2048;


        return dirLight;
    }

    function onWindowResize(){
        if($('.xblock-render').length > 0) {
            var innerWidth = 600;
            var innerHeight = 300;
        }
        else {
            var innerWidth = window.innerWidth;
            var innerHeight = window.innerHeight;
        }
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    }
}());
