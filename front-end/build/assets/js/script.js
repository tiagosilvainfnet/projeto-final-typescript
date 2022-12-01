"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var jogoIniciado = false;
const btnStart = document.getElementById('part-4');
const parts = [
    document.getElementById('part-0'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3')
];
const sounds = [
    new Audio('../build/assets/sounds/sound0.wav'),
    new Audio('../build/assets/sounds/sound1.wav'),
    new Audio('../build/assets/sounds/sound2.wav'),
    new Audio('../build/assets/sounds/sound3.wav'),
    new Audio('../build/assets/sounds/erro.mp3'),
];
let scoreVariable = 0;
const score = document.getElementById('genius__score');
const areaErro = document.getElementById('area-erro');
let user = "";
let positions = [], mPositions = [];
const tagRanking = document.getElementById('ranking');
const tagMeuRanking = document.getElementById('meu-ranking');
const speedVariable = document.getElementById('speed-variable');
let speed = 1;
let inputSpeed = document.querySelector('#speed');
inputSpeed.addEventListener('change', (event) => {
    if (event.currentTarget) {
        const selectedSpeed = event.currentTarget.value;
        updateSpeedArea(selectedSpeed);
        window.localStorage.setItem('speed', selectedSpeed);
    }
});
const _get = (endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/${endpoint}`, {
        method: 'GET'
    });
    const result = yield response.json();
    return result;
});
const _post = (endpoint, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        body: data
    });
    const result = yield response.json();
    return result;
});
const updateSpeedArea = (speed) => {
    inputSpeed.value = speed.toString();
    speedVariable.innerText = speed.toString();
};
const loadSpeed = () => {
    let sp = window.localStorage.getItem('speed');
    if (sp) {
        speed = parseInt(sp);
    }
    updateSpeedArea(speed);
};
const toggleRanking = (type) => {
    if (type === 1) {
        let position = tagRanking.style.left;
        if (position === '0px') {
            tagRanking.style.left = '-100%';
        }
        else {
            tagRanking.style.left = '0px';
        }
    }
    else {
        let position = tagMeuRanking.style.right;
        if (position === '0px') {
            tagMeuRanking.style.right = '-100%';
        }
        else {
            tagMeuRanking.style.right = '0px';
        }
    }
};
const loadRanking = () => __awaiter(void 0, void 0, void 0, function* () {
    const ranking = yield _get('game/score?order=score,desc');
    const meuRanking = yield _get('game/score/1?order=score,desc');
    constructRanking(ranking, tagRanking);
    constructRanking(meuRanking, tagMeuRanking);
});
const constructRanking = (item, tag) => {
    let list = `<ul>`;
    for (const i of item) {
        list += `
            <li>${i.user_id} - ${i.score}</li>
        `;
    }
    list += '</ul>';
    tag.children[1].innerHTML = list;
};
const updateRankig = () => {
};
const configs = () => __awaiter(void 0, void 0, void 0, function* () {
    parts.map((part, idx) => {
        part === null || part === void 0 ? void 0 : part.addEventListener('click', () => setPosition(idx));
    });
});
const toggleParts = (status) => {
    parts.map((part) => {
        part.disabled = status;
    });
};
const startGame = () => __awaiter(void 0, void 0, void 0, function* () {
    let el = document.getElementById('nome');
    user = el.value;
    if (user !== "") {
        el.value = "";
        if (score) {
            score.innerText = "0";
        }
        if (!jogoIniciado) {
            jogoIniciado = true;
            if (btnStart) {
                btnStart.disabled = true;
                btnStart.innerText = 'JOGO INICIADO!!!';
                toggleParts(false);
                loadPosition();
            }
        }
    }
    else {
        alert("Digite um nome para iniciar o game!!!");
        if (btnStart) {
            btnStart.disabled = false;
        }
    }
});
const loadPosition = () => __awaiter(void 0, void 0, void 0, function* () {
    let aleatory = 0;
    if (positions.length >= 4) {
        aleatory = Math.floor(Math.random() * 4);
    }
    else {
        if (positions.length > 0) {
            aleatory = positions[positions.length - 1] + 1;
        }
    }
    positions.push(aleatory);
    yield iluminatePosition();
    mPositions = [];
});
const setPosition = (idx) => __awaiter(void 0, void 0, void 0, function* () {
    let position = idx;
    sounds[position].play();
    mPositions.push(position);
    let currentPosition = mPositions.length - 1;
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        if (positions[currentPosition] !== mPositions[currentPosition]) {
            sounds[4].play();
            if (areaErro) {
                areaErro.style.display = 'block';
            }
            updateRankig();
            loadRanking();
            toggleParts(true);
        }
        else {
            if (currentPosition === positions.length - 1) {
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    if (score) {
                        scoreVariable = positions.length;
                        score.innerText = positions.length;
                    }
                    yield loadPosition();
                }), 500 / speed);
            }
        }
    }), 1000 / speed);
});
const iluminatePosition = () => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    let interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let item = positions[i];
        yield sounds[item].play();
        yield ((_a = parts[item]) === null || _a === void 0 ? void 0 : _a.classList.add(`genius__item--${item}__active`));
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            yield ((_b = parts[item]) === null || _b === void 0 ? void 0 : _b.classList.remove(`genius__item--${item}__active`));
        }), 1000 / speed);
        i++;
        if (i === positions.length) {
            clearInterval(interval);
        }
    }), 2000 / speed);
});
const defineHeight = () => {
    const elements = document.querySelectorAll('.genius__item');
    elements.forEach((element) => {
        element.style.height = `${element.offsetWidth}px`;
        if (element.id === 'part-4') {
            element.style.marginTop = `-${element.offsetWidth / 2}px`;
            element.style.marginLeft = `-${element.offsetWidth / 2}px`;
        }
    });
};
const reiniciarGame = () => {
    jogoIniciado = false;
    positions = [];
    scoreVariable = 0;
    if (areaErro) {
        areaErro.style.display = 'none';
    }
    startGame();
};
defineHeight();
window.addEventListener('resize', () => {
    defineHeight();
});
window.addEventListener('load', () => {
    configs();
    loadRanking();
    loadSpeed();
});
