var MIT = {};

// index of current exercise
// should re-factor this to object instead of integer for human readability and robustness
MIT.currentExercise = typeof currentExercise !== 'undefined' ? currentExercise : 0;

// types of objects
MIT.objectType = {
    CONVENIENCE: {
        1:  { TV: 150, MV: 150, TVE: 200, MVE: 200 },
        2:  { TV: 200, MV:  50, TVE: 275, MVE:  75 },
        3:  { TV: 240, MV:  40, TVE: 315, MVE:  40 },
        4:  { TV: 270, MV:  30, TVE: 345, MVE:  30 },
        5:  { TV: 280, MV:  10, TVE: 355, MVE:  10 },
        6:  { TV: 270, MV: -10, TVE: 345, MVE: -10 },
        7:  { TV: 250, MV: -20, TVE: 325, MVE: -20 },
        8:  { TV: 230, MV: -20, TVE: 305, MVE: -20 },
        9:  { TV: 190, MV: -40, TVE: 265, MVE: -40 },
        10: { TV: 150, MV: -40, TVE: 225, MVE: -40 },
        11: { TV: 100, MV: -50, TVE: 175, MVE: -50 },
        12: { TV: 100, MV:   0, TVE: 175, MVE:   0 }
    },
    GROCERY: {
        1:  { TV: 200, MV: 200, TVE: 300, MVE: 300 },
        2:  { TV: 300, MV: 100, TVE: 450, MVE: 150 },
        3:  { TV: 350, MV:  50, TVE: 500, MVE:  50 },
        4:  { TV: 300, MV: -50, TVE: 450, MVE: -50 },
        5:  { TV: 200, MV:-100, TVE: 350, MVE:-100 },
        6:  { TV: 100, MV:-100, TVE: 250, MVE:-100 },
        7:  { TV:  50, MV: -50, TVE: 200, MVE: -50 },
        8:  { TV:   0, MV: -50, TVE: 150, MVE: -50 },
        9:  { TV:   0, MV:   0, TVE: 150, MVE:   0 },
        10: { TV:   0, MV:   0, TVE: 150, MVE:   0 },
        11: { TV:   0, MV:   0, TVE: 150, MVE:   0 },
        12: { TV:   0, MV:   0, TVE: 150, MVE:   0 }
    },
    LOCAL: {
        1:  { TV: 110, MV: 110, TVE: 175, MVE: 175 },
        2:  { TV: 220, MV: 110, TVE: 285, MVE: 110 },
        3:  { TV: 330, MV: 110, TVE: 395, MVE: 110 },
        4:  { TV: 440, MV: 110, TVE: 505, MVE: 110 },
        5:  { TV: 540, MV: 100, TVE: 605, MVE: 100 },
        6:  { TV: 640, MV: 100, TVE: 705, MVE: 100 },
        7:  { TV: 740, MV: 100, TVE: 805, MVE: 100 },
        8:  { TV: 830, MV:  90, TVE: 895, MVE:  90 },
        9:  { TV: 910, MV:  80, TVE: 975, MVE:  80 },
        10: { TV: 980, MV:  70, TVE:1045, MVE:  70 },
        11: { TV:1030, MV:  50, TVE:1095, MVE:  50 },
        12: { TV:1060, MV:  30, TVE:1125, MVE:  30 }
    },
    RESTAURANT: {
        1:  { TV: 250, MV: 250, TVE: 300, MVE: 300 },
        2:  { TV: 500, MV: 250, TVE: 575, MVE: 275 },
        3:  { TV: 750, MV: 250, TVE: 825, MVE: 250 },
        4:  { TV: 900, MV: 150, TVE: 975, MVE: 150 },
        5:  { TV:1000, MV: 100, TVE:1075, MVE: 100 },
        6:  { TV:1050, MV:  50, TVE:1125, MVE:  50 },
        7:  { TV:1000, MV: -50, TVE:1075, MVE: -50 },
        8:  { TV:1000, MV:   0, TVE:1075, MVE:   0 },
        9:  { TV: 950, MV: -50, TVE:1025, MVE: -50 },
        10: { TV: 900, MV: -50, TVE: 975, MVE: -50 },
        11: { TV: 800, MV:-100, TVE: 875, MVE:-100 },
        12: { TV: 700, MV:-100, TVE: 775, MVE:-100 }
    },
    TOURISM: {
        1:  { TV: 300, MV: 300, TVE: 200, MVE: 200 },
        2:  { TV: 500, MV: 200, TVE: 350, MVE: 150 },
        3:  { TV: 650, MV: 150, TVE: 450, MVE: 100 },
        4:  { TV: 780, MV: 130, TVE: 525, MVE:  75 },
        5:  { TV: 880, MV: 100, TVE: 545, MVE:  20 },
        6:  { TV: 950, MV:  70, TVE: 545, MVE:   0 },
        7:  { TV:1000, MV:  50, TVE: 495, MVE: -50 },
        8:  { TV:1020, MV:  20, TVE: 460, MVE: -35 },
        9:  { TV:1000, MV: -20, TVE: 385, MVE: -75 },
        10: { TV: 950, MV: -50, TVE: 235, MVE:-150 },
        11: { TV: 875, MV: -75, TVE: -15, MVE:-250 },
        12: { TV: 700, MV:-175, TVE:-315, MVE:-300 }
    },
    ARTISAN: {
        1:  { TV: 110, MV: 110, TVE: 200, MVE: 200 },
        2:  { TV: 200, MV:  90, TVE: 390, MVE: 190 },
        3:  { TV: 280, MV:  80, TVE: 550, MVE: 160 },
        4:  { TV: 360, MV:  80, TVE: 700, MVE: 150 },
        5:  { TV: 420, MV:  60, TVE: 790, MVE:  90 },
        6:  { TV: 500, MV:  80, TVE: 870, MVE:  80 },
        7:  { TV: 580, MV:  80, TVE: 950, MVE:  80 },
        8:  { TV: 650, MV:  70, TVE:1020, MVE:  70 },
        9:  { TV: 720, MV:  70, TVE:1090, MVE:  70 },
        10: { TV: 790, MV:  70, TVE:1160, MVE:  70 },
        11: { TV: 850, MV:  60, TVE:1220, MVE:  60 },
        12: { TV: 910, MV:  60, TVE:1280, MVE:  60 }
    },
    COMMUNITY: {
        1:  { TV:  70, MV:  70, TVE:1500, MVE:1500 },
        2:  { TV: 120, MV:  50, TVE:2500, MVE:1000 },
        3:  { TV: 170, MV:  50, TVE:3100, MVE: 600 },
        4:  { TV: 220, MV:  50, TVE:3200, MVE: 100 },
        5:  { TV: 270, MV:  50, TVE:3300, MVE: 100 },
        6:  { TV: 320, MV:  50, TVE:3350, MVE:  50 },
        7:  { TV: 370, MV:  50, TVE:3400, MVE:  50 },
        8:  { TV: 420, MV:  50, TVE:3450, MVE:  50 },
        9:  { TV: 470, MV:  50, TVE:3500, MVE:  50 },
        10: { TV: 520, MV:  50, TVE:3550, MVE:  50 },
        11: { TV: 570, MV:  50, TVE:3600, MVE:  50 },
        12: { TV: 620, MV:  50, TVE:3650, MVE:  50 }
    }
}


MIT._getTypeCount = function() {
    var typeCount = {};

    for(var mitId in sceneElements.core) {
        var element = sceneElements.core[mitId];
        if(element && element.options.type === 'commercial' && element.type) {
            if(typeCount[element.type]) {
                typeCount[element.type] += element.options.multiplier;
            }
            else {
                typeCount[element.type] = element.options.multiplier;
            }
        }
    }

    return typeCount;
}

MIT._getResidentialCount = function() {
    var x = y = 0;

    for(var mitId in sceneElements.core) {
        var element = sceneElements.core[mitId];
        if(element && element.options.type === 'residential' && element.type) {
            if(element.type === 'HIGH_END_RESIDENTIAL') {
                x++;
            }
            else if (element.type === 'AFFORDABLE') {
                y++;
            }
        }
    }

    if(x === 8) {
        $('#valueBoard').attr('data-tooltip', 'Your development is isolated from the neighborhood and receives hostility from some, lack of known locals attracts crime.');
    }
    else {
        $('#valueBoard').removeAttr('data-tooltip');
    }

    return { x: x, y: y };
}

// monetary value
MIT.getResidentialValue = function() {
    var data = MIT._getResidentialCount();
    var x = data.x;
    var y = data.y;

    return 300000*x + 175000*y + 90000*x*Math.pow(y, (2/3)) - 10000*y*y;
};

// social + monetary value == total value
MIT.getExternalResidentialValue = function() {
    var data = MIT._getResidentialCount();
    var x = data.x;
    var y = data.y;

    return 300000*x + 175000*y + 90000*x*Math.pow(y, (2/3)) - 10000*y*y + 350000*y - 10000*y*y;
};

// monetary value
MIT.getCommercialValue = function() {
    var sum = 0;
    var typeCount = MIT._getTypeCount();

    for(key in typeCount) {
        // find value from objectType object
        // goes something like this: MIT.objectType['COMMUNITY'][2]['TV'] => 120
        sum += MIT.objectType[key][typeCount[key]]['TV'];
    }

    return sum*1000;
}

// monetary + social value == total value
MIT.getExternalCommercialValue = function() {
    var sum = 0;
    var typeCount = MIT._getTypeCount();

    for(key in typeCount) {
        // find value from objectType object
        // goes something like this: MIT.objectType['COMMUNITY'][2]['TVE'] => 2500
        sum += MIT.objectType[key][typeCount[key]]['TVE'];
    }

    return sum*1000;
}

MIT.updateValue = function(){
    var optimalValue = {
        residential: 2967197,
        commercial: 2250000,
        total: 5217197,
        neighborhood: 16452197
    };

    var residentialValue = MIT.getResidentialValue();
    var commercialValue = MIT.getCommercialValue();
    var neighborhoodValue = MIT.getExternalCommercialValue() + MIT.getExternalResidentialValue() + residentialValue + commercialValue;

    // update floating text
    MIT.updateFloatingText(neighborhoodValue - residentialValue - commercialValue);

    // update view
    $("#residentialValue").text(numeral(residentialValue).format('0,0'));
    $("#residentialPercent").children().css('width', (Math.round((residentialValue/optimalValue.residential)*100) + '%'));

    $("#commercialValue").text(numeral(commercialValue).format('0,0'));
    $("#commercialPercent").children().css('width', (Math.round((commercialValue/optimalValue.commercial)*100) + '%'));

    $("#socialValue").text(numeral(neighborhoodValue).format('0,0'));
    $("#socialPercent").children().css('width', (Math.round((neighborhoodValue/optimalValue.neighborhood)*100) + '%'));

    // finish first exercise
    if(MIT.currentExercise == 2 && residentialValue/optimalValue.residential > 0.99) {
        $('#buildingSimulationContent, #secondExercise').fadeIn(1200);
    }

    // finish second exercise
    if(MIT.currentExercise == 3 && commercialValue/optimalValue.commercial > 0.8) {
        $('#buildingSimulationContent, #thirdExercise').fadeIn(1200);
    }

    // finish third exercise
    if(MIT.currentExercise == 4 && neighborhoodValue/optimalValue.neighborhood > 0.75) {
        $('#buildingSimulationContent, #conclusion').fadeIn(1200);
    }
}

MIT.updateFloatingText = function(value) {
    for (var i = 0; i < scene.children.length; i++) {
        var child = scene.children[i];
        // find all scene text objects
        if(child.type === 'text') {
            var elementId = child.mitId.slice(5, child.mitId.length);
            var neighbor = sceneElements.neighbors[elementId];

            var text = '$' + numeral(neighbor.options.initialValue + Math.round(value*neighbor.options.multiplier)).format('0,0');
            var textGeometry = new THREE.TextGeometry(text, textSettings);
            textGeometry.center();

            child.geometry = textGeometry;
        }
    }
}
