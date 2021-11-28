// 화면에 네모, 원
// 프레임마다 코드 실행 가능

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const cactusArray = [];
let timer = 0;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 공룡 폭과 높이
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
dino.draw();

// 장애물 생성
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}


// 1초에 60번 코드 실행하기
function animate() {
  requestAnimationFrame(animate)
  timer++;
  // dino.x++
  ctx.clearRect(0, 0, canvas.width, canvas.height) // 잔상남는 문제 해결

  // 120프레임마다 장애물을 생성해서, array 넣고 관리
  if (timer % 144 === 0) {
    const cactus = new Cactus();
    cactusArray.push(cactus);
  }
  // 장애물들을 하나씩 꺼내서, 반대방향으로 그려준다
  cactusArray.forEach((item) => {
    item.x--; // 반대로 가야하니까 --;
    item.draw()
  });

  // 공룡 그리기
  dino.draw();
}
animate();