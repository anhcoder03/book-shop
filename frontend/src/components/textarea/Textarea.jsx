import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const TextareaStyles = styled.div`
  margin-top: 20px;
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #666;
  }
  .text-area {
    width: 100%;
    height: 200px;
    border: 1px solid #333;
    padding: 15px;
  }
  .text-area:focus {
    border: 1px solid ${(props) => props.theme.primary};
  }
`;

function Textarea({ children, name, control, ...props }) {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <h3>{children}</h3>
      <textarea
        className="text-area"
        name={name}
        id=""
        {...field}
        {...props}
      ></textarea>
    </TextareaStyles>
  );
}

export default Textarea;
