// 화면에 네모, 원
// 프레임마다 코드 실행 가능

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 스타일 입히기
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100); // 10.10 좌표에 100*100사이즈에 네모그리기