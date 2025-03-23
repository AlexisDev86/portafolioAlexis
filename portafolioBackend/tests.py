# portafolioBackend/tests.py
from datetime import date

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Categoria, Proyecto, Contacto


class ModelTests(TestCase):
    def setUp(self):
        # Crear datos de prueba
        self.categoria = Categoria.objects.create(nombre="Desarrollo Web")
        self.proyecto = Proyecto.objects.create(
            titulo="Proyecto Test",
            descripcion="Descripción del proyecto de prueba",
            tecnologias=["Django", "React"],
            fecha_creacion=date.today(),
            categoria=self.categoria,
            destacado=True
        )
        self.contacto = Contacto.objects.create(
            nombre="Usuario Test",
            email="test@example.com",
            asunto="Asunto de prueba",
            mensaje="Mensaje de prueba"
        )

    def test_categoria_creation(self):
        """Test para verificar la creación de categorías y generación de slugs"""
        self.assertEqual(self.categoria.nombre, "Desarrollo Web")
        self.assertEqual(self.categoria.slug, "desarrollo-web")

    def test_proyecto_creation(self):
        """Test para verificar la creación de proyectos y generación de slugs"""
        self.assertEqual(self.proyecto.titulo, "Proyecto Test")
        self.assertEqual(self.proyecto.slug, "proyecto-test")
        self.assertEqual(self.proyecto.categoria, self.categoria)

    def test_contacto_creation(self):
        """Test para verificar la creación de mensajes de contacto"""
        self.assertEqual(self.contacto.nombre, "Usuario Test")
        self.assertEqual(self.contacto.email, "test@example.com")
        self.assertFalse(self.contacto.leido)


class APITests(APITestCase):
    def setUp(self):
        # Crear datos de prueba
        self.categoria = Categoria.objects.create(nombre="Desarrollo Web")
        self.proyecto = Proyecto.objects.create(
            titulo="Proyecto API Test",
            descripcion="Descripción del proyecto API",
            tecnologias=["Django", "React"],
            fecha_creacion=date.today(),
            categoria=self.categoria,
            destacado=True
        )

    def test_get_proyectos(self):
        """Test para verificar la obtención de proyectos a través de la API"""
        url = reverse('proyecto-list')  # Asume que usas DefaultRouter
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['titulo'], "Proyecto API Test")

    def test_get_categorias(self):
        """Test para verificar la obtención de categorías a través de la API"""
        url = reverse('categoria-list')  # Asume que usas DefaultRouter
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['nombre'], "Desarrollo Web")

    def test_crear_contacto(self):
        """Test para verificar la creación de mensajes de contacto a través de la API"""
        url = reverse('contacto-list')  # Asume que usas DefaultRouter
        data = {
            'nombre': 'Usuario API Test',
            'email': 'apitest@example.com',
            'asunto': 'Asunto API Test',
            'mensaje': 'Mensaje de prueba desde API'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contacto.objects.count(), 1)
        self.assertEqual(Contacto.objects.get().nombre, 'Usuario API Test')

    def test_filtrar_proyectos_por_categoria(self):
        """Test para verificar el filtrado de proyectos por categoría"""
        url = f"{reverse('proyecto-list')}?categoria={self.categoria.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        # Crear otra categoría y proyectos para probar el filtro
        otra_categoria = Categoria.objects.create(nombre="Diseño")
        Proyecto.objects.create(
            titulo="Proyecto Diseño",
            descripcion="Descripción de diseño",
            tecnologias=["Photoshop"],
            fecha_creacion=date.today(),
            categoria=otra_categoria
        )

        # Comprobar que ahora hay dos proyectos en total
        response = self.client.get(reverse('proyecto-list'))
        self.assertEqual(len(response.data), 2)

        # Pero filtrando por la categoría original solo se ve uno
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['titulo'], "Proyecto API Test")
