fb-streamlit-auth

Simple component that implements Firebase authentication.

Example usage:

```python
import streamlit as st
from fb_streamlit_auth import fb_streamlit_auth

st.write('''## Hello
- world
''')

user = fb_streamlit_auth(
    "<apiKey>",
    "<authDomain>",
    "<databaseURL>",
    "<projectId>",
    "<storageBucket>",
    "messagingSenderId",
    "appId",
    "measurementId"
)

st.write(user)
```

The implementation, right now, is really crude. The API is subject to change. The ```user``` object returned by fb_streamlit_auth is None if the user is not logged in.
When the user is logged in the object also contains the custom claims associated to the user. In this way the app can check for claims to block or allow access.

## Inspiration
My main source of inspiration was the [msal_streamlit_authentication library](https://github.com/mstaal/msal_streamlit_authentication)