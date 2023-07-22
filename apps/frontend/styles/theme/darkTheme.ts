import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    typography: {
        fontFamily: ['Work Sans', 'sans-serif'].join(',')
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#A259FF',
            light: '#A6A8A8'
        },
        secondary: {
            main: '#191D1E',
            light: '#232428'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 834,
            lg: 1280,
            xl: 1536
        }
    },
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true
            }
        }
    }
});

export default darkTheme;
