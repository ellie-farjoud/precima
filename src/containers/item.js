import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { selectItem } from "../actions/itemDetailAction";
import { removeItem } from "../actions/itemsAction";
import DeleteModal from "../components/DeleteModal";

import "./item.css";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false // state to track the status of delete Modal
    };
  }

  toggle = () =>
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));

  render() {
    const {
      item,
      item: { title, id, purchased },
      selectItem,
      removeItem
    } = this.props;

    const { isModalOpen } = this.state;
    const { toggle } = this;

    return (
      <div
        className={`${
          purchased ? "purchased-item" : ""
        } grocery-items-cotainer`}
      >
        {/* Strikethrough header of purchased items in order to differentiate*/}
        {purchased ? <strike>{title}</strike> : <h5>{title}</h5>}
        <div className="grocery-item-utils">
          {/*  Delete Utility */}
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="grocery-trash-util--icon"
            size="sm"
            onClick={() => toggle()}
          />
          {/*  Edit Utility */}
          <Link to="/detail/" className="grocery-edit-icon">
            <FontAwesomeIcon
              icon={faPencilAlt}
              size="sm"
              onClick={() => selectItem(item)}
            />
          </Link>
        </div>
        {/* Only render delete modal if an item has been selected */}
        {title && (
          <DeleteModal
            isOpen={isModalOpen}
            toggle={() => toggle()}
            title={title}
            removeItem={() => removeItem(id)}
          />
        )}
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string,
    purchased: PropTypes.bool
  }),
  selectItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectItem, removeItem }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Item);
