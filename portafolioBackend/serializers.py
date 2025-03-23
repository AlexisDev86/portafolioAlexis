# portafolioBackend/serializers.py
from rest_framework import serializers

from .models import Proyecto, Categoria, Contacto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'slug']


class ProyectoSerializer(serializers.ModelSerializer):
    # Incluye el objeto categoría completo en lugar de solo su ID
    categoria = CategoriaSerializer(read_only=True)
    # Para operaciones de escritura, necesitamos el ID de la categoría
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        source='categoria',
        write_only=True,
        required=False
    )

    class Meta:
        model = Proyecto
        fields = [
            'id', 'titulo', 'slug', 'descripcion', 'imagen',
            'tecnologias', 'demo_url', 'repo_url', 'categoria',
            'categoria_id', 'destacado', 'fecha_creacion', 'activo'
        ]


class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = ['id', 'nombre', 'email', 'asunto', 'mensaje']
        # No incluimos fecha, leido, respondido o ip para crear mensajes
        # ya que esos se manejan en el backend

    def create(self, validated_data):
        # Podemos capturar la IP desde la request
        request = self.context.get('request')
        if request and hasattr(request, 'META'):
            # Obtener la IP real incluso detrás de un proxy
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            validated_data['ip'] = ip
        return super().create(validated_data)
