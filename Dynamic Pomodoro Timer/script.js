// --- Utilities
const $ = id => document.getElementById(id);
const ring = $('ring');
const timeEl = $('time');
const labelEl = $('sessionLabel');
const cycleCountEl = $('cycleCount');

const startBtn = $('startBtn');
const pauseBtn = $('pauseBtn');
const resetBtn = $('resetBtn');
const skipBtn = $('skipBtn');

const workMinInput = $('workMin');
const shortMinInput = $('shortMin');
const longMinInput = $('longMin');
const cyclesBeforeLongInput = $('cyclesBeforeLong');
const autoModeInput = $('autoMode');
const soundModeInput = $('soundMode');
const notifyModeInput = $('notifyMode');
const saveBtn = $('saveBtn');
const restoreBtn = $('restoreBtn');

const presets = { pom: [25, 5, 15, 4], short: [15, 3, 10, 4], deep: [50, 10, 20, 4] };

