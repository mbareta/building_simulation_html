/* Javascript for BuildingSimulationXBlock. */
function BuildingSimulationXBlock(runtime, element) {
    $(function ($) {
      /* Here's where you'd do things on page load. */
        document.saveUserProgress = function() {
          var handlerUrl = runtime.handlerUrl(element, 'save_progress');
          var data = {
            scene_model: JSON.stringify(sceneElements),
            exercise_progress: MIT.currentExercise,
            progress: MIT.progress,
          };
          $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
          });
        }
    });
}
