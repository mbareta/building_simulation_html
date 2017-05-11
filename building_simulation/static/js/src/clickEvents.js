// content buttons
$(document).ready(function(){
    if(MIT.currentExercise > 0) {
        $('#splashResume')
        .css('visibility', 'initial')
        .on('click', function(event){
            $('#splash, #buildingSimulationContent').fadeOut();
            $(this).css('visibility', 'hidden');
            $('#splashBegin')
                .css('visibility', 'initial')
                .on('click', function(event) {
                    MIT.nextPage(event);
                });

            $('#double-click-units').remove(); // remove double-click helper text            
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
            setTimeout(function(){controls.autoRotate = false}, 1000);
        });
    }
});

$('.continue-button').on('click', MIT.nextPage);

$('.back').on('click', MIT.previousPage);

$('#conclusionReset').on('click', MIT.resetExercise);

$('#finish').on('click', function(){
    parent.postMessage(JSON.stringify({action:'continue'}),'*');
});

$(".blockMenuCommercialItem").click(function() {
    assignObject(this);
});

$(".blockMenuResidentialItem").click(function() {
    assignObject(this);
});

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

        $('#double-click-units').remove(); // remove double-click helper text

        var block = getObjectUnderMouse(event);

        if (block && block.mitId) {
            var element = getElement(block.mitId);
            if(element &&
                (element.options.type === 'residential' || (element.options.type === 'commercial' && MIT.currentExercise > 1))
            ) {
                var selector = '#blockMenu' + capitalizeFirstLetter(block.type);
                $(selector).fadeIn();
                block.material = materialTypes['SELECTED'];
                editObject = block;
            }
        }
    });

    var highlightedObject;
    var highlightedObjectMaterial;

    $('#webgl').on('mousemove', function(event){
        var block = getObjectUnderMouse(event);

        if(highlightedObject) {
            highlightedObject.material = highlightedObjectMaterial;
            highlightedObject = null;
        }

        if(block && block.mitId && block.type !== 'neighboring') {
            if(block == editObject) {
                block.material = materialTypes['SELECTED'];
                return;
            }
            highlightedObject = block;
            highlightedObjectMaterial = block.material;

            block.material = materialTypes['HIGHLIGHTED'];
        }
    });
}

// helper function
function getObjectUnderMouse(event) {
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if ( intersects.length > 0 ) {
        return intersects[0].object;
    }

    return null;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
