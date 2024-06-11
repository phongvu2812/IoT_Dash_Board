import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
   background-color: grey;
   color: #fff;
   padding: 6px 12px;
   &:hover {
      background-color: #a9a9a9;
   }
   &:focus {
      background-color: green;
   }
`;
export default StyledButton;
