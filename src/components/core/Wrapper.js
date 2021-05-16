import styled from "styled-components";
const Wrapper = (props) => {
  return <WrapperCustom>{props.children}</WrapperCustom>;
};

const WrapperCustom = styled.div`
  padding: 1% 10%;
`;

export default Wrapper;
