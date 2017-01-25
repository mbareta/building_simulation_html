// content buttons
$(document).ready(function(){
    if(MIT.currentExercise > 0) {
        $('#splashResume')
        .css('visibility', 'initial')
        .on('click', function(event){
            $('#splash, #buildingSimulationContent').fadeOut();
            $('#valueBoard, .chevron, #persistentButtonContainer').slideDown();

            MIT.previousPage(event);
            MIT.updateValue();
            setTimeout(function(){controls.autoRotate = false}, 1000);
        });
    }
    else {
        $('#splashBegin')
        .css('visibility', 'initial')
        .on('click', function(event) {
            MIT.nextPage(event);
        });
    }
});

$('.continue-button').on('click', MIT.nextPage);

$('.back').on('click', MIT.previousPage);

$('#conclusionReset').on('click', MIT.resetExercise);

$('#summationContinue').on('click', function() {
    MIT.bumpProgress();
    if(typeof MIT.hideSummations === 'function') {
        MIT.hideSummations();
    }
    else {
        $('.summation').hide();
        switch(MIT.currentExercise) {
            case 2:
                $('#buildingSimulationContent, #firstExercise').fadeIn(1200);
                break;
            case 3:
                $('#buildingSimulationContent, #secondExercise').fadeIn(1200);
                break;
            case 4:
                $('#buildingSimulationContent, #thirdExercise').fadeIn(1200);
                break;
        }
    }
});

$(".blockMenuCommercialItem").click(function() {
    assignObject(this);
});

$(".blockMenuResidentialItem").click(function() {
    assignObject(this);
});

// $('#undo').on('click', function(){
//     updateScene(StateBuffer.undo());
//     MIT.updateValue(); // after uncommenting, put this in updateScene()
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
        // StateBuffer.storeState(sceneElements);
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
