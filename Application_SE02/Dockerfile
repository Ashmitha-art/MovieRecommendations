
FROM python:3.8.13-slim-buster
WORKDIR /app
COPY ./ ./


RUN pip install --upgrade pip --no-cache-dir


RUN pip install -r requirements.txt --no-cache-dir


#CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
CMD sudo apt install npm
CMD ["sudo","apt","update"]
CMD ["sudo","apt","install","nodejs","npm"]

WORKDIR /front-end/

CMD ["npm","install"]
#CMD ["npm","run","build"]
CMD ["npm","--v"]

WORKDIR /app

CMD ["python3","back-end/manage.py","collectstatic"]
#CMD ["python3","back-end/manage.py","runserver", "0.0.0.0:8000"]

CMD ["gunicorn", "back-end.team02app.wsgi:application", "--bind", "0.0.0.0:8000", "--timeout", "90"]
