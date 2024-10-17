from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.ext.mutable import MutableDict
import json
import uuid


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///forms.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)


db = SQLAlchemy(app)

class Form(db.Model):
    __tablename__ = 'allforms'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    options = db.Column(MutableDict.as_mutable(db.JSON), nullable=False)
    form_data = db.relationship('FormData', backref='form', cascade="all, delete-orphan")

class FormData(db.Model):
    __tablename__ = 'formdata'
    
    id = db.Column(db.String(50), primary_key=True)
    form_id = db.Column(db.String(50), db.ForeignKey('allforms.id'), nullable=False)
    fullname = db.Column(db.String(100), nullable=True)
    phone1 = db.Column(db.String(100), nullable=True)
    phone2 = db.Column(db.String(100), nullable=True)
    language = db.Column(db.String(100), nullable=True)
    language2 = db.Column(db.String(100), nullable=True)
    mail = db.Column(db.String(100), nullable=True)
    date = db.Column(db.String(100), nullable=True)
    gradst = db.Column(db.String(100), nullable=True)
    university = db.Column(db.String(100), nullable=True)
    major = db.Column(db.String(100), nullable=True)
    address1 = db.Column(db.String(100), nullable=True)
    address2 = db.Column(db.String(100), nullable=True)
    transport = db.Column(db.String(100), nullable=True)
    civilst = db.Column(db.String(100), nullable=True)
    religion = db.Column(db.String(100), nullable=True)
    emergency = db.Column(db.String(100), nullable=True)
    citizenship = db.Column(db.String(100), nullable=True)
    gender = db.Column(db.String(100), nullable=True)
    military = db.Column(db.String(100), nullable=True)
    ccenter = db.Column(db.String(100), nullable=True)
    worklocation = db.Column(db.String(100), nullable=True)



def generate_uuid():
    return str(uuid.uuid4())


def create_tables():
    with app.app_context():
        db.create_all()

create_tables()

@app.route('/form/<form_id>/data', methods=['POST'])
def add_form_data(form_id):
    print(request)
    print(form_id)
    try:
        data = FormData(
            id=generate_uuid(),
            form_id=form_id,
            fullname=request.json['fullname'],
            phone1=request.json['phone1'],
            phone2=request.json['phone2'],
            language=request.json['language'],
            language2=request.json['language2'],
            mail=request.json['mail'],
            date=request.json['date'],
            gradst=request.json['gradst'],
            university=request.json['university'],
            major=request.json['major'],
            address1=request.json['address1'],
            address2=request.json['address2'],
            transport=request.json['transport'],
            civilst=request.json['civilst'],
            religion=request.json['religion'],
            emergency=request.json['emergency'],
            citizenship=request.json['citizenship'],
            gender=request.json['gender'],
            military=request.json['military'],
            ccenter=request.json['ccenter'],
            worklocation=request.json['worklocation']
        )

        db.session.add(data)
        db.session.commit()
        return jsonify({'message': 'Form data added successfully'}), 201
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while adding the form data'}), 500


@app.route('/admin', methods=['GET'])
@app.route('/', methods=['GET'])
def adminPage():
   return render_template("admin.html")

# Endpoint to create a new form
@app.route('/forms', methods=['POST'])
def create_form():
    data = request.json
    new_form = Form(id=generate_uuid(), name=data['name'], options=data['options'])
    db.session.add(new_form)
    db.session.commit()
    return jsonify({'message': 'Form created successfully',"id":new_form.id}), 201

# Endpoint to get details of a form by ID
@app.route('/forms/<string:form_id>', methods=['GET'])
def get_form(form_id):
    form = Form.query.get(form_id)
    if form:
        
        
       return render_template("index.html",options={"name":form.name,"options":form.options})
    else:
        return jsonify({'message': 'Form not found'}), 404

@app.route('/forms/', methods=['GET'])
def get_forms():
    forms = Form.query.all()
    if forms:
        forms_list = [{"id": form.id, "name": form.name, "options": form.options} for form in forms]
        return jsonify(forms_list)
    else:
        return jsonify({'message': 'No forms found'}), 404


# Endpoint to update options of a form by ID
@app.route('/forms/<string:form_id>', methods=['PUT'])
def update_form(form_id):
    form = Form.query.get(form_id)
    if form:
        data = request.json
        form.options = data['options']
        db.session.commit()
        return jsonify({'message': 'Form updated successfully'})
    else:
        return jsonify({'message': 'Form not found'}), 404

# Endpoint to delete a form by ID
@app.route('/deleteform/<string:form_id>/', methods=['DELETE'])
def delete_form(form_id):
    form = Form.query.get_or_404(form_id)
    db.session.delete(form)
    db.session.commit()
    return jsonify({'message': 'Form and associated data deleted successfully'}), 200


# Endpoint to delete a specific FormData entry
@app.route('/deleteforms/<string:form_id>/<string:formdata_id>/', methods=['DELETE'])
def delete_formdata_entry(form_id, formdata_id):
    formdata_entry = FormData.query.filter_by(form_id=form_id, id=formdata_id).first_or_404()
    db.session.delete(formdata_entry)
    db.session.commit()
    return jsonify({'message': 'Form data entry deleted successfully'}), 200


@app.route('/form/<form_id>/data', methods=['GET'])
def get_form_data(form_id):
    print("inside")
    try:
        form_data = FormData.query.filter_by(form_id=form_id).all()
        print(form_data)
        if form_data:
            data_list = [
                {
                    "id": data.id,
                    "fullname": data.fullname,
                    "phone1": data.phone1,
                    "phone2": data.phone2,
                    "language": data.language,
                    "language2": data.language2,
                    "mail": data.mail,
                    "date": data.date,
                    "gradst": data.gradst,
                    "university": data.university,
                    "major": data.major,
                    "address1": data.address1,
                    "address2": data.address2,
                    "transport": data.transport,
                    "civilst": data.civilst,
                    "religion": data.religion,
                    "emergency": data.emergency,
                    "citizenship": data.citizenship,
                    "gender": data.gender,
                    "military": data.military,
                    "ccenter": data.ccenter,
                    "worklocation": data.worklocation
                } for data in form_data
            ]
            return jsonify(data_list), 200
        else:
            return jsonify({'message': 'No data found for this form'}), 404
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'message': 'An error occurred while fetching the form data'}), 500
    

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/formdata/', methods=['GET'])
def get_formdata():
    forms = FormData.query.all()
    if forms:
        data_list = [
                {
                    "id": data.id,
                    "form_id":data.form_id,
                    "fullname": data.fullname,
                    "phone1": data.phone1,
                    "phone2": data.phone2,
                    "language": data.language,
                    "language2": data.language2,
                    "mail": data.mail,
                    "date": data.date,
                    "gradst": data.gradst,
                    "university": data.university,
                    "major": data.major,
                    "address1": data.address1,
                    "address2": data.address2,
                    "transport": data.transport,
                    "civilst": data.civilst,
                    "religion": data.religion,
                    "emergency": data.emergency,
                    "citizenship": data.citizenship,
                    "gender": data.gender,
                    "military": data.military,
                    "ccenter": data.ccenter,
                    "worklocation": data.worklocation
                } for data in forms
            ]
        return jsonify(data_list)
    else:
        return jsonify({'message': 'No forms found'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5000)
