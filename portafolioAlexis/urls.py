"""
URL configuration for portafolioAlexis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Inicio
    2. Add a URL to urlpatterns:  path('', Inicio.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include


# Redirección al admin
def redirect_to_admin(request):
    return redirect('admin:index')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portafolioBackend.urls')),
    path('', redirect_to_admin),  # Redirección a admin
]

# Configuración para servir archivos multimedia durante desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# En producción, PythonAnywhere servirá estos archivos basado en la configuración de "Static files"
