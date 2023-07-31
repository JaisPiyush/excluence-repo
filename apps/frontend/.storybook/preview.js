// import type { Preview } from "@storybook/react";
import { ThemeProvider } from '@mui/material/styles';
// import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import darkTheme from "../styles/theme/darkTheme"
import "../styles/globals.css";
import "../styles/font.css";
import { Box, CssBaseline } from '@mui/material';


const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

const withThemeProvider = (Story, context) => {
  return (
    // <Emotion10ThemeProvider theme={darkTheme}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <Story {...context} />
      </ThemeProvider>
    // </Emotion10ThemeProvider>
  )
}

export const decorators = [withThemeProvider];