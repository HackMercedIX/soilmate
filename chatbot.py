from openai import OpenAI
import time
from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_input = data.get('message')

    if user_input == "quit":
        return jsonify({"response": "Goodbye!"})

    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_input
    )

    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
    )

    check_run(client, thread.id, run.id)

    messages = client.beta.threads.messages.list(thread_id=thread.id)

    assistant_message = None
    for msg in messages:
        if msg.role == "assistant":
            assistant_message = msg.content[0].text.value
            break

    if assistant_message:
        return jsonify({"response": assistant_message})
    else:
        return jsonify({"response": "I'm sorry, I couldn't understand that."})

def initialize_gardening_assistant():
    client = OpenAI()

    file_ids = []

    files_to_upload = ["plantInfo-clean.csv", "Plant_Data_English.csv"]  # Example file names

    for file_name in files_to_upload:
        uploaded_file = client.files.create(
            file=open(file_name, 'rb'),
            purpose='assistants',
        )
        file_ids.append(uploaded_file.id)

    assistant = client.beta.assistants.create(
      name="Gardening Assistant",
      instructions="You are a personal gradening assistant.Take data from provided csv files first.When asked a gardening question about plants guide users with helpful information. Do not answer questions other than gardening!",
      model="gpt-3.5-turbo",
      tools=[{"type": "code_interpreter"}],
      file_ids=file_ids
    )

    thread = client.beta.threads.create()
    return client, assistant, thread


def check_run(client, thread_id, run_id):
    while True:
        run = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )

        if run.status == "completed":
            break
        elif run.status == "expired":
            print("Timeout.")
            break

def main():
    global client, assistant, thread
    client, assistant,thread = initialize_gardening_assistant()
    app.run(debug=True)

if __name__ == "__main__":
    main()
