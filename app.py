from flask import Flask, render_template, url_for, flash, redirect
from forms import RegistrationForm
from flask_behind_proxy import FlaskBehindProxy
#from flask_debugtoolbar import DebugToolbarExtension
import secrets

app = Flask(__name__)
proxied = FlaskBehindProxy(app)  # Allow proxying (e.g., on Replit)

app.config['SECRET_KEY'] = secrets.token_hex(16)
app.debug = True
#toolbar = DebugToolbarExtension(app)

@app.route("/")
def hello_world():
    return render_template('home.html')

@app.route("/projects")
def projects():
    return render_template('projects.html')

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/experience")
def experience():
    return render_template('experience.html')

@app.route("/coursework")
def coursework():
    return render_template('coursework.html')


@app.route("/interests")
def interests():
    return render_template('interests.html')

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")
