import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Form } from "semantic-ui-react";
import { getUsers, makeUserAnAdmin } from "../../redux/actions/authActions";
import { Paragraph, StyledForm } from "./AddAdminForm-styles";

export const AddAdminForm = (props) => {
  const { users, usersError, getUsers, makeUserAnAdmin } = props;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const renderUsers = () => {
    const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      if (!formData.get("users")) return;

      const user = users.find((u) => u.username === formData.get("users"));
      makeUserAnAdmin(user._id);
    };

    return (
      <StyledForm onSubmit={handleSubmit}>
        {usersError && <Paragraph>{usersError.data.message}</Paragraph>}
        <Paragraph>
          Select which user you would like to make an admin.
        </Paragraph>
        <Form.Field name="users" control="select">
          {users.map((user, i) => {
            return (
              user.role !== "admin" && (
                <option name="" key={i} value={user.id}>
                  {user.username}
                </option>
              )
            );
          })}
        </Form.Field>
        <Button type="submit">Submit</Button>
      </StyledForm>
    );
  };
  if (!users) return null;
  else if (users.length === 0) return "No users";

  return <Container>{renderUsers()}</Container>;
};

export default connect(
  ({ auth, errors }) => ({
    users: auth.users,
    usersError: errors.auth.users,
  }),
  {
    getUsers,
    makeUserAnAdmin,
  }
)(AddAdminForm);
