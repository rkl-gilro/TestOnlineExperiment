/**
 * jspsych-same-different
 * Josh de Leeuw
 *
 * plugin for showing two stimuli sequentially and getting a same / different judgment
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['choose-image'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('choose-image', 'stimuli', 'image')

  plugin.info = {
    name: 'choose-image',
    description: '',
    parameters: {
      stimuli: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimuli',
        default: undefined,
        array: true,
        description: 'The images to be displayed.'
      },
      answer: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Answer',
        options: [37, 39],
        default: 75,
        description: 'Either "left" or "right".'
      },
      choices_key: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choice key',
        default: jsPsych.ALL_KEYS,
        description: ''
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML =
    '<div style="width: 500px;">'+
    '<div style="float: left;"><img src="'+trial.stimuli[0]+'"></img>' +
    '<p class="small"><strong> </strong></p></div>' +
    '<div class="float: right;"><img src="'+trial.stimuli[1]+'"></img>'+
    '<p class="small"><strong> </strong></p></div>' +
    '<p>Press <strong>left</strong> or <strong>right</strong> arrow.</p>';


      var after_response = function(info) {

        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();

        var correct = false;

        var lkey = typeof trial.choices_key == 'string' ? jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.choices_key) : trial.choices_key;

        var trial_data = {
          "rt": info.rt,
          "answer": trial.answer,
          "stimulus": JSON.stringify([trial.stimuli[0], trial.stimuli[1]]),
          "key_press": info.key
        };

        display_element.innerHTML = '';

        jsPsych.finishTrial(trial_data);
      }

      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices_key,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });



  };

  return plugin;
})();
