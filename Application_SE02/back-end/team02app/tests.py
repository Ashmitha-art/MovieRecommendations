from django.test import TestCase
from django.urls import reverse


class TestCases(TestCase):
    fixtures = ['test_data_dump.json']

    def setUp(self):
        self.username = 'christest4'
        self.password = 'millie1130'

    def test_get_movie_rec_valid(self):
        login_input_payload = {
            "username": self.username,
            "password": self.password
        }

        login_response = self.client.post('/api/login/', data=login_input_payload)
        print(login_response.json())

        headers = {'HTTP_Authorization': 'Token ' + login_response.json()['token']}
        print(headers)

        reverse_url = reverse('get_movie_recommendations')
        input_payload = {"genre": ["Adventure"], "year": ["1960 to 1980"], "runtime": ["120 to 150"], "age": ["PG-13"]}
        response = self.client.post(reverse_url, input_payload, format='json',
                                    HTTP_AUTHORIZATION='Token ' + login_response.json()['token'])
        print(response.json())
        self.assertEqual(response.status_code, 200)
