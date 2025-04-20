from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('solutions/', views.solutions, name='solutions'),
    path('products/', views.product_list, name='product_list'),
    path('category/<slug:category_slug>/', views.product_list, name='product_list_by_category'),
    path('products/category/<slug:category_slug>/', views.product_list, name='category_detail'),
    path('product/<int:id>/<slug:slug>/', views.product_detail, name='product_detail'),
] 