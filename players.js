const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

// Игрок №1--------------

let player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['AK-47', 'M4A1', 'USP-S', 'Deagle', 'AWP'],
    attack: function () {
        console.log( this.name + ' ' + 'Fight...' );
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
    
};

// Игрок №2--------------
let player2 = {
    player: 2,
    name: 'LiuKang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['AWP'],
    attack() {
        console.log( this.name + ' ' + 'Fight...' );
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};
 

function changeHP (damage) {
    this.hp = Math.max(0, this.hp - damage);
    //решил здесь сделать вызов функции renderHP() для того, чтобы не делать большое количество вызовов внутри события. ----- если есть замечания по этому поводу,
    // буду рад услышать фидбэк! :) 
    this.renderHP()
}

function elHP () {
   return document.querySelector('.player'+ this.player +' .life');
}

function renderHP () {
    this.elHP().style.width = this.hp + '%';
}

function playerWin (name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }
    

    return $loseTitle;

}

function getRandomDamage (range) {
    return Math.ceil(Math.random() * range)
}

// $randomButton.addEventListener('click', function() {
//     player1.changeHP(getRandomDamage(20));
//     player2.changeHP(getRandomDamage(20));

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }

//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWin(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWin(player1.name));
//     } else if (player1.hp === 0 && player2.hp === player1.hp) {
//         $arenas.appendChild(playerWin());
//     }
    
// })

function createElement (tag, className) {
    $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    $tag.classList.add(className);
    
    return $tag;
}

function createReloadButton () {
    const $div = createElement('div', 'reloadWrap')
    const $btn = createElement('button', 'button')
    
    $div.appendChild($btn);

    $btn.innerText = 'Restart'

    $btn.addEventListener('click', function () {
        window.location.reload()
    })

    $formFight.appendChild($div)
    
}

function createPlayer ( playerObj ) {
    
    const $player = createElement('div', 'player'+playerObj.player)
    const $progressbar = createElement('div', 'progressbar')
    const $character = createElement('div', 'character')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2)); 

function enemyAttack() {
    const hit = ATTACK[getRandomDamage(3) - 1];
    const defence = ATTACK[getRandomDamage(3) - 1];

    return {
        value: getRandomDamage(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomDamage(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        } 

        item.checked = false;
    }

    return attack;
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2, player1);

    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === player1.hp) {
        $arenas.appendChild(playerWin());
        generateLogs('draw');
    }
}

function generateLogs(type, player1, player2, valueHP = 0) {
    const time = getTime();
    // const text = logs[type][getRandomDamage(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    
    switch(type) {
        case 'hit':
            text = logs[type][getRandomDamage(logs.hit.length) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)
            + ' -' + valueHP + '.' + player1.name + ' ' + player1.hp + '/100';
            break;
        case 'defence':
            text = logs[type][getRandomDamage(logs.defence.length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)
                + ' -' + valueHP + '.' + player2.name + ' ' + player2.hp + '/100';
            break;
        case 'start':
            text = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'end':
            text = logs[type][getRandomDamage(logs.end.length) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        case 'draw':
            text = logs[type];
            break;
        default:
            text = 'ниче не случилось :)';
            break;
    }


    console.log(text);
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin', el);

}

function getTime() {
    const date = new Date();
    return (
        `${date.getHours()}:${('0' + date.getMinutes()
        ).slice(-2)}`
    ) 

    
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
    
    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value)
        generateLogs('hit', player2, player1);
    }
    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        generateLogs('hit', player1, player2);
    }

    showResult();
    
})

generateLogs('start', player1, player2);

