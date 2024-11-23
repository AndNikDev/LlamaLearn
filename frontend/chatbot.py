import streamlit as st
import requests

# Configuración de la página
st.set_page_config(page_title="LlamaLearn Chatbot", page_icon="🦙", layout="centered")

# Título
st.title("🦙 LlamaLearn Chatbot")

# Estado para los mensajes
if "messages" not in st.session_state:
    st.session_state["messages"] = []

if "latest_message" not in st.session_state:
    st.session_state["latest_message"] = None  # Almacena el último mensaje procesado

# Mostrar los mensajes
st.subheader("Chat")
for message in st.session_state["messages"]:
    role = "Usuario" if message["role"] == "user" else "Chatbot"
    st.write(f"**{role}:** {message['content']}")

# Entrada de usuario
with st.form("chat_form", clear_on_submit=True):
    user_input = st.text_area("Escribe tu mensaje aquí:", height=100)
    action = st.selectbox("Selecciona una acción", ["Generar Actividad", "Validar Actividad"])
    submit_button = st.form_submit_button("Enviar")

# Enviar mensaje
if submit_button and user_input.strip():
    # Agregar mensaje del usuario al estado antes de la solicitud
    st.session_state["messages"].append({"role": "user", "content": f"[{action}] {user_input}"})
    st.session_state["latest_message"] = user_input  # Guardar el último mensaje para evitar procesarlo varias veces

    # Determinar la URL y el payload según la acción
    if action == "Generar Actividad":
        url = "http://localhost:3000/api/ai/activity"
        payload = {"prompt": user_input}  # Cuerpo para la generación de actividades
    elif action == "Validar Actividad":
        url = "http://localhost:3000/api/agents/validate-activity"
        payload = {"activity": user_input}  # Cuerpo para la validación de actividades

    # Realizar la solicitud al backend
    try:
        with st.spinner("Procesando..."):
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            data = response.json()

            # Obtener la respuesta según la acción
            if action == "Generar Actividad":
                bot_response = data.get("activity", "No se pudo generar la actividad.")
            elif action == "Validar Actividad":
                bot_response = data.get("validation", "No se pudo validar la actividad.")
    except requests.exceptions.RequestException as e:
        bot_response = f"Error al conectar con el backend: {e}"
    
    # Agregar la respuesta del chatbot al estado
    st.session_state["messages"].append({"role": "assistant", "content": bot_response})

    st.rerun()  # Volver a ejecutar la aplicación para mostrar los mensajes