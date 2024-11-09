import torch
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pickle

# Load the model and tokenizer from the pickle file
with open("/Users/user/hackthisfall/backend/symtodis/ml/daignostic.pkl", "rb") as file:
    data = pickle.load(file)
    model = data[0]  # BERT model
    tokenizer = data[1]  # BERT tokenizer


class PredictAPIView(APIView):
    def post(self, request):
        symptoms = [
            request.data.get("symptom1"),
            request.data.get("symptom2"),
            request.data.get("symptom3"),
            request.data.get("symptom4"),
        ]

        # Combine symptoms into a single text input
        symptoms_text = " ".join(symptoms)

        # Tokenize the input text
        inputs = tokenizer(
            symptoms_text, return_tensors="pt", padding=True, truncation=True
        )

        # Run the model on the tokenized input
        with torch.no_grad():
            outputs = model(**inputs)

        # Get the predicted label (assuming logits output)
        logits = outputs.logits

        # Get the class probabilities (softmax of logits)
        probabilities = torch.nn.functional.softmax(logits, dim=1)

        # Get the predicted class index (class with highest probability)
        predicted_class_index = torch.argmax(probabilities, dim=1).item()

        # Optionally: map the class index to a human-readable label (if you have this mapping)
        class_labels = ["Flu", "Cold", "COVID-19", "Malaria"]  # Example class labels

        # Safe check for class index to avoid IndexError
        if predicted_class_index < len(class_labels):
            predicted_class_label = class_labels[predicted_class_index]
        else:
            predicted_class_label = "Unknown Class"

        # Return the logits, predicted class, and probabilities
        response_data = {
            "predicted_class_index": predicted_class_index,
            "predicted_class_label": predicted_class_label,
            "logits": logits.tolist(),  # Convert logits to a list for JSON serialization
            "probabilities": probabilities.tolist(),  # Convert probabilities to a list for JSON
        }

        return Response(response_data, status=status.HTTP_200_OK)
