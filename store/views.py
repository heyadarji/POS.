from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Category, Product, Review

def home(request):
    featured_products = Product.objects.filter(featured=True, available=True)[:4]
    categories = Category.objects.all()[:6]
    
    context = {
        'featured_products': featured_products,
        'categories': categories,
    }
    return render(request, 'store/home.html', context)

def about(request):
    return render(request, 'store/about.html')

def contact(request):
    if request.method == 'POST':
        # In a real app, you would process the form data here
        # and send an email or save to database
        return JsonResponse({
            'success': True,
            'message': 'Thank you for contacting us! We will get back to you shortly.'
        })
    return render(request, 'store/contact.html')

def solutions(request):
    return render(request, 'store/solutions.html')


def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    
    context = {
        'category': category,
        'categories': categories,
        'products': products
    }
    return render(request, 'store/product_list.html', context)

def product_detail(request, id, slug):
    product = get_object_or_404(Product, id=id, slug=slug, available=True)
    reviews = Review.objects.filter(product=product)
    avg_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
    # reviews = product.reviews.all()
    
    # Calculate average rating
    if reviews:
        avg_rating = sum(review.rating for review in reviews) / len(reviews)
    else:
        avg_rating = 0
    
    # If this is a POST request, process review submission
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        comment = request.POST.get('comment')
        rating = request.POST.get('rating', 5)
        
        Review.objects.create(
            product=product,
            name=name,
            email=email,
            comment=comment,
            rating=int(rating)
        )
        
        return JsonResponse({
            'success': True,
            'message': 'Your review has been submitted successfully!'
        })
    
    context = {
        'product': product,
        'reviews': reviews,
        'avg_rating': avg_rating,
        'rating_range': range(1, 6)
    }
    return render(request, 'store/product_detail.html', context)
