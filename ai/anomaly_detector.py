import pandas as pd

def detect_spike(series):
    mean = series.mean()
    latest = series.iloc[-1]

    if latest > mean * 1.5:
        return True
    return False