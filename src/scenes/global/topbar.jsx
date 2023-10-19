import styled from "@emotion/styled";

import { colors } from "../../styles/theme";
import IconButton from "../../common/icons";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.orange[500]};
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Topbar = () => {
  const click1 = () => {
    console.log("1 CLICKED");
  };
  const click2 = () => {
    console.log("2 CLICKED");
  };
  const click3 = () => {
    console.log("3 CLICKED");
  };
  return (
    <Container>
      <IconButton name={"menu"} onClick={click1} />
      <IconsContainer>
        <IconButton name={"home"} onClick={click2} />
        <IconButton name={"user"} onClick={click3} />
      </IconsContainer>
    </Container>
  );
};

export default Topbar;
