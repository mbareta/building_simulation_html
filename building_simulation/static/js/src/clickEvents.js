// content buttons
$(document).ready(function(){
    MIT.updateProgress(0);
    if(MIT.currentExercise > 0) {
        $('#splashResume')
        .css('visibility', 'initial')
        .on('click', function(event){
            // FIXME: this does not work after refactor
            event.stopPropagation();
            $('#splash, #buildingSimulationContent').fadeOut();
            $('#valueBoard, .chevron').slideDown();
            MIT.updateValue();

            switch(MIT.currentExercise) {
                case(1): {
                    $('#firstExercise').fadeIn();
                    break;
                }
                case(2): {
                    $('#secondExercise').fadeIn();
                    break;
                }
                case(3): {
                    $('#thirdExercise').fadeIn();
                    break;
                }
            }
            // buildScene();
            setTimeout(function(){controls.autoRotate = false}, 1000);
        });
    }
    else {
        $('#splashBegin').css('visibility', 'initial');
    }
});

// curretnExercise == 0
$('#splashBegin').on('click', function(event) {
    MIT.nextPage(event);
});

$('.continue-button').on('click', function(event){
    MIT.nextPage(event);
});

$('.back').on('click', function(event){
    MIT.previousPage(event);
});

$('#conclusionReset').on('click', function(){
    // reset MIT model
    $('#conclusion').fadeOut();
    setSceneElements(true);
    MIT.currentExercise = 1;
    MIT.progress = 1;
    setTimeout(function(){
        buildScene();
        MIT.updateValue();
    }, 500);
    $('#firstExercise').fadeIn();
});

$('#summationContinue').on('click', function() {
    MIT.bumpProgress();
    MIT.hideSummations();
});

// three js and exercise stuff
$(".blockMenuCommercialItem").click(function() {
    assignObject(this);
});

$(".blockMenuResidentialItem").click(function() {
    assignObject(this);
});

// $('#undo').on('click', function(){
//     updateScene(StateBuffer.undo());
//     MIT.updateValue();
// });

// $('#redo').on('click', function(){
//     updateScene(StateBuffer.redo());
//     MIT.updateValue();
// });

$('#rotateLeft').on('click', function(){
    controls.rotateLeft(90);
});

$('#rotateRight').on('click', function(){
    controls.rotateRight(90);
});

$('#webgl').on('mousedown', function(){
    $(this).css('cursor', 'move');
});

$('#webgl').on('mouseup', function(){
    $(this).css('cursor', 'auto');
});


function assignObject(that) {
    $("#blockMenuCommercial, #blockMenuResidential").slideUp();

    if(editObject){
        var type = $(that).data("type");
        var material = materialTypes[type];

        var elementData = getElement(editObject.mitId);
        elementData.type = type;
        elementData.options.material = type;

        rebuildElement(elementData);
        editObject = undefined;

        MIT.updateValue();
        StateBuffer.storeState(sceneElements);
        document.saveUserProgress();

        // show tooltip
        MIT.chooseTooltip(type);
    }
}

// prevent event binding when in studio
// attach event listeners on WebGL
if($('.xblock-render').length == 0) {
    $(document).on('click', function(event){
        event.preventDefault();

        if(editObject) {
            $("#blockMenuCommercial, #blockMenuResidential").slideUp();
            var elementData = getElement(editObject.mitId);
            editObject.material = materialTypes[elementData.type || 'DEFAULT'];
            editObject = undefined;
        }
    });

    $(document).on('dblclick', function(event){
        if(event.button != 0) {
            return;
        }

        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children);

        if ( intersects.length > 0 ) {
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
    });
}

// helper function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
