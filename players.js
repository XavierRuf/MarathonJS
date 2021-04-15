const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');
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

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    console.dir($formFight);
    const enemy = enemyAttack();

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

    player1.changeHP(getRandomDamage(attack.value));
    player2.changeHP(getRandomDamage(attack.value));

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === player1.hp) {
        $arenas.appendChild(playerWin());
    }


    console.log('###: A', attack);
    console.log('###: E', enemy);
})

