const $arenas = document.querySelector('.arenas');

const $randomButton = document.querySelector('.button');

// Игрок №1--------------

let player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['AK-47', 'M4A1', 'USP-S', 'Deagle', 'AWP'],
    attack() {
        console.log( this.name + ' ' + 'Fight...' );
    }
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
    }
};

function changeHP (player) {
    const $playerLife = document.querySelector('.player'+ player.player +' .life');

    player.hp -= Math.ceil(Math.random() * 20)
    $playerLife.style.width = player.hp + '%';

    if (player.hp < 0) {
        $arenas.appendChild(playerLose(player.name));
        $randomButton.disabled = true;
    } 

}

function playerLose (name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';

    return $loseTitle;

}

$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
})

function createElement (tag, className) {
    $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    $tag.classList.add(className);
    
    return $tag;
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