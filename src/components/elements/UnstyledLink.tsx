import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:visited {
    color: inherit;
  }
`;
