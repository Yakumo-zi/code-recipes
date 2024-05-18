import socket


IP = "127.0.0.1"
PORT = 9998

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client.connect((IP, PORT))

client.send(b'ABCD')

response = client.recv(4096)

print(response.decode('utf-8'))

client.close()
