// content buttons
$('#splashBegin').on('click', function() {
    $('#splash').fadeOut();
    $('#firstExercise').fadeIn();
    MIT.currentExercise++;
});

$('#firstExerciseBegin').on('click', function() {
    $('#firstExercise, #buildingSimulationContent').fadeOut();
    $('#valueBoard').slideDown();
    setTimeout(function(){controls.autoRotate = false}, 1000);
    MIT.currentExercise++;
})

$('#secondExerciseBegin').on('click', function() {
    $('#secondExercise, #buildingSimulationContent').fadeOut();
    MIT.currentExercise++;
});

$('#thirdExerciseBegin').on('click', function() {
    $('#thirdExercise, #buildingSimulationContent').fadeOut();
    MIT.currentExercise++;
    buildScene();
});

// three js and exercise stuff
$(".blockMenuCommercialItem").click(function() {
    $("#blockMenuCommercial").slideUp();
    assignObject(this);
});

$(".blockMenuResidentialItem").click(function() {
    $("#blockMenuResidential").slideUp();
    assignObject(this);
});

$('#undo').on('click', function(){
    updateScene(StateBuffer.undo());
    MIT.updateValue();
});

$('#redo').on('click', function(){
    updateScene(StateBuffer.redo());
    MIT.updateValue();
});

$('#rotateLeft').on('click', function(){
    controls.rotateLeft(90);
});

$('#rotateRight').on('click', function(){
    controls.rotateRight(90);
});


function assignObject(that) {
    if(editObject){
        var type = $(that).data("type");
        var material = materialTypes[type];

        var elementData = getElement(editObject.mitId);
        elementData.type = type;
        elementData.options.material = material;

        rebuildElement(elementData);
        editObject = undefined;

        StateBuffer.storeState(sceneElements);
        MIT.updateValue();
    }
}

// closes the assign popup if opened and reverts the object to previous state
function onDocumentClick( event ) {
    event.preventDefault();
    $("#blockMenuCommercial, #blockMenuResidential").slideUp();
    if(editObject) {
        var elementData = getElement(editObject.mitId);
        editObject.material = materialTypes[elementData.type || 'DEFAULT'];
        editObject = undefined;
    }
}


// returns the object you double clicked
function onDocumentDoubleClick(event) {
    event.preventDefault();

    if(event.button != 0) {
        return;
    }

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if ( intersects.length > 0 ) {
        console.log(MIT.currentExercise);
        var block = intersects[0].object;
        if (block.mitId) {
            var element = getElement(block.mitId);
            if(element &&
                (element.options.type === 'residential' || (element.options.type === 'commercial' && MIT.currentExercise > 2))
            ) {
                var selector = '#blockMenu' + capitalizeFirstLetter(block.type);
                $(selector).fadeIn();
                block.material = materialTypes['SELECTED'];
                editObject = block;
            }
        }
    }
}

// helper function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
