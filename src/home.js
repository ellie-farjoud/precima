import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Item from "./containers/item";
import "./home.css";

/**
 * Application 's home page where there is list of purchased and unparchased items
 */

const Home = ({ items }) => {
  const renderUnpurchasedItems = () => {
    return items
      .filter(item => !item.purchased)
      .map((item, index) => (
        <Item item={item} key={`${item.title}-${index}`} />
      ));
  };

  const renderPurchasedItems = () => {
    return items
      .filter(item => item.purchased)
      .map(item => <Item item={item} key={item.title} />);
  };

  return (
    <div className="grocery-list-wrapper">
      <div className="grocery-list-unpurchased">
        <h2 className="grocersy-category-header"> Want to Purchase</h2>
        <div className="grocery-item-list-container">
          {renderUnpurchasedItems()}
        </div>
        <Link to="/detail/">
          <FontAwesomeIcon icon={faPlusCircle} className="add-icon" size="3x" />
        </Link>
      </div>
      <div className="grocery-list-purchased">
        <h2> Purchased</h2>
        <div className="grocery-item-list-container">
          {renderPurchasedItems()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ items }) => ({
  items
});

Home.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string,
    purchased: PropTypes.bool
  })
};

export default connect(mapStateToProps)(Home);
