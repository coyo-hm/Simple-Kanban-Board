import React, { HTMLAttributes } from "react";
import IconButton from "./IconButton";
import { ReactComponent as IconEdit } from "../../images/Icon_edit.svg";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

export default function EditButton({ backgroundColor, ...rest }: Props) {
  return (
    <IconButton backgroundColor={backgroundColor} {...rest}>
      <IconEdit width={24} height={24} strokeWidth={1.5} />
    </IconButton>
  );
}
