from django.test import TestCase, Client
from django.urls import reverse, resolve
from rest_framework.test import APIClient

from team02app.views import index, RegisterAPI, LoginAPI

class TestURLs(TestCase):
    
    # Test if index url runs correct function
    def test_index(self):
        url = reverse('index')
        self.assertEquals(resolve(url).func, index)

    # Test if register url runs correct function.
    def test_register(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func.view_class, RegisterAPI)
    
    def test_login(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func.view_class, LoginAPI)

class TestViews(TestCase):
    
    # Test if posting data to register url correctly returns 
    # succesfully and with correct data.
    def test_register_POST(self):
        client = Client()

        response = client.post(reverse('register'), {
            "email": "email@test.com",
            "username": "test_username",
            "password": "test_password"
        })

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data["user"]["username"], "test_username")
       
    # Test if posting no data to register url correctly returns 
    # status code 400 (bad request).
    def test_register_POST_no_data(self):
        client = Client()
        response = client.post(reverse('register'))

        self.assertEquals(response.status_code, 400)

class TestCases(TestCase):
    fixtures = ['test_data_dump.json']

    def setUp(self):
        self.username = 'christest4'
        self.password = 'millie1130'
        self.loginUser = 'christest54'
        self.loginPass = 'millie11300'

    def test_login(self):
        login_input_payload = {
            "username": self.loginUser,
            "password": self.loginPass
        }

        login_response = self.client.post('/api/login/', data=login_input_payload)
        self.assertEqual(login_response.status_code, 400)

    def test_get_movie_rec_valid(self):
        input_payload = {
            "username": self.username,
            "password": self.password
        }

        response = self.client.post('/api/login/', data=input_payload)

        headers = {'HTTP_Authorization': 'Token ' + response.json()['token']}

        reverse_url = reverse('get_movie_recommendations')
        input_payload = {"genre": ["Adventure"], "year": ["2000 to 2020"], "runtime": ["120 to 150"], "age": ["PG-13"]}
        response = self.client.post(reverse_url, input_payload, format='json',
                                    HTTP_AUTHORIZATION='Token ' + response.json()['token'])
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        login_input_payload = {
            "username": self.username,
            "password": self.password
        }

        login_response = self.client.post('/api/login/', data=login_input_payload)
        self.assertEqual(login_response.status_code, 200)

        logout_response = self.client.get('/api/logout/')
        self.assertEqual(logout_response.status_code, 401)

        
         
      
        
