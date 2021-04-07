let fight = 'Fight...'
// Игрок №1--------------
let player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['AK-47', 'M4A1', 'USP-S', 'Deagle', 'AWP'],
    attack() {
        console.log( this.name + ' ' + fight );
    }
}
// Игрок №2--------------
let player2 = {
    name: 'LiuKang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['AWP'],
    attack() {
        console.log( this.name + ' ' + fight );
    }
}

let playerCounter = 0;

function createPlayer(player) {
    playerCounter += 1;
    const arena = document.querySelector('.arenas');
    arena.innerHTML += `<div class="player${playerCounter}">
                        <div class="progressbar">
                            <div class="life" style='width:100%'></div>
                            <div class="name">${player.name}</div>
                        </div>
                        <div class="character">
                            <img src="${player.img}" />
                        </div>
                    </div>
                    `
}
createPlayer(player1);
createPlayer(player2);