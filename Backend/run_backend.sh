source .venv/bin/activate && \
    export FLASK_APP=flaskr && \
    flask init-db && \
    flask run --debug