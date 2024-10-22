// styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;  /* Set to half of the screen height */
  text-align: center;
  overflow: hidden; /* Prevents overflow */
`;

export const Title = styled.h1`
  font-weight: bold; // or you can use 700
  font-size: 2rem; // adjust as needed
`;

export const Subtitle = styled.p`
  font-weight: 600; // a bit bolder than normal text
  font-size: 1.5rem; // adjust size as needed
`;

export const Button = styled.button`
  background-color: #2081e2;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
`;
export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;