import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  font-size: 62.5%; /* 16px x 62.5 = 10px = 1rem */
}

*,
::after,
::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  height: 100vh;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  height: 100%;
}

li {
  list-style: none;
}

a {
  color: ${({ theme }) => theme.colors.fontColor};
	text-decoration: none;
}

svg {
  color: grey;
}
`;

export default GlobalStyle;
