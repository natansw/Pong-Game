var canvas = document.getElementById('canvas')
var container = canvas.getContext("2d")

container.fillStyle = "#8b8b8b"
var jogador1 = {
  px: 65,
  py: 150,
  tx: 25,
  ty:200,
  dir: 0,
}
var jogador2 = {
  px: 910,
  py: 0,
  tx: 25,
  ty: 200,
  dir: 8,
}
var bolinha = {
  px: 487,
  py: 240,
  tx: 26,
  ty: 26,
  dir: 8,
  diry: 2,
}

var jogando = true

container.font = "20px Arial"
var pts1 = 0
var pts2 = 0

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 87) {
    jogador1.dir = -8
  }
  else if (e.keyCode === 83) {
    jogador1.dir = 8
  }
})

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 87) {
    jogador1.dir = 0
  }
  else if (e.keyCode === 83) {
    jogador1.dir = 0
  }
})

function Move_player() {
  if (jogador1.py < 0) { //limite acima
    jogador1.py = 0
  }
 else if (jogador1.py > 300) { //limite de baixo
   jogador1.py = 300
 }

 if (jogador2.py < 0) {
     jogador2.dir *= -1
   }
else if (jogador2.py > 300) {
       jogador2.dir *= -1
  }

  jogador1.py += jogador1.dir
  jogador2.py += jogador2.dir
}

function gameover() { //condição de vitória
  if (pts1 > 2 || pts2 > 2) {
    jogando = false
  }
}

function Move_Ball() { //bolinha mudar de direção
  bolinha.px += bolinha.dir
  bolinha.py += bolinha.diry

if (bolinha.py < 0) {
  bolinha.diry *= -1
 }
 else if (bolinha.py > 474) {
  bolinha.diry *= -1
 }
}

function points() {
      if (bolinha.px < -100) {
      bolinha.px = 487
      bolinha.py = 240
      bolinha.dir *= -1
      pts2 += 1 //marcar ponto p/ jogador2
    }
    else if (bolinha.px > 1380) {
      bolinha.px = 487
      bolinha.py = 240
      bolinha.dir *= -1
      pts1 += 1
    }
}

function colision_ball() {
  if (bolinha.py + bolinha.ty >= jogador2.py && bolinha.py <= jogador2.py + jogador2.ty  && bolinha.px <= jogador2.px + jogador2.tx && bolinha.px >= jogador2.px - jogador2.tx) {
    bolinha.dir *= -1
  }
  else if (bolinha.py + bolinha.ty >= jogador1.py && bolinha.py <= jogador1.py + jogador1.ty  && bolinha.px <= jogador1.px + jogador1.tx && bolinha.px >= jogador1.px - jogador1.tx) {
    bolinha.dir *= -1
    }
}

function Draw() {
  container.fillRect(jogador1.px, jogador1.py, jogador1.tx, jogador1.ty)
  container.fillRect(jogador2.px, jogador2.py, jogador2.tx, jogador2.ty)
  container.fillRect(bolinha.px, bolinha.py, bolinha.tx, bolinha.ty)
  container.fillText("Score 1: " + pts1, 190, 50)
  container.fillText("Score 2: " + pts2, 700, 50)
}

function DrawWin() {
  container.clearRect(0,0,1000,500)
  container.font = "40px Arial"
  container.fillText("Score 1: " + pts1, 190, 240)
  container.fillText("Score 2: " + pts2, 700, 240)
}

 function Main() {
  if (jogando) {
    container.clearRect(0,0,1000,500)
    Draw()
    Move_Ball()
    colision_ball()
    points()
    Move_player()
    gameover()
  }
  else {
    DrawWin()
  }
}

setInterval(Main, 10) //tempo da bolinha ir de um lado pro outro.
