from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, Date, func, desc, inspect

# Create table class 
Base = declarative_base()
class Complaints(Base):
    __tablename__ = 'complaints'
    date_received  = Column(Date)
    product  = Column(String)
    company = Column(String)
    date_sent_to_company = Column(Date)
    company_response_to_consumer = Column(String)
    complaint_ID = Column(Integer, primary_key=True)

# path to sqlite database
database_path = "sqlite:///../Resources/complaints.sqlite"

# create engine and databse 
engine = create_engine(database_path)
Base.metadata.create_all(engine)


# Create a Flask object 
app = Flask(__name__)

# enable CORS for API requests with dashboard
CORS(app)


# Welcome API route
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/productdata.json<br/>"
        f"/api/v1.0/leftbox.json/<product><br/>"
        f"/api/v1.0/productpie.json/<product><br/>"
        f"/api/v1.0/barchart/<product>"
        f"/api/v1.0/productList<br/>"
        f"/api/v1.0/top10Company/<product><br/>"
        f"/api/v1.0/rightbox.json/<product>"
       
    )

# API route for number of complaints barchart
@app.route("/api/v1.0/productdata.json")
def productData():
    session = Session(engine)
    
    data = session.execute(f'''SELECT product, COUNT(complaint_ID) 
                                    FROM complaints
                                    GROUP BY product ''').fetchall()
    session.close()

    dict_data = dict(data)
    return jsonify(dict_data)

# API Route for left box
@app.route("/api/v1.0/leftbox.json/<product>")
def left_box(product):
    session = Session(engine)
    
    data = session.execute(f'''SELECT product, COUNT(complaint_ID) 
                                    FROM complaints
                                    WHERE product = '{product}' 
                                    GROUP BY product ''').fetchall()
    session.close()

    dict_data = dict(data)
    return jsonify(dict_data)


# API route for piechart
@app.route("/api/v1.0/productpie.json/<product>")
def productpie2(product):
    session = Session(engine)
    string_query = f'''SELECT company_response_to_consumer, count(company_response_to_consumer) 
                    FROM complaints 
                    WHERE product = '{product}' 
                    GROUP BY company_response_to_consumer'''
    data = session.execute( string_query).fetchall()
    session.close()

    dict_data = dict(data)
    return jsonify(dict_data)

# API route for montly barchart
@app.route("/api/v1.0/barchart/<product>")
def byMonthCount(product):
    session = Session(engine)
    sel1 = [func.strftime('%m',Complaints.date_received), func.strftime('%Y',Complaints.date_received), func.count(Complaints.complaint_ID)]
    productData = session.query(*sel1).filter(Complaints.product == product).group_by(func.strftime('%m',Complaints.date_received), func.strftime('%Y',Complaints.date_received)).all()
    session.close()
    by_month = []  
    for m, y, c in productData:
        by_month_count = {}
        by_month_count["month"] = m
        by_month_count["year"] = y
        by_month_count["count"] = c
        #by_month_count["count"] = mn
        by_month.append(by_month_count)   
    #return product_count
    return jsonify(by_month)
 
 # API route for drop down
@app.route("/api/v1.0/productList")
def byuniqueList():
    session = Session(engine)
    sel1 = [Complaints.product]
    productData = session.query(*sel1).group_by(Complaints.product).all()
    session.close()
    by_product = []  
    for m in productData:
        by_product_list = {}
        by_product_list["product"] = m.product
        by_product.append(by_product_list)   
    #return product_count
    return jsonify(by_product)

# API route for top 10 companies bar chart
@app.route("/api/v1.0/top10Company/<product>")
def topcompanyData(product):
    session = Session(engine)
    sel1 = [Complaints.company, func.count(Complaints.company)]
    topcompanyData = session.query(*sel1).group_by(Complaints.company).all()
    session.close()
    company_count = []
    for name,count in topcompanyData:
        company_count_dict = {}
        company_count_dict["company"] = name
        company_count_dict["count"] = count
        company_count.append(company_count_dict)   
        
    top_10_query = session.query(Complaints.company, func.count(Complaints.company)) \
                        .filter(Complaints.product == product)\
                        .group_by(Complaints.company) \
                        .order_by(desc(func.count(Complaints.company))) \
                        .limit(10) \
                        .all()
    session.close()
    
    top_10 = []
    for name,count in top_10_query:
        top_10_dict = {}
        top_10_dict["company"] = name
        top_10_dict["count"] = count
        top_10.append(top_10_dict)
    return jsonify(top_10)

# API Route for right box
@app.route("/api/v1.0/rightbox.json/<product>")
def right_box(product):
    session = Session(engine)
    
    data = session.execute(f'''SELECT product , COUNT(DISTINCT company)
                                    FROM complaints
                                    WHERE product == '{product}'
                                    ''').fetchall()
    session.close()

    dict_data = dict(data)
    return jsonify(dict_data)
 
if __name__ == "__main__":
    app.run(debug=True, port= 5001)