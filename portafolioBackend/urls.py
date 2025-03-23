# portafolioBackend/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProyectoViewSet, ContactoViewSet, CategoriaViewSet

# Se crea un router y se registran los viewsets
router = DefaultRouter()
router.register(r'proyectos', ProyectoViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'contactos', ContactoViewSet)

urlpatterns = [
    path('', include(router.urls))
]
