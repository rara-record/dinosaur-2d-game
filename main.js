// 화면에 네모, 원
// 프레임마다 코드 실행 가능

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const cactusArray = [];
let animation;
let timer = 0;
let isJump = false;
let jumpCount = true;

const dinoImg = new Image();
const cactusImg = new Image();
dinoImg.src = 'img/dinosaur.png';
cactusImg.src = 'img/cactus.png';

canvas.width = window.innerWidth - 500;
canvas.height = window.innerHeight - 500;


// 공룡 폭과 높이
const dino = {
  x: 10,
  y: 200,
  width: 45,
  height: 45,
  draw() {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(dinoImg, this.x, this.y, dinoImg.width / 3, dinoImg.height / 3);
  },

  jump() {
    this.y--;
  },

  // 최대 높이(y)를 정해주기. 
  fall() {
    if (this.y < 200) {
      this.y++;
    }
  }

}
dino.draw();


// 장애물 생성
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 45;
    this.height = 45;
  }
  draw() {
    // ctx.fillStyle = 'orange';
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(cactusImg, this.x, this.y, cactusImg.width / 1.5, cactusImg.height / 1.5)
  }
}

// 1초에 60번 코드 실행하기
function animate() {
  animation = requestAnimationFrame(animate)
  timer++;
  // dino.x++
  ctx.clearRect(0, 0, canvas.width, canvas.height) // 잔상남는 문제 해결


  // 120프레임마다 장애물을 생성해서, array 넣고 관리
  if (timer % 200 === 0) {
    const cactus = new Cactus();
    cactusArray.push(cactus);
  }

  // 장애물 제거하기
  cactusArray.forEach((item, i, array) => {
    if (item.x < 0) array.splice(i, 1) // x좌표가 0미만이면 
  });

  // 장애물 꺼내서 할일
  cactusArray.forEach(item => {
    item.x--; // 장애물 움직이기
    item.draw(); // 장애물 그리기
    checkCollision(dino, item); // 충돌체크함수 호출
  })


  // 공룡 점프하기
  if (isJump === true) {
    dino.jump();
    jumpCount++;
  } else if (isJump === false) {
    jumpCount = 0;
    dino.fall();
  }

  // 점프 높이 설정 : 100프레임 지나면 점프 그만하기
  if (jumpCount > 100) {
    isJump = false;
  }



  dino.draw();
}
animate();

// 충돌 확인하기
function checkCollision(dino, cactus) {
  // x축의 차이 = 장애물 x축 시작점 - 공룡 x축 끝점
  const x_axis = cactus.x - (dino.x + dino.width);
  // y축의 차이 = 장애물의 y축 시작점 - 공룡.y축 끝점
  const y_axis = cactus.y - (dino.y + dino.height);
  // x축 차이가 음수면서, y축 차이가 음수면 충돌(게임끝)
  if (x_axis < 0 && y_axis < 0) {
    cancelAnimationFrame(animation);
  }
}

// space bar를 누르면 isJump == true
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    isJump = true;
  }
})
