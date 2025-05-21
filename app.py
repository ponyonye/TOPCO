from flask import Flask, render_template, request, redirect, url_for
import json
import random
from laptops_rules import recommend_laptops

app = Flask(__name__)

# Load data laptop dari file JSON
def load_laptops():
    with open('data/laptops.json') as f:
        return json.load(f)

@app.route('/')
def index():
    laptops = load_laptops()
    random_laptops = random.sample(laptops, min(4, len(laptops)))  # Tampilkan 4 laptop acak
    return render_template('index.html', laptops=random_laptops)

@app.route('/search', methods=['POST'])
def search():
    jurusan = request.form['jurusan']
    budget = int(request.form['budget'])
    laptops = load_laptops()
    recommended = recommend_laptops(jurusan, budget, laptops)
    return render_template('result.html', laptops=recommended)

@app.route('/compare', methods=['POST'])
def compare():
    laptops = load_laptops()
    ids = request.form.getlist('compare')  # Ambil list ID laptop yang dipilih
    selected = [l for l in laptops if str(l['id']) in ids]
    return render_template('compare.html', laptops=selected)

@app.route('/wishlist')
def wishlist():
    laptops = load_laptops()  # Load all laptops from the JSON file
    return render_template('wishlist.html', laptops=laptops)


if __name__ == '__main__':
    app.run(debug=True)

