FROM python:3.10-alpine
WORKDIR /home
COPY requirements.txt /home
RUN pip3 install -r requirements.txt
COPY home.py /home

ENV FLASK_APP home.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 8000
ENV FLASK_RUN_HOST 0.0.0.0

EXPOSE 8000


CMD ["flask", "run"]