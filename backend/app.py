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
            "description": "Built a multi-disease prediction system (Diabetes, Heart Disease, Parkinson's) achieving 85–92% accuracy. Deployed a Streamlit web interface with auto-generated PDF prescriptions.",
            "technologies": ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy"],
            "url": "https://github.com/jawwadahnaf/med-predict"
        },
        {
            "id": 2,
            "title": "Smart-Presence — Flask-Based Attendance Management",
            "description": "Architected a full-stack Flask web application for real-time attendance tracking with separate secure portals and automated WhatsApp absence notifications via REST API.",
            "technologies": ["Python", "Flask", "SQLite", "HTML/CSS", "JavaScript"],
            "url": "https://github.com/jawwadahnaf/smart-presence"
        }
    ]
    return jsonify(projects)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
