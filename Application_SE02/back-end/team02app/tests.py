from django.test import TestCase
from django.urls import reverse


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
