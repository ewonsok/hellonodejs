const whisper = require('whisper-node');

const transcript = whisper("./audio.mp3");

console.log(transcript); // output: [ {start,end,speech} ]