from openai import OpenAI
import time

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

        time.sleep(1)


def chatbot(client, assistant, thread):
    while True:
        user_input = input("User: ")
        if user_input == "quit":
            break

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
            print("Gardening Assistant:", assistant_message)

def main():
    client = OpenAI(api_key='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')

    print("Welcome to the Gardening Assistant. How can I help you today?\n")

    uploaded_file = client.files.create(
        file=open("plantInfo-clean.csv", 'rb'),
        purpose='assistants',
    )

    assistant = client.beta.assistants.create(
      name="Gardening Assistant",
      instructions="You are a personal gradening assistant.Take data from provided csv files first.When asked a gardening question about plants guide users with helpful information. Do not answer questions other than gardening!",
      model="gpt-4-1106-preview",
      tools=[{"type": "code_interpreter"}],
      file_ids=[uploaded_file.id]
    )

    thread = client.beta.threads.create()

    chatbot(client, assistant, thread)

if __name__ == "__main__":
    main()
