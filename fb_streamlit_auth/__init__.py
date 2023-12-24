import os
import streamlit.components.v1 as components

_USE_WEB_DEV_SERVER = os.getenv("USE_WEB_DEV_SERVER", False)
_WEB_DEV_SERVER_URL = os.getenv("WEB_DEV_SERVER_URL", "http://localhost:5173")
COMPONENT_NAME = "fb_streamlit_auth"

if _USE_WEB_DEV_SERVER:
    _component_func = components.declare_component(name=COMPONENT_NAME, url=_WEB_DEV_SERVER_URL)
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend", "dist")
    _component_func = components.declare_component(name=COMPONENT_NAME, path=build_dir)


def fb_streamlit_auth(apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId):
    return _component_func(
        apiKey=apiKey,
        authDomain=authDomain,
        databaseURL=databaseURL,
        projectId=projectId,
        storageBucket=storageBucket,
        messagingSenderId=messagingSenderId,
        appId=appId,
        measurementId=measurementId
    )
