from rest_framework import serializers


class SymptomDescriptionSerializer(serializers.Serializer):
    problem_text = serializers.CharField()

    def validate_problem_text(self, value):
        if not value.strip():
            raise serializers.ValidationError("Symptom description cannot be empty.")
        return value
