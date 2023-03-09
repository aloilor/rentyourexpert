FROM python:3.10.6-alpine
WORKDIR /catalogue_ms
COPY requirements.txt /catalogue_ms
RUN pip install -r requirements.txt
copy . /catalogue_ms
EXPOSE 5000
CMD ["flask", "run"]