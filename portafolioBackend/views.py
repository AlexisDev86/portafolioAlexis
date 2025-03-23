from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions

from .models import Proyecto, Contacto, Categoria
from .serializers import ProyectoSerializer, ContactoSerializer, CategoriaSerializer


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para ver categorías
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]


class ProyectoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para ver proyectos
    """
    queryset = Proyecto.objects.filter(activo=True)  # Solo proyectos activos
    serializer_class = ProyectoSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categoria', 'destacado']


class ContactoViewSet(viewsets.ModelViewSet):
    """
    API endpoint para enviar mensajes de contacto
    """
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post']  # Solo permitir POST (crear mensajes)

    def get_queryset(self):
        """
        Solo el administrador puede ver los mensajes
        """
        if self.request.user.is_staff:
            return Contacto.objects.all()
        return Contacto.objects.none()
