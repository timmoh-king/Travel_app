from flask import Flask, jsonify, request
from flask_cors import CORS
from packing_list import PackingList
from list_items import ListItem
from db import Session, engine
from sqlalchemy.exc import SQLAlchemyError

app = Flask(__name__)
CORS(app)

PackingList.metadata.create_all(bind=engine)

session = Session()
session.query(PackingList).delete()
session.query(ListItem).delete()

session.commit()
session.close()

@app.route("/", methods=['GET'], strict_slashes=False)
def index():
    return jsonify({"message": "Welcome to the travel app API!"}), 200


@app.route('/packing_lists', methods=['GET'], strict_slashes=False)
def get_packing_lists():
    session = Session()
    try:
        packing_lists = session.query(PackingList).all()
        result = [
            { 
                "id": list.id, "name": list.name,
                "date": list.formatted_date,
                "time": list.formatted_time
            }
            for list in packing_lists
        ]
        session.close()
        return jsonify(result), 200
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"No packing lists found": str(e)}), 500


@app.route('/packing_lists/<int:packing_list_id>', methods=['GET'], strict_slashes=False)
def get_packing_list(packing_list_id):
    session = Session()
    try:
        packing_list = session.query(PackingList).get(packing_list_id)
        if packing_list:
            result = {
                "id": packing_list.id, "name": packing_list.name,
                "date": packing_list.formatted_date,
                "time": packing_list.formatted_time
            }
            session.close()
            return jsonify(result)
        return jsonify({"message": "Packing list not found"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"Packing specific packing list is not found": str(e)}), 500


@app.route('/packing_lists', methods=['POST'], strict_slashes=False)
def create_packing_list():
    data = request.get_json()
    session = Session()
    try:
        new_packing_list = PackingList(
            name=data['name'], date=data['date'], time=data['time'])

        session.add(new_packing_list)
        session.commit()
        session.close()
        return jsonify({"message": "Packing list created successfully"}), 201
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"Packing list not added": str(e)}), 500


@app.route('/packing_lists/<int:packing_list_id>', methods=['PUT'], strict_slashes=False)
def edit_packing_list(packing_list_id):
    data = request.get_json()
    session = Session()
    try:
        packing_list_item = session.query(PackingList).get(packing_list_id)
        if packing_list_item:
            packing_list_item.name = data.get('name', packing_list_item.name)
            packing_list_item.date = data.get('date', packing_list_item.date)
            packing_list_item.time = data.get('time', packing_list_item.time)
            session.commit()
            return jsonify({"message": "Packing list edited successfully"}), 204
        else:
            return jsonify({"message": "packing list not found"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"Packing list item was not edited": str(e)}), 500


@app.route('/packing_lists/<int:packing_list_id>', methods=['DELETE'], strict_slashes=False)
def delete_packing_list(packing_list_id):
    session = Session()
    try:
        packing_list_item = session.query(PackingList).get(packing_list_id)
        if packing_list_item:
            session.delete(packing_list_item)
            session.commit()
            session.close()
            return jsonify({"message": "Packing list deleted successfully"}), 204
        else:
            return jsonify({"message": "Packing list not found"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"Packing list item was not deleted": str(e)}), 500


#list_items
@app.route('/list_items', methods=['GET'], strict_slashes=False)
def get_list_items():
    session = Session()
    try:
        list_items = session.query(ListItem).all()
        result = [
            {
                "id": list.id,
                "item": list.item,
                "quantity": list.quantity,
                "packing_list_id": list.packing_list_id
            }
            for list in list_items
        ]
        session.close()
        return jsonify(result), 200
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/list_items/<int:list_item_id>', methods=['GET'])
def get_list_item(list_item_id):
    session = Session()
    try:
        list_item = session.query(ListItem).get(list_item_id)
        if list_item:
            result = {
                "id": list_item.id,
                "item": list_item.item,
                "quantity": list_item.quantity,
                "packing_list_id": list_item.packing_list_id
            }
            session.close()
            return jsonify(result)
        return jsonify({"message": "List item not found"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/add_list_items', methods=['POST'], strict_slashes=False)
def create_list_item():
    data = request.get_json()
    session = Session()
    try:
        new_list_item = ListItem(
            item=data['item'],
            quantity=data['quantity'],
            packing_list_id=data['packing_list_id']
        )
        session.add(new_list_item)
        session.commit()
        session.close()
        return jsonify({"message": "List item created successfully"}), 201
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/edit_list_items/<int:list_item_id>', methods=['PUT'], strict_slashes=False)
def edit_list_item(list_item_id):
    data = request.get_json()
    session = Session()
    try:
        list_item = session.query(ListItem).get(list_item_id)
        if list_item:
            list_item.item = data.get('item', list_item.item)
            list_item.quantity = data.get('quantity', list_item.quantity)
            session.commit()
            session.close()
            return jsonify({"message": "List item edited successfully"}), 204
        else:
            return jsonify({"message": "List item not found"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"List item was not edited": str(e)}), 500


@app.route('/delete_list_items/<int:list_item_id>', methods=['DELETE'], strict_slashes=False)
def delete_list_item(list_item_id):
    session = Session()
    try:
        list_item = session.query(ListItem).get(list_item_id)
        if list_item:
            session.delete(list_item)
            session.commit()
            session.close()
            return jsonify({"message": "List item deleted successfully"}), 204
        else:
            return jsonify({"message": "List item not found"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"List item was not deleted": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000")
