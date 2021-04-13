const $arenas = document.querySelector('.arenas');
const $control = document.querySelector('.control')
const $randomButton = document.querySelector('.button');

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

$randomButton.addEventListener('click', function() {
    player1.changeHP(getRandomDamage(20));
    player2.changeHP(getRandomDamage(20));

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === player1.hp) {
        $arenas.appendChild(playerWin());
    }
    
})

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

    $control.appendChild($div)
    
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
