import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Button } from "semantic-ui-react";
import { ShoesAPI } from "../../../api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const ShoeCard = ({ shoe }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  const handleDelete = () => {
    ShoesAPI.deleteShoe(shoe._id, token)
      .then((response) => {
        history.push(`/shoes/deleted/${response.data._id}`);
      })
      .catch((error) => window.alert(error.response.statusText));
  };

  const handleEdit = () => {
    history.push(`/shoes/edit/${shoe._id}`);
  };

  return (
    <Link to={`/shoe/${shoe._id}`}>
      <Card>
        <CardImg
          top
          className="card-image"
          src={"/images/" + shoe.frontImage}
          alt="Shoes front image"
          style={{
            objectFit: "cover",
            height: "300px",
          }}
        />
        <CardBody>
          <CardTitle style={{ color: "black" }}>
            {shoe.brand + " " + shoe.model}
          </CardTitle>
          <CardSubtitle style={{ color: "grey" }}>
            {"$" + shoe.price.toFixed(2)}
          </CardSubtitle>
          {user && user.role === "admin" && (
            <>
              <Button onClick={handleEdit} positive>
                Edit
              </Button>

              <Button onClick={handleDelete} negative>
                Delete
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default ShoeCard;
