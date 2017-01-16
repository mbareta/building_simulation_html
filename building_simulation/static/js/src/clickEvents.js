// content buttons
$(document).ready(function(){
    if(MIT.currentExercise > 0) {
        $('#splashResume')
        .css('visibility', 'initial')
        .on('click', function(event){
            $('#splash, #buildingSimulationContent').fadeOut();

            switch(MIT.currentExercise) {
                case(2): {
                    MIT.progress = 2;
                    break;
                }
                case(3): {
                    MIT.progress = 4;
                    break;
                }
                case(4): {
                    MIT.progress = 6;
                    break;
                }
            }

            MIT.previousPage(event);

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
    MIT.hideSummations();
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
