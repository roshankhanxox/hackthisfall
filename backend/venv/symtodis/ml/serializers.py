from rest_framework import serializers


class SymptomSerializer(serializers.Serializer):
    symptom1 = serializers.CharField(max_length=15)
    symptom2 = serializers.CharField(max_length=15)
    symptom3 = serializers.CharField(max_length=15)
    symptom4 = serializers.CharField(max_length=15)
