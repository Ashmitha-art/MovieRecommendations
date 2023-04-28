from django.test import TestCase, Client
from django.urls import reverse, resolve
from rest_framework.test import APIClient

from team02app.views import index, RegisterAPI

class TestURLs(TestCase):
    def test_index(self):
        url = reverse('index')
        self.assertEquals(resolve(url).func, index)

    def test_register(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func.view_class, RegisterAPI)

class TestViews(TestCase):
    def test_register_POST(self):
        client = Client()
        response = client.post(reverse('register'), {
            "email": "email@test.com",
            "username": "test_username",
            "password": "test_password"
        })

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data["user"]["username"], "test_username")
       
    def test_register_POST_no_data(self):
        client = Client()
        response = client.post(reverse('register'))

        self.assertEquals(response.status_code, 400)





        
         
        
  
        
