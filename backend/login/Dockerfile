FROM python:3.10-alpine
WORKDIR /login
COPY requirements.txt /login
RUN pip3 install -r requirements.txt
COPY . /login

ENV FLASK_APP login.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 5000
ENV FLASK_RUN_HOST 0.0.0.0

EXPOSE 7000


CMD ["flask", "run"]