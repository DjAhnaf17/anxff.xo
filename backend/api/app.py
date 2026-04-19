from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Contact
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_contact = Contact(
        name=data['name'],
        email=data['email'],
        message=data['message']
    )
    db.session.add(new_contact)
    db.session.commit()
    
    return jsonify({'message': 'Contact form submitted successfully!'}), 201

@app.route('/api/projects', methods=['GET'])
def get_projects():
    # Return real projects from resume
    projects = [
        {
            "id": 1,
            "title": "Med-Predict — ML-Powered Disease Detection System",
            "description": "An intelligent healthcare support application designed to assist in early disease detection using machine learning. It features a responsive UI and automatically generates medical PDF reports.",
            "technologies": ["Python", "Streamlit", "Machine Learning", "Scikit-learn"],
            "url": "https://github.com/DjAhnaf17/Med-Predict"
        },
        {
            "id": 2,
            "title": "PlotPlus — ML Property Price Predictor",
            "description": "A full-stack web application built using Flask, Machine Learning, and PostgreSQL, designed to predict property prices based on area, number of rooms, and location.",
            "technologies": ["Python", "Flask", "PostgreSQL", "Machine Learning", "HTML/CSS/JS"],
            "url": "https://github.com/DjAhnaf17/PlotPlus",
            "liveUrl": "https://plotplus.onrender.com/"
        },
        {
            "id": 3,
            "title": "Royal Suppliers Web Platform",
            "description": "A modern, responsive web application built for Royal Suppliers to manage operations and provide an excellent user experience.",
            "technologies": ["React", "TypeScript", "Node.js", "TailwindCSS"],
            "url": "https://github.com/DjAhnaf17/RoyalSuppliersNewWeb"
        }
    ]
    return jsonify(projects)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
