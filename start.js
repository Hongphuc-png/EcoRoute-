import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n======================================================');
console.log('🌱 KHỞI ĐỘNG HỆ THỐNG GỘP CHUNG - ECOROUTE OPTI');
console.log('======================================================\n');

// Start Unified Server (FastAPI serving both React Frontend and REST API)
const server = spawn('python', ['-m', 'uvicorn', 'backend.main:app', '--host', '127.0.0.1', '--port', '8000', '--reload'], {
  cwd: __dirname,
  shell: true,
  stdio: 'inherit'
});

console.log('🚀 Hệ thống đã được gộp chung vào MỘT LOCALHOST DUY NHẤT:');
console.log('👉 Địa chỉ truy cập chính (Web App): http://localhost:8000');
console.log('👉 Tài liệu API (Swagger UI):        http://localhost:8000/docs');
console.log('👉 API Endpoints REST:               http://localhost:8000/api/v1');
console.log('\n💡 Nhấn Ctrl + C để dừng tiến trình máy chủ.\n');

const cleanup = () => {
  console.log('\n🛑 Đang dừng hệ thống EcoRoute Opti...');
  server.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
