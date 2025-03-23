from django.db import models
from django.utils.text import slugify


class Categoria(models.Model):
    """
    Modelo para categorias de proyectos
    """
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Categorias"


class Proyecto(models.Model):
    """
    Modelo para proyectos
    """
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='proyectos/', blank=True, null=True)
    tecnologias = models.JSONField(default=list, help_text="Lista de tecnologías usadas")
    demo_url = models.URLField("URL de Demo", blank=True, help_text="Enlace a la demo")
    repo_url = models.URLField("URL de repositorio", blank=True, help_text="Enlace al repositorio")
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True, related_name='proyectos')
    destacado = models.BooleanField(default=False)
    fecha_creacion = models.DateField()
    activo = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name_plural = "Proyectos"


class Contacto(models.Model):
    nombre = models.CharField(max_length=200)
    email = models.EmailField()
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)
    respondido = models.BooleanField(default=False)
    ip = models.GenericIPAddressField(blank=True, null=True, help_text="IP del usuario")

    def __str__(self):
        return f"{self.nombre} - {self.asunto}"

    class Meta:
        ordering = ['fecha']
        verbose_name_plural = "Mensajes de contacto"
