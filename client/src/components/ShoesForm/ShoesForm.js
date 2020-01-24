import React from "react";
import validate from "./validate";
import { Form, Button, Message } from "semantic-ui-react";
import { Container } from "./ShoesForm-styles";

class ShoesForm extends React.Component {
  state = { data: {}, errors: null };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const shoesData = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      category: formData.get("category"),
      price: formData.get("price"),
      description: formData.get("description"),
      amount: formData.get("amount"),
      sizes: formData
        .get("sizes")
        .split(", ")
        .map(size => size.trim()),
      gender: formData.get("gender"),
      forKids: formData.get("forKids")
    };
    this.setState({ data: shoesData });
    const errors = validate(shoesData);
    this.setState({ errors });
  };

  renderFormFields = () => {
    const fields = [
      {
        name: "brand",
        label: "Brand name:",
        items: <input name="brand" type="text" placeholder="Brand name" />
      },
      {
        name: "model",
        label: "Model name:",
        items: <input name="model" type="text" placeholder="Model name" />
      },
      {
        name: "category",
        label: "Category:",
        items: <input name="category" type="text" placeholder="Category" />
      },
      {
        name: "price",
        label: "Price:",
        items: <input name="price" type="text" placeholder="Price" />
      },
      {
        name: "description",
        label: "Description",
        items: (
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            cols="50"
          ></textarea>
        )
      },
      {
        name: "amount",
        label: "Amount of shoes:",
        items: <input name="amount" type="number" placeholder="Amount" />
      },
      {
        name: "sizes",
        label: "Sizes:",
        items: <input name="sizes" type="text" placeholder="e.g. 42, 41, 45" />
      },
      {
        name: "gender",
        label: "Gender:",
        items: (
          <>
            <input name="gender" type="radio" value="Male" />
            <p>Male</p>
            <input name="gender" type="radio" value="Female" />
            <p>Female</p>
          </>
        )
      },
      {
        name: "forKids",
        label: "The product is for kids:",
        items: (
          <>
            <input name="forKids" type="radio" value="true" />
            <p>Yes</p>
            <input name="forKids" type="radio" value="false" />
            <p>No</p>
          </>
        )
      }
    ];

    return fields.map((field, index) => {
      const { name, label, items } = field;
      const { errors } = this.state;
      let error = [];

      if (errors) {
        error = Object.keys(errors).filter(err => {
          return err === name;
        });
      }

      return (
        <Form.Field key={index}>
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
    return (
      <Container>
        <h3>ADD SHOES TO THE DATABASE</h3>
        <Form onSubmit={e => this.handleSubmit(e)}>
          {this.renderFormFields()}
          <Button type="submit">Add</Button>
        </Form>
      </Container>
    );
  }
}

export default ShoesForm;
