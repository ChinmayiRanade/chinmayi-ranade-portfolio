from flask import Flask, render_template, url_for, flash, redirect
from forms import RegistrationForm
from flask_behind_proxy import FlaskBehindProxy
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

proxied = FlaskBehindProxy(app)  ## add this line
app.config['SECRET_KEY'] = 'fd38bcdd13f80cfe7b1044e613e2e705'

app.debug = True
toolbar = DebugToolbarExtension(app)

@app.route("/")
def hello_world():
    return render_template('home.html', subtitle='Home Page', text='This is the home page')
    
@app.route("/about")
def second_page():
    return render_template('about.html', subtitle='About', text='This is the about page')

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit(): # checks if entries are valid
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home')) # if so - send to home page
    return render_template('register.html', title='Register', form=form)
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")