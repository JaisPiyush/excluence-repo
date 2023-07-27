import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    typography: {
        fontFamily: ['Euclid Circular A', 'sans-serif'].join(',')
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
            sm: 320,
            md: 834,
            lg: 1280,
            xl: 1440
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
