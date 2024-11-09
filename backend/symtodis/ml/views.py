from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import google.generativeai as genai
import torch
import pickle
import json

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

# Load the predictive model and tokenizer
with open("daignostic.pkl", "rb") as file:
    data = pickle.load(file)
    model = data[0]  # BERT model
    tokenizer = data[1]

# Define class labels for diseases
class_labels = [
    "allergy",
    "arthritis",
    "bronchial asthma",
    "cervical spondylosis",
    "chicken pox",
    "common cold",
    "dengue",
    "diabetes",
    "drug reaction",
    "fungal infection",
    "gastroesophageal reflux disease",
    "hypertension",
    "impetigo",
    "jaundice",
    "malaria",
    "migraine",
    "peptic ulcer disease",
    "pneumonia",
    "psoriasis",
    "typhoid",
    "urinary tract infection",
    "varicose veins",
]

# Initialize the Gemini model and set up chat session configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}
model_gemini = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)


class PredictFromDescriptionAPIView(APIView):
    def post(self, request):
        # Get user's symptom description
        problem_text = request.data.get("problem_text")
        if not problem_text:
            return Response(
                {"error": "Please provide a description of symptoms."}, status=400
            )

        # Start a Gemini chat session to extract symptoms from description
        chat_session = model_gemini.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        "The user has provided a description of their health issues. Extract the main symptoms from the description and list them in a concise format. Make them extremely concise.make sure to just return a json body no backticks or json keyword\n\n"
                        f'User description: "{problem_text}"\nResponse format: {{"symptoms": ["symptom1", "symptom2", ...]}}\n'
                    ],
                }
            ]
        )
        response = chat_session.send_message(
            "Analyze the text and provide symptoms list."
        )
        response_text = response.text

        # Clean the response by removing backticks, 'json' keyword, and any unwanted characters
        cleaned_response_text = response_text.lstrip("```").strip()
        cleaned_response_text = response_text.rstrip("```").strip()

        # Remove the 'json' keyword before the JSON object
        if cleaned_response_text.startswith("json"):
            cleaned_response_text = cleaned_response_text[4:].strip()

        print(cleaned_response_text)

        # Parse symptoms from cleaned Gemini response (attempt to parse as JSON)
        try:
            # Now parse as JSON
            parsed_response = json.loads(cleaned_response_text)
            symptoms = parsed_response.get("symptoms", [])
        except (json.JSONDecodeError, KeyError) as e:
            return Response(
                {"error": f"Failed to parse symptoms from response: {str(e)}"},
                status=500,
            )

        # Combine symptoms into a single text for the predictive model
        symptoms_text = " ".join(symptoms)
        inputs = tokenizer(
            symptoms_text, return_tensors="pt", padding=True, truncation=True
        )

        # Run model prediction
        with torch.no_grad():
            outputs = model(**inputs)
        logits = outputs.logits
        probabilities = torch.nn.functional.softmax(logits, dim=1)[0]

        # Get top 2 predicted diseases with probabilities
        top2_probabilities, top2_indices = torch.topk(probabilities, 2)
        top_diseases = [
            {"disease": class_labels[index], "probability": prob.item()}
            for prob, index in zip(top2_probabilities, top2_indices)
        ]

        # Fetch symptoms based on primary predicted disease
        disease_name = top_diseases[0][
            "disease"
        ]  # Accessing the predicted disease from the top_diseases list
        symptoms_response = chat_session.send_message(
            f"Based on the disease {disease_name}, what are the common symptoms of this disease?"
        )
        symptoms = symptoms_response.text

        # Return response with predicted diseases and symptoms
        response_data = {
            "top_diseases": top_diseases,
            "disease_symptoms": symptoms,  # Adding the symptoms of the disease
        }

        return Response(response_data)

        # Combine symptoms into a single text for the predictive model
        symptoms_text = " ".join(symptoms)
        inputs = tokenizer(
            symptoms_text, return_tensors="pt", padding=True, truncation=True
        )

        # Run model prediction
        with torch.no_grad():
            outputs = model(**inputs)
        logits = outputs.logits
        probabilities = torch.nn.functional.softmax(logits, dim=1)[0]

        # Get top 2 predicted diseases with probabilities
        top2_probabilities, top2_indices = torch.topk(probabilities, 2)
        top_diseases = [
            {"disease": class_labels[index], "probability": prob.item()}
            for prob, index in zip(top2_probabilities, top2_indices)
        ]

        # Fetch natural remedies based on primary predicted disease
        remedies_response = chat_session.send_message(
            f"Based on the symptoms, suggest some natural remedies for {top_diseases[0]['disease']}."
        )
        remedies = remedies_response.text

        # Return response with predicted diseases and suggested remedies
        response_data = {
            "top_diseases": top_diseases,
            "remedies": remedies,
        }
        return Response(response_data)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.conf import settings
# import os
# import google.generativeai as genai
# import torch
# import pickle
# import json

# # Configure Gemini API
# genai.configure(api_key=settings.GEMINI_API_KEY)

# # Load the predictive model and tokenizer
# with open("daignostic.pkl", "rb") as file:
#     data = pickle.load(file)
#     model = data[0]  # BERT model
#     tokenizer = data[1]

# # Define class labels for diseases
# class_labels = [
#     "allergy",
#     "arthritis",
#     "bronchial asthma",
#     "cervical spondylosis",
#     "chicken pox",
#     "common cold",
#     "dengue",
#     "diabetes",
#     "drug reaction",
#     "fungal infection",
#     "gastroesophageal reflux disease",
#     "hypertension",
#     "impetigo",
#     "jaundice",
#     "malaria",
#     "migraine",
#     "peptic ulcer disease",
#     "pneumonia",
#     "psoriasis",
#     "typhoid",
#     "urinary tract infection",
#     "varicose veins",
# ]

# # Initialize the Gemini model and set up chat session configuration
# generation_config = {
#     "temperature": 1,
#     "top_p": 0.95,
#     "top_k": 40,
#     "max_output_tokens": 8192,
#     "response_mime_type": "text/plain",
# }
# model_gemini = genai.GenerativeModel(
#     model_name="gemini-1.5-flash",
#     generation_config=generation_config,
# )


# class PredictFromDescriptionAPIView(APIView):
#     def post(self, request):
#         # Get user's symptom description
#         problem_text = request.data.get("problem_text")
#         if not problem_text:
#             return Response(
#                 {"error": "Please provide a description of symptoms."}, status=400
#             )

#         # Start a Gemini chat session to extract symptoms from description
#         chat_session = model_gemini.start_chat(
#             history=[
#                 {
#                     "role": "user",
#                     "parts": [
#                         "The user has provided a description of their health issues. Extract the main symptoms from the description and list them in a concise format. Make them extremely concise.\n\n"
#                         f'User description: "{problem_text}"\nResponse format: {{"symptoms": ["symptom1", "symptom2", ...]}}\n'
#                     ],
#                 }
#             ]
#         )
#         response = chat_session.send_message(
#             "Analyze the text and provide symptoms list."
#         )
#         response_text = response.text
#         print(response_text)

#         # Parse symptoms from Gemini response (attempt to parse as JSON)
#         try:
#             parsed_response = json.loads(response_text)
#             symptoms = parsed_response.get("symptoms", [])
#         except (json.JSONDecodeError, KeyError):
#             return Response(
#                 {"error": "Failed to parse symptoms from response."}, status=500
#             )

#         # Combine symptoms into a single text for the predictive model
#         symptoms_text = " ".join(symptoms)
#         inputs = tokenizer(
#             symptoms_text, return_tensors="pt", padding=True, truncation=True
#         )

#         # Run model prediction
#         with torch.no_grad():
#             outputs = model(**inputs)
#         logits = outputs.logits
#         probabilities = torch.nn.functional.softmax(logits, dim=1)[0]

#         # Get top 2 predicted diseases with probabilities
#         top2_probabilities, top2_indices = torch.topk(probabilities, 2)
#         top_diseases = [
#             {"disease": class_labels[index], "probability": prob.item()}
#             for prob, index in zip(top2_probabilities, top2_indices)
#         ]

#         # Fetch natural remedies based on primary predicted disease
#         remedies_response = chat_session.send_message(
#             f"Based on the symptoms, suggest some natural remedies for {top_diseases[0]['disease']}."
#         )
#         remedies = remedies_response.text

#         # Return response with predicted diseases and suggested remedies
#         response_data = {
#             "top_diseases": top_diseases,
#             "remedies": remedies,
#         }
#         return Response(response_data)
