from django.urls import path
from .views import PredictFromDescriptionAPIView

urlpatterns = [
    path("predict/", PredictFromDescriptionAPIView.as_view(), name="predict"),
]
