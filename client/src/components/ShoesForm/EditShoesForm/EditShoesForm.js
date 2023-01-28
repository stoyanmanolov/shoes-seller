import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { validateForm } from "../validate";
import { Form, Button, Message, Loader } from "semantic-ui-react";
import { Container } from "./EditShoesForm-styles";
import { withRouter } from "react-router-dom";
import { ShoesAPI } from "../../../api";

export class EditShoesForm extends React.Component {
  state = {
    shoe: null,
    resultData: {},
    errors: {},
    submissionError: null,
  };

  componentDidMount() {
    ShoesAPI.getShoe(this.props.match.params.id)
      .then((response) => {
        this.setState({ shoe: response.data });
      })
      .catch((error) => {
        this.setState({ submissionError: error.response.data.message });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.submissionError) {
      this.setState({ submissionError: null });
    }

    const formData = new FormData(e.target);

    const dataToValidate = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      category: formData.get("category"),
      price: formData.get("price"),
      description: formData.get("description"),
      color: formData.get("color"),
    };

    const errors = validateForm(dataToValidate);
    this.setState({ errors });

    if (_.isEmpty(errors)) {
      const submitData = dataToValidate;
      ShoesAPI.editShoe(this.state.shoe._id, submitData, this.props.token)
        .then((response) => {
          this.setState({ resultData: response });
        })
        .catch((submissionError) => this.setState({ submissionError }));
    }
  };

  renderFormFields = () => {
    const {
      shoe: { brand, model, category, price, description, color },
    } = this.state;

    const fields = [
      {
        name: "brand",
        label: "Brand name:",
        items: (
          <input
            name="brand"
            type="text"
            placeholder="Brand name"
            defaultValue={brand}
          />
        ),
      },
      {
        name: "model",
        label: "Model name:",
        items: (
          <input
            name="model"
            type="text"
            placeholder="Model name"
            defaultValue={model}
          />
        ),
      },
      {
        name: "category",
        label: "Category:",
        items: (
          <input
            name="category"
            type="text"
            placeholder="Category"
            defaultValue={category}
          />
        ),
      },
      {
        name: "price",
        label: "Price:",
        items: (
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            defaultValue={price}
          />
        ),
      },
      {
        name: "description",
        label: "Description:",
        items: (
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            cols="50"
            defaultValue={description}
          ></textarea>
        ),
      },
      {
        name: "color",
        label: "Color:",
        items: (
          <input
            name="color"
            type="text"
            placeholder="e.g. Black, White, Grey"
            defaultValue={color}
          />
        ),
      },
    ];

    return fields.map((field, index) => {
      const { name, label, items } = field;
      const { errors } = this.state;
      let error = [];

      if (!_.isEmpty(errors)) {
        error = Object.keys(errors).filter((err) => {
          return err === name;
        });
      }

      return (
        <Form.Field name={name} key={index}>
          <label>{label}</label>
          {error.length !== 0 ? (
            <Message negative size="tiny" header={errors[name]} />
          ) : null}
          {items}
        </Form.Field>
      );
    });
  };

  render() {
    if (this.state.submissionError) {
      window.alert(this.state.submissionError);
    }

    if (!this.state.shoe) return <Loader active inline="centered" />;

    return (
      <Container>
        {!_.isEmpty(this.state.resultData) ? (
          <Message positive size="big" header={"Shoe edited succesfully!"} />
        ) : (
          <>
            <h3>
              EDIT SHOE: {this.state.shoe.brand + " " + this.state.shoe.model}
            </h3>
            <Form
              type="POST"
              onSubmit={(e) => this.handleSubmit(e)}
              encType="multipart/form-data"
            >
              {this.renderFormFields()}
              <Button type="submit">Edit</Button>
            </Form>
          </>
        )}
      </Container>
    );
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(
  withRouter(EditShoesForm)
);
