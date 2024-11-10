from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserListView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/ml/", include("ml.urls")),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

CORS_ALLOWED_ORIGINS = [
    "https://localhost:5173",  # Your frontend URL
]
CORS_ALLOW_ALL_ORIGINS = True
