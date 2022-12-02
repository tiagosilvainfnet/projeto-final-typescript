var jogoIniciado = false;
const btnStart: HTMLButtonElement | null = document.getElementById('part-4') as HTMLButtonElement | null;
const parts = [
    document.getElementById('part-0'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3')
]

const sounds = [
    new Audio('../build/assets/sounds/sound0.wav'),
    new Audio('../build/assets/sounds/sound1.wav'),
    new Audio('../build/assets/sounds/sound2.wav'),
    new Audio('../build/assets/sounds/sound3.wav'),
    new Audio('../build/assets/sounds/erro.mp3'),
]
let scoreVariable = 0;
const score = document.getElementById('genius__score');
const areaErro = document.getElementById('area-erro');
let positions: any = [], mPositions: any = [];
const tagRanking = document.getElementById('ranking') as HTMLElement;
const tagMeuRanking = document.getElementById('meu-ranking') as HTMLElement;
const speedVariable = document.getElementById('speed-variable') as HTMLElement
let speed = 1;
let inputSpeed = document.querySelector('#speed') as HTMLInputElement;
const userLogged = getUser();
const btnEntrar: any = document.querySelector('#btn-entrar');
const btnSair: any = document.querySelector('#btn-sair');
const btnMeuRanking: any = document.querySelector('#btn-meu-ranking');

inputSpeed.addEventListener('change', (event: any) => {
    if(event.currentTarget){
        const selectedSpeed = event.currentTarget.value;
        updateSpeedArea(selectedSpeed);
        window.localStorage.setItem('speed', selectedSpeed);
    }
})

const _get = async (endpoint: string) => {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'GET'
    });
    const result = await response.json();
    return result;
}

const _post = async (endpoint: string, data: any) => {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    return result;
}

const updateSpeedArea = (speed: any) => {
    inputSpeed.value = speed.toString();
    speedVariable.innerText = speed.toString();
}

const loadSpeed = () => {
    let sp = window.localStorage.getItem('speed');
    if(sp){
        speed = parseInt(sp);
    }
    updateSpeedArea(speed);
}

const toggleRanking = (type: number) => {
    if(type === 1){
        let position: any = tagRanking.style.left;
        if(position === '0px'){
            tagRanking.style.left = '-100%';
        }else{
            tagRanking.style.left = '0px';
        }
    }else{
        let position: any = tagMeuRanking.style.right;
        if(position === '0px'){
            tagMeuRanking.style.right = '-100%';
        }else{
            tagMeuRanking.style.right = '0px';
        }
    }
}

const loadRanking = async () => {
    const ranking = await _get('game/score?order=score,desc&limit=20');
    constructRanking(ranking, tagRanking);

    if(isLoggedIn()){
        const meuRanking = await _get(`game/score/${userLogged.id}?order=score,desc&limit=20`);
        constructRanking(meuRanking, tagMeuRanking);
    }
}

const constructRanking = (item: any, tag: any) => {
    let list = `<ul>`;

    for(const i of item){
        list += `
            <li>${i.user_id} - ${i.score}</li>
        `;
    }

    list += '</ul>';
    tag.children[1].innerHTML = list;
}

const updateRankig = async () => {
    await _post('game/score', {
        score: scoreVariable,
        user_id: userLogged.id
    })
    loadRanking();
}

const configs = async () => {
    parts.map((part, idx:number) => {
        part?.addEventListener('click', () => setPosition(idx))
    })
}

const toggleParts = (status: boolean) => {
    parts.map((part: any) => {
        part.disabled = status;
    })
}

const startGame = async () => {
    if(score){
        score.innerText = "0";
    }

    if(!jogoIniciado){
        jogoIniciado = true;
        if(btnStart){
            btnStart.disabled = true;
            btnStart.innerText = 'JOGO INICIADO!!!';
            toggleParts(false);
            loadPosition();
        }
    }
}

const loadPosition = async () => {
    let aleatory = 0;

    if(positions.length >= 4){
        aleatory = Math.floor(Math.random() * 4)
    }else{
        if(positions.length > 0){
            aleatory = positions[positions.length -1] + 1;
        }
    }

    positions.push(aleatory);
    await iluminatePosition();
    mPositions = [];
}

const setPosition = async (idx: number) => {
    let position = idx;
    sounds[position].play();
    mPositions.push(position);

    let currentPosition = mPositions.length - 1;

    setTimeout(async () => {
        if(positions[currentPosition] !== mPositions[currentPosition]){
            sounds[4].play();
            if(areaErro){
                areaErro.style.display = 'block';
            }
            if(isLoggedIn()){
                updateRankig();
            }
            toggleParts(true);
        }else{
            if(currentPosition === positions.length - 1){
                setTimeout(async () => {
                    if(score){
                        scoreVariable = positions.length;
                        score.innerText = positions.length;
                    }
                    await loadPosition();
                }, 500 / speed);
            }
        }
    }, 1000 / speed);
}

const iluminatePosition = async () => {
    let i = 0;
    let interval = setInterval(async () => {
        let item = positions[i];

        await sounds[item].play();
        await parts[item]?.classList.add(`genius__item--${item}__active`)
        setTimeout(async() => {
            await parts[item]?.classList.remove(`genius__item--${item}__active`)
        }, 1000 / speed)

        i++;

        if(i === positions.length){
            clearInterval(interval);
        }
    }, 2000 / speed);
}

const defineHeight = () =>{
    const elements: any = document.querySelectorAll('.genius__item');
    elements.forEach((element: any) => {
        element.style.height = `${element.offsetWidth}px`;
        if(element.id === 'part-4'){
            element.style.marginTop = `-${element.offsetWidth/2}px`;
            element.style.marginLeft = `-${element.offsetWidth/2}px`;
        }
    })
}

const reiniciarGame = () => {
    jogoIniciado = false;
    positions = [];
    scoreVariable = 0;
    if(areaErro){
        areaErro.style.display = 'none';
    }
    startGame();
}

const isLoggedIn = () => {
    const user = window.localStorage.getItem('user');

    if(user){
        btnEntrar.style.display = 'none';
        btnSair.style.display = 'block';
        btnMeuRanking.style.display = 'inline-block';
    }else{
        btnSair.style.display = 'none';
        btnEntrar.style.display = 'block';
        btnMeuRanking.style.display = 'none';
    }

    return user;
}

const logout = () => {
    window.localStorage.clear();
    window.location.replace("http://127.0.0.1:5500/front-end/build/login.html");
} 

function getUser(){
    const user = window.localStorage.getItem('user');
    if(user){
        return JSON.parse(user)
    }
    return null;
}

defineHeight();
window.addEventListener('resize', () => {
    defineHeight();
})

window.addEventListener('load', () => {
    configs();
    loadRanking();
    loadSpeed();
});