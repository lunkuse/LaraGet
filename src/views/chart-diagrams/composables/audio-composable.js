import { ref, provide } from "vue";
export default function useAudio() {

  const continuousAudio = ref(false);

  const activeCommand = ref("");

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  var colors = ['peach', 'violet', 'black', 'orange', 'black', 'blue', 'yellow'];
  var commands = ['select box one', 'select box two', 'select box three', "patient", "doctor"];

  var recognition = new SpeechRecognition();
  if (SpeechGrammarList) {
    // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
    // This code is provided as a demonstration of possible capability. You may choose not to use it.
    var speechRecognitionList = new SpeechGrammarList();
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + commands.join(' | ') + ' ;'
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
  }
  recognition.continuous = false;
  recognition.lang = 'en-ZA';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  const makeAudioContinuous = (state) => {
    continuousAudio.value = state;
    console.log(continuousAudio.value);
  }

  const updateActiveCommand = (command) => activeCommand.value = command;

  provide('commands', commands);
  provide('recognition', recognition);
  provide('activeCommand', activeCommand);
  provide('continuousAudio', continuousAudio);
  provide('makeAudioContinuous', makeAudioContinuous);
  provide('updateActiveCommand', updateActiveCommand);

  return {
    recognition,
    colors,
    commands,
    continuousAudio,
    activeCommand,
    makeAudioContinuous,
    updateActiveCommand,
  }
}