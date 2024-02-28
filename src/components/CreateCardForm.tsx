import styled from "styled-components";

const CreateCardForm = styled.form`
  width: 100%;
  margin-bottom: 10px;

  input {
    width: 100%;
    border: none;
    padding: 10px;
    outline: none;
    border-radius: 5px;
    color: ${(prop) => prop.theme.form.label};
    background-color: ${(prop) => prop.theme.modal.bgColor};
  }
  input:hover,
  input:focus {
    background-color: ${(prop) => prop.theme.form.inputBgHover};
  }
`;
export default CreateCardForm;
