import random
import time

cities = ["Delhi","Mumbai","Hyderabad"]

while True:
    print({
        "city": random.choice(cities),
        "complaints": random.randint(10,100)
    })
    time.sleep(5)