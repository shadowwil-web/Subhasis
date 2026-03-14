#!/usr/bin/env python3
import http.server
import socketserver
import os
from pathlib import Path

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server():
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"\n{'='*50}")
            print(f"✅ GenBridge Server Running")
            print(f"{'='*50}")
            print(f"📍 Visit: http://localhost:{PORT}")
            print(f"📁 Serving from: {DIRECTORY}")
            print(f"{'='*50}")
            print(f"Press Ctrl+C to stop\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n❌ Server stopped")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is already in use. Try another port or close the existing server.")
        else:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    run_server()
