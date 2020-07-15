import React from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { validateForm, validateImages } from "./validate";
import { Form, Button, Message } from "semantic-ui-react";
import { Container } from "./ShoesForm-styles";
import FileUploads from "./components/FileUploads";
import AmountPerSize from "./components/AmountPerSize";

export class ShoesForm extends React.Component {
  state = {
    resultData: {},
    errors: {},
    submissionError: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.submissionError) {
      this.setState({ submissionError: null });
    }
    const formData = new FormData(e.target);

    const validatedImages = validateImages(formData.getAll("images"));
    const firstImage = validatedImages[0];
    const restOfTheImages = [];
    validatedImages.forEach((image, index) => {
      if (index !== 0) return restOfTheImages.push(image);
    });

    const toInt = (array) => {
      let result = [];
      array.forEach((item, index) => {
        result[index] = parseInt(item);
      });
      return result;
    };
    const sizesToInt = toInt(formData.getAll("sizes"));
    const amountsToInt = toInt(formData.getAll("amounts"));
    let amountPerSize = {};
    sizesToInt.forEach((size, index) => {
      amountPerSize = { ...amountPerSize, [size]: amountsToInt[index] };
    });

    const dataToValidate = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      category: formData.get("category"),
      price: formData.get("price"),
      description: formData.get("description"),
      sizes: sizesToInt,
      amounts: amountsToInt,
      amountPerSize: amountPerSize,
      color: formData.get("color"),
      frontImage: firstImage,
      images: restOfTheImages,
      gender: formData.get("gender"),
      forKids: formData.get("forKids"),
    };

    const errors = validateForm(dataToValidate);
    this.setState({ errors });

    if (_.isEmpty(errors)) {
      const formatForSubmission = (validatedData) => {
        const formData = new FormData();
        Object.keys(validatedData).forEach((key) => {
          if (key === "amounts") {
            return;
          } else if (key === "images") {
            validatedData[key].forEach((image, index) => {
              formData.append("images" + index, image);
            });
          } else if (key === "amountPerSize") {
            formData.append(key, JSON.stringify(validatedData[key]));
          } else formData.append(key, validatedData[key]);
        });
        return formData;
      };
      const validatedData = dataToValidate;
      const submitData = formatForSubmission(validatedData);

      axios
        .post("/shoes", submitData, {
          headers: {
            "X-Auth-Token": this.props.token,
          },
        })
        .then((response) => {
          this.setState({ resultData: response });
        })
        .catch((submissionError) => this.setState({ submissionError }));
    }
  };

  renderFormFields = () => {
    const fields = [
      {
        name: "brand",
        label: "Brand name:",
        items: <input name="brand" type="text" placeholder="Brand name" />,
      },
      {
        name: "model",
        label: "Model name:",
        items: <input name="model" type="text" placeholder="Model name" />,
      },
      {
        name: "category",
        label: "Category:",
        items: <input name="category" type="text" placeholder="Category" />,
      },
      {
        name: "price",
        label: "Price:",
        items: <input name="price" type="number" placeholder="Price" />,
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
          />
        ),
      },
      {
        name: "amountPerSize",
        label: "Amount of shoes per size: (e.g. 42: 150, 43: 60):",
        items: <AmountPerSize />,
      },
      {
        name: "images",
        label: "Images: (Duplicates will be ignored)",
        items: <FileUploads />,
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
            <input name="gender" type="radio" value="Both" />
            <p>Both</p>
          </>
        ),
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
    return (
      <Container>
        {!_.isEmpty(this.state.resultData) ? (
          <>
            <Message positive size="big" header={"Shoe added succesfully!"} />
            <Link
              onClick={(e) => this.setState({ resultData: {} })}
              to="/shoes/add"
            >
              Go back.
            </Link>
          </>
        ) : (
          <>
            <h3>ADD SHOES TO THE DATABASE</h3>
            <Form
              type="POST"
              onSubmit={(e) => this.handleSubmit(e)}
              encType="multipart/form-data"
            >
              {this.renderFormFields()}
              <Button type="submit">Add</Button>
            </Form>
          </>
        )}
      </Container>
    );
  }
}

export default connect(({ auth }) => ({ token: auth.token }))(ShoesForm);
