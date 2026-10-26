"""Posts changing demo readings for the seeded simulated press, once a second, through the
same endpoint the demo seed uses. Demo data only; stops after a fixed time."""
import math, os, random, sys, time
import httpx
key, conn = os.environ["GORAD_GW_KEY"], sys.argv[1]
c = httpx.Client(base_url="http://127.0.0.1:8010", timeout=10)
count = 12840
for i in range(int(sys.argv[2]) if len(sys.argv) > 2 else 180):
    count += random.choice([1, 1, 1, 2])
    temp = 61.5 + 1.2 * math.sin(i / 9) + random.uniform(-0.2, 0.2)
    c.post("/api/v1/connect/live", headers={"X-Api-Key": key}, json={"connection_id": conn, "values": [
        {"tag_name": "run_bit", "value": True, "quality": "good"},
        {"tag_name": "fault_bit", "value": False, "quality": "good"},
        {"tag_name": "count", "value": count, "quality": "good"},
        {"tag_name": "temperature", "value": round(temp, 1), "quality": "good"},
    ]})
    time.sleep(1)
