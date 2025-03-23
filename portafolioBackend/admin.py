# portafolioBackend/admin.py
from django.contrib import admin

from .models import Proyecto, Contacto, Categoria


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'slug')
    search_fields = ('nombre',)
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'fecha_creacion', 'destacado', 'activo')
    list_filter = ('categoria', 'fecha_creacion', 'destacado', 'activo')
    search_fields = ('titulo', 'descripcion', 'tecnologias')
    prepopulated_fields = {'slug': ('titulo',)}


@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'asunto', 'fecha', 'leido', 'respondido')
    list_filter = ('leido', 'respondido', 'fecha')
    search_fields = ('nombre', 'email', 'asunto', 'mensaje')
    readonly_fields = ('fecha', 'ip')
