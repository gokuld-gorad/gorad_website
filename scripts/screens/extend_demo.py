"""Adds website-screenshot demo data (see docs/image-prompts.md) to a seeded demo plant, through the real API.
Uses the demo seed's own accounts (tools/demo/seed_demo_plant.py)."""
import os
import random
import sys
from datetime import UTC, datetime, timedelta

import httpx

API = os.environ.get("GORAD_API", "http://127.0.0.1:8010")
ADMIN_PW = os.environ["GORAD_DEMO_ADMIN_PASSWORD"]
USER_PW = os.environ["GORAD_DEMO_USER_PASSWORD"]
REAUTH = "X-Gorad-Reauth"
c = httpx.Client(base_url=API, timeout=30)


def login(user, pw):
    r = c.post("/api/v1/auth/login", json={"username": user, "password": pw})
    r.raise_for_status()
    return {"Authorization": f"Bearer {r.json()['data']['token']}"}


def call(method, path, h, ok=(200, 201), **kw):
    r = c.request(method, path, headers=h, **kw)
    if r.status_code not in ok:
        print(f"!! {method} {path} -> {r.status_code} {r.text[:400]}")
        return None
    return r.json().get("data")


admin = login("admin", ADMIN_PW)

# 1. A dev licence with every app (the seed's licence covers core, connect and vision only).
doc = call("POST", "/api/v1/licence/issue-dev", admin, json={
    "customer": "Gorad Demo", "licence_id": "LIC-DEMO",
    "entitlements": ["core", "connect", "vision", "spc", "line", "ncr", "maintenance", "trace",
                     "tool_life", "dispatch", "skills", "calibration", "training.operate", "training.self_service"],
})
call("POST", "/api/v1/licence/import", {**admin, REAUTH: ADMIN_PW}, json=doc)
print("licence ok")

quality = login("demo_quality", USER_PW)
random.seed(7)

# 2. SPC: a bore diameter on an X-bar/R chart that drifts after its limits are locked.
ch = call("POST", "/api/v1/spc/characteristics", quality, json={
    "name": "Big-end bore diameter", "part_number": "CR-4471", "source_type": "manual",
    "unit": "mm", "lsl": 51.980, "usl": 52.020, "nominal": 52.000,
    "chart_type": "xbar_r", "subgroup_size": 5, "sampling": {"mode": "consecutive"},
    "rules": ["WE1", "WE2", "WE3", "WE4"],
})
if ch:
    cid = ch["id"]
    start = datetime.now(UTC) - timedelta(hours=40)

    def subgroup(i, shift):
        for j in range(5):
            v = round(random.gauss(52.000 + shift, 0.0035), 4)
            ts = (start + timedelta(minutes=60 * i + j)).isoformat()
            call("POST", f"/api/v1/spc/characteristics/{cid}/measurements", quality, json={"value": v, "ts": ts})

    for i in range(25):
        subgroup(i, 0.0)
    call("POST", f"/api/v1/spc/characteristics/{cid}/limits/lock", {**quality, REAUTH: USER_PW},
         json={"last_subgroups": 25, "reason": "Initial limits from 25 stable subgroups"})
    for i in range(25, 36):
        subgroup(i, 0.0045)  # tool wear: the mean creeps up
    print("spc ok", cid)

# 3. NCR raised for the drift, with containment.
ncr = call("POST", "/api/v1/ncr/ncrs", quality, json={
    "title": "Big-end bore drifting towards upper limit", "severity": "major", "source": "manual",
    "kind": "internal", "part_number": "CR-4471", "quantity": 120, "batch": "B-1027",
    "defect_class": "bore_oversize",
    "description": "SPC flagged eight subgroups in a row above the centre line on the big-end bore. Suspected boring tool wear.",
})
if ncr:
    nid = ncr["id"]
    rv = ncr.get("row_version", 1)
    n2 = call("POST", f"/api/v1/ncr/ncrs/{nid}/containment", quality,
              json={"text": "Quarantine batch B-1027 and 100 % re-measure the bore", "row_version": rv})
    print("ncr ok", nid, bool(n2))

# 4. Calibration: a small gauge register.
for code, name, gtype, unit, days, last in [
    ("BG-012", "Bore gauge 50–60 mm", "bore gauge", "mm", 180, 40),
    ("MC-031", "Outside micrometer 25–50 mm", "micrometer", "mm", 365, 120),
    ("CMM-01", "Coordinate measuring machine", "CMM", "mm", 365, 350),
    ("TW-004", "Torque wrench 20–100 Nm", "torque wrench", "Nm", 90, 95),
]:
    g = call("POST", "/api/v1/calibration/gauges", quality, json={
        "code": code, "name": name, "gauge_type": gtype, "unit": unit, "interval_days": days,
        "location": "Quality lab", "last_calibrated_on": (datetime.now(UTC) - timedelta(days=last)).date().isoformat(),
    })
print("gauges done")

# 5. Maintenance: one press with a breakdown order.
asset = call("POST", "/api/v1/maintenance/assets", admin, json={"name": "Press P-200", "location": "Line 2", "criticality": "A", "safety_critical": True})
if asset:
    supervisor = login("demo_supervisor", USER_PW)  # admins may not open work orders
    for t in ["breakdown"]:
        wo = call("POST", "/api/v1/maintenance/work-orders", supervisor, json={
            "asset_id": asset["id"], "title": "Hydraulic pressure drop during stroke", "wo_type": t, "priority": "high",
            "description": "Andon raised at 10:42; press stopped mid-stroke.",
        })
        if wo:
            print("wo ok", t)
            break
sys.exit(0)
