import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector, initialize } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

import { addItem, editItem, removeItem } from "../actions/itemsAction";
import { unSelectItem } from "../actions/itemDetailAction";
import DeleteModal from "../components/DeleteModal";
import "./itemDetails.css";

class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false // state to track the status of delete Modal
    };
  }

  toggleDeleteModal = () =>
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));

  /**
   * REMOVE an item from the list
   * while RESETING the state of selected item
   * and ClOSING the delete modal
   */
  onRemovePurchaseItem = () => {
    const {
      removeItem,
      unSelectItem,
      selectedItem: { id }
    } = this.props;
    removeItem(id);
    unSelectItem();
    this.toggleDeleteModal();
  };

  /**
   * Add an item to the purchased/unparchased list
   */
  onAddPurchaseItem = () => {
    const { title, notes, purchased } = this.state;
    const { addItem } = this.props;

    addItem({
      title,
      notes,
      purchased
    });
  };

  /**
   * Edit selected item from the list
   * while RESETING the state of selected item
   */

  onEditPurchaseItem = () => {
    const { editItem, selectedItem, unSelectItem, purchased } = this.props;
    const { title, notes } = this.state;

    editItem({
      title: title || selectedItem.title,
      notes: notes !== undefined ? notes : selectedItem.notes,
      id: selectedItem.id,
      purchased: !!purchased
    });

    unSelectItem();
  };

  /**
   * Update the state of inputs -- title , notes--
   * while typing
   */

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  togglePurchase = () =>
    this.setState(prevState => ({
      purchased: !prevState.purchased
    }));

  renderField = field => (
    <FormGroup row>
      <Col sm={2} />
      <Label sm={1}>{field.label}</Label>
      <Col sm={6}>
        <Input {...field.input} type={field.type} />
      </Col>
    </FormGroup>
  );

  renderCheckBox = field => (
    <FormGroup row>
      <Col sm={3} />
      <Col sm={{ size: 6 }}>
        <FormGroup check>
          <Label check>
            <Input {...field.input} type={field.type} /> {field.label}
          </Label>
        </FormGroup>
      </Col>
    </FormGroup>
  );

  render() {
    const {
      onAddPurchaseItem,
      onEditPurchaseItem,
      onRemovePurchaseItem,
      handleChange,
      renderField,
      renderCheckBox,
      togglePurchase,
      toggleDeleteModal
    } = this;

    const { title, selectedItem, unSelectItem } = this.props;
    const { purchased } = this.props;
    const { isModalOpen } = this.state;

    /** If selectedItem is an ampty object, then it is in adding Mode,
     * otherwise The item is edditing
     */
    const isAdding =
      Object.keys(selectedItem).length === 0 &&
      selectedItem.constructor === Object;

    return (
      <Form className="add-Form" onSubmit={e => e.preventDefault()}>
        <Field
          name="title"
          component={renderField}
          type="text"
          label="Title"
          onChange={e => handleChange(e)}
        />
        <Field
          name="notes"
          component={renderField}
          type="textarea"
          label="Notes"
          onChange={e => handleChange(e)}
        />
        <Field
          name="purchased"
          component={renderCheckBox}
          checked={purchased}
          type="checkbox"
          label="Purchased"
          onChange={() => togglePurchase()}
        />

        <FormGroup row className="text-center">
          <Col sm={2} />
          <Col sm={7}>
            <Link to="/">
              <Button
                color="success"
                type="submit"
                onClick={
                  isAdding
                    ? () => onAddPurchaseItem()
                    : () => {
                        onEditPurchaseItem();
                      }
                }
                disabled={!title}
              >
                {isAdding ? "Add" : "Edit"}
              </Button>
            </Link>
            {!isAdding && (
              <Button
                color="danger"
                type="submit"
                className="grocery-btn-Delete"
                onClick={() => toggleDeleteModal()}
              >
                Delete
              </Button>
            )}
          </Col>
        </FormGroup>

        <Link to="/">
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            className="add-icon"
            size="3x"
            onClick={() => unSelectItem()}
          />
        </Link>

        {/* Only render delete modal if an item has been selected */}
        {title && (
          <DeleteModal
            isOpen={isModalOpen}
            toggle={() => toggleDeleteModal()}
            title={title}
            removeItem={() => onRemovePurchaseItem()}
          />
        )}
      </Form>
    );
  }
}

const selector = formValueSelector("itemDetails");

// To initialize Form State
const handleInitializeForm = (selectedItem = {}) => {
  const { title, notes, purchased } = selectedItem;
  return {
    title,
    notes,
    purchased
  };
};

const mapStateToProps = state => {
  const { selectedItem } = state;
  const { title, notes, purchased } = selector(
    state,
    "notes",
    "title",
    "purchased"
  );
  return {
    selectedItem,
    title,
    notes,
    purchased,
    initialValues: handleInitializeForm(selectedItem)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addItem, editItem, removeItem, unSelectItem, initialize },
    dispatch
  );

ItemDetails.propTypes = {
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    notes: PropTypes.string,
    purchased: PropTypes.bool
  }),
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  unSelectItem: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "itemDetails", enableReinitialize: true })(ItemDetails));
