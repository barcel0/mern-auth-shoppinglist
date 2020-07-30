import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import propTypes from 'prop-types';
import AddItem from './AddItem';

const List = (props) => {
  const getItems = props.getItems;

  useEffect(() => {

    getItems();
  }, [getItems]);

  const serveItems = () => {
    const { items } = props.item;
    if (items) {
      return items.map(item => {
        return (
          <li key={item._id}>
            <h2>{item.name}</h2>
            {props.isAuthenticated ? <div className="btn-delete" onClick={() => props.deleteItem(item._id)}>Delete</div> : null}
          </li>
        );
      })
    }
  }

  return (
    <section>
      <div className="box">
        <AddItem />
        <div className="list-container">
          <ul>
            {serveItems()}
          </ul>
        </div>
      </div>
    </section>
  );
}

List.propTypes = {
  getItems: propTypes.func.isRequired,
  item: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    getItems, deleteItem
  })(List);