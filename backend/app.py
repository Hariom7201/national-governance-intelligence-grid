from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json, os

app = FastAPI(title="NGIG Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load(filename):
    with open(os.path.join(DATA_DIR, filename), encoding="utf-8") as f:
        return json.load(f)

# ── DISTRICTS ──────────────────────────────────────────────
@app.get("/districts")
def get_districts():
    return load("district_data.json")

@app.get("/district/{name}")
def get_district(name: str):
    districts = load("district_data.json")
    for d in districts:
        if d["name"].lower().replace(" ","") == name.lower().replace(" ",""):
            return d
    raise HTTPException(404, "District not found")

@app.get("/districts/stats")
def get_district_stats():
    districts = load("district_data.json")
    total_pop = sum(d["population"] for d in districts)
    avg_literacy = round(sum(d["literacy_rate"] for d in districts) / len(districts), 1)
    high_risk = sum(1 for d in districts if d["risk_level"] in ["High","Critical"])
    avg_health = round(sum(d["health_score"] for d in districts) / len(districts), 1)
    return {
        "total_population": total_pop,
        "avg_literacy": avg_literacy,
        "high_risk_count": high_risk,
        "total_states": len(districts),
        "avg_health_score": avg_health,
        "low_risk": sum(1 for d in districts if d["risk_level"] == "Low"),
        "medium_risk": sum(1 for d in districts if d["risk_level"] == "Medium"),
        "high_risk": sum(1 for d in districts if d["risk_level"] == "High"),
        "critical_risk": sum(1 for d in districts if d["risk_level"] == "Critical"),
    }

# ── CRISIS ─────────────────────────────────────────────────
@app.get("/crisis")
def get_all_crises():
    return load("complaints.json")

@app.get("/crisis/{district}")
def get_crisis_by_district(district: str):
    crises = load("complaints.json")
    return [c for c in crises if district.lower() in c["district"].lower()]

@app.get("/crisis/stats/summary")
def get_crisis_stats():
    crises = load("complaints.json")
    by_type: dict = {}
    by_severity: dict = {}
    for c in crises:
        by_type[c["type"]] = by_type.get(c["type"], 0) + 1
        by_severity[c["severity"]] = by_severity.get(c["severity"], 0) + 1
    return {
        "total": len(crises),
        "active": sum(1 for c in crises if c["status"] == "Active"),
        "in_progress": sum(1 for c in crises if c["status"] == "In Progress"),
        "by_type": by_type,
        "by_severity": by_severity,
        "critical_count": by_severity.get("Critical", 0),
        "high_count": by_severity.get("High", 0),
    }

# ── FRAUD / CRIME ──────────────────────────────────────────
@app.get("/fraud")
def get_fraud():
    return load("fraud_data.json")

@app.get("/fraud/{state}")
def get_fraud_by_state(state: str):
    frauds = load("fraud_data.json")
    results = [f for f in frauds if state.lower() in f["district"].lower()]
    if not results:
        raise HTTPException(404, "State not found")
    return results[0]

@app.get("/fraud/stats/summary")
def get_fraud_stats():
    frauds = load("fraud_data.json")
    avg_detection = round(sum(f["detection_rate"] for f in frauds) / len(frauds), 1)
    avg_murder = round(sum(f["murder_rate"] for f in frauds) / len(frauds), 1)
    verified = sum(1 for f in frauds if f["status"] == "Verified Fraud")
    flagged = sum(1 for f in frauds if f["status"] == "Flagged")
    return {
        "total_states": len(frauds),
        "avg_detection_rate": avg_detection,
        "avg_murder_rate": avg_murder,
        "verified_fraud": verified,
        "flagged": flagged,
        "under_investigation": sum(1 for f in frauds if f["status"] == "Under Investigation"),
        "lowest_detection": min(frauds, key=lambda x: x["detection_rate"])["district"],
        "highest_detection": max(frauds, key=lambda x: x["detection_rate"])["district"],
    }

# ── ACTIONS ────────────────────────────────────────────────
@app.get("/actions")
def get_actions():
    return load("actions_data.json")

@app.get("/actions/{district}")
def get_actions_by_district(district: str):
    actions = load("actions_data.json")
    return [a for a in actions if district.lower() in a["district"].lower()]

# ── RECOMMENDATIONS ────────────────────────────────────────
@app.get("/recommendation/{name}")
def get_recommendation(name: str):
    districts = load("district_data.json")
    d = next((x for x in districts if x["name"].lower().replace(" ","") == name.lower().replace(" ","")), None)
    if not d:
        raise HTTPException(404, "District not found")
    
    insights = []
    actions = []
    
    if d["risk_level"] in ["High","Critical"]:
        insights.append(f"{d['name']} is at {d['risk_level']} risk — immediate governance intervention needed.")
        actions.append("Conduct emergency district review")
    if d["literacy_rate"] < 60:
        insights.append(f"Literacy rate of {d['literacy_rate']}% is critically low — education programs required.")
        actions.append("Launch adult literacy mission")
    if d["work_participation"] < 35:
        insights.append(f"Work participation at {d['work_participation']}% indicates high unemployment pressure.")
        actions.append("Deploy MGNREGA & skill development camps")
    if d["illiteracy_rate"] > 40:
        insights.append(f"Illiteracy at {d['illiteracy_rate']}% — mid-day meal & school retention schemes needed.")
        actions.append("Strengthen Sarva Shiksha Abhiyan")
    if d["st_pct"] > 20:
        insights.append(f"Significant tribal population ({d['st_pct']}%) — tribal welfare schemes must be prioritized.")
        actions.append("Tribal sub-plan fund utilization review")
    if not insights:
        insights.append(f"{d['name']} is performing within acceptable parameters.")
        actions.append("Continue regular monitoring")
    
    return {
        "district": d["name"],
        "risk_score": round(100 - d["health_score"], 1),
        "health_score": d["health_score"],
        "insights": insights,
        "recommended_actions": actions,
        "literacy_rate": d["literacy_rate"],
        "work_participation": d["work_participation"],
    }

# ── DASHBOARD SUMMARY ──────────────────────────────────────
@app.get("/dashboard/summary")
def get_dashboard_summary():
    districts = load("district_data.json")
    crises = load("complaints.json")
    frauds = load("fraud_data.json")
    actions = load("actions_data.json")
    
    total_pop = sum(d["population"] for d in districts)
    total_complaints = sum(d["complaints_this_month"] for d in districts)
    active_crises = sum(1 for c in crises if c["status"] == "Active")
    total_actions = sum(d["actions_taken"] for d in districts)
    avg_detection = round(sum(f["detection_rate"] for f in frauds) / len(frauds), 1)
    
    return {
        "total_grievances": total_complaints,
        "active_crises": active_crises,
        "fraud_alerts": len(frauds),
        "actions_taken": total_actions,
        "total_population": total_pop,
        "avg_detection_rate": avg_detection,
        "high_risk_states": sum(1 for d in districts if d["risk_level"] in ["High","Critical"]),
    }
