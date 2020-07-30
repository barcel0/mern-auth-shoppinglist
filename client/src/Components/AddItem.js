import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import propTypes from 'prop-types';

const AddItem = (props) => {

  const [name, setName] = useState('');

  const handleAddItemClick = () => {
    if (name.length >= 3) {
      setName('');
      const newItem = {
        name: name
      }
      props.addItem(newItem);
    }
  }

  const serveContent = () => {
    if (props.auth.isAuthenticated) {
      return (
        <div className="button-row">
          <input type="text" placeholder="Type new item here..." value={name} onChange={(e) => setName(e.target.value)}></input>
          <div className="btn" onClick={() => handleAddItemClick()}>Add Item</div>
        </div>
      );
    } else {
      return (
        <div className="button-row">
          <span>Log in to add new items.</span>
        </div>
      );
    }
  }

  return serveContent();
}

AddItem.propTypes = {
  addItem: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { addItem })(AddItem);