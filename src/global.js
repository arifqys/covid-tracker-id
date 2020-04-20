import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.1s linear;
  }

  .switch {
    background: ${({ theme }) => theme.box};
    color: ${({ theme }) => theme.text};
  }

  .box {
    background: ${({ theme }) => theme.box};
  }

  .skeleton-view {
    background: ${({ theme }) => theme.body};
  }

  a {
    color: ${({ theme }) => theme.url};
  }
`