import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  ::-webkit-scrollbar {
    transition: 0.3s ease all;
    width: 5px;
    background: rgba(219, 48, 0, 0.2);
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 56, 0, 0.8);
    border-radius: 5px;
  }

  @media (max-width: 60rem) {
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    transition: 0.3s ease all;
    width: 5px;
    background: rgba(219, 48, 0, 0.2);
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 56, 0, 0.8);
    border-radius: 5px;
  }

  @media (max-width: 60rem) {
    padding: 0;
  }
`;

const Content = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
  
  @media (max-width: 60rem) {
    padding-bottom: 10rem;
    margin: 0;
  }
`;

export { Container, ContentContainer, Content };
