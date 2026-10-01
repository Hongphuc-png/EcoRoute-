import subprocess
import sys
import os
import signal

def main():
    print("\n======================================================")
    print("🌱 KHỞI ĐỘNG HỆ THỐNG GỘP CHUNG - ECOROUTE OPTI")
    print("======================================================\n")

    root_dir = os.path.dirname(os.path.abspath(__file__))

    server_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "backend.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"],
        cwd=root_dir
    )

    print("🚀 Hệ thống đã được gộp chung vào MỘT LOCALHOST DUY NHẤT:")
    print("👉 Địa chỉ truy cập chính (Web App): http://localhost:8000")
    print("👉 Tài liệu API (Swagger UI):        http://localhost:8000/docs")
    print("👉 API Endpoints REST:               http://localhost:8000/api/v1")
    print("\n💡 Nhấn Ctrl + C để dừng hệ thống.\n")

    def handle_exit(sig, frame):
        print("\n🛑 Đang tắt hệ thống...")
        server_proc.terminate()
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_exit)
    signal.signal(signal.SIGTERM, handle_exit)

    server_proc.wait()

if __name__ == "__main__":
    main()
