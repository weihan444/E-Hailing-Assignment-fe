export const request = [
    {
        "id": "1",
        "customer": "Ray",
        "status": "reached",
        "arrtime": "1450",
        "capacity": "5",
        "startpoint": "1,2",
        "destination": "3,4"
    },
    {
        "id": "2",
        "customer": "John",
        "status": "picked up",
        "arrtime": "1730",
        "capacity": "5",
        "startpoint": "3,4",
        "destination": "5,6"
    },
    {
        "id": "3",
        "customer": "Adam",
        "status": "pending",
        "arrtime": "1730",
        "capacity": "4",
        "startpoint": "5,6",
        "destination": "7,8"
    },
    {
        "id": "4",
        "customer": "Kobe",
        "status": "waiting",
        "arrtime": "1840",
        "capacity": "3",
        "startpoint": "7,8",
        "destination": "9,0"
    }
]

export const drivers = [
    {
        "id": "1",
        "driver": "Driver 1",
        "status": "available",
        "capacity": "5",
        "location": "1,2",
        "customer": "-"
    },
    {
        "id": "2",
        "driver": "Driver 2",
        "status": "not available",
        "capacity": "5",
        "location": "3,4",
        "customer": "John"
    },
    {
        "id": "3",
        "driver": "Driver 3",
        "status": "available",
        "capacity": "5",
        "location": "5,6",
        "customer": "-"
    }
]