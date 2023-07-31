import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    typography: {
        fontFamily: ['Euclid Circular A', 'sans-serif'].join(',')
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#696CFE', // Purple
            light: '#A6A8A8' // Light purple
        },
        secondary: {
            main: '#69FEB6', // Highlight
            light: '#FFFFFF', // White
            dark: '#030111', // Purple strong
            contrastText: '#8B8B93'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 375,
            md: 834,
            lg: 1280,
            xl: 1440
        }
    },
    spacing: 8,
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true
            }
        }
    }
});

const { breakpoints, palette } = darkTheme;

darkTheme.typography.h1 = {
    lineHeight: 1,
    fontWeight: 600,
    color: palette.secondary.light,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: palette.secondary.light
    },
    [breakpoints.up('sm')]: {
        fontSize: '2rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '6.5rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '7.5rem'
    }
};

darkTheme.typography.h3 = {
    fontSize: '2.75rem',
    fontWeight: 600,
    color: palette.secondary.light,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: palette.secondary.light
    },
    [breakpoints.up('sm')]: {
        fontSize: '1.75rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '2.75rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '3rem'
    }
};

darkTheme.typography.h4 = {
    fontSize: '2rem',
    fontWeight: 600,
    color: palette.secondary.light,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: palette.secondary.light
    },
    [breakpoints.up('sm')]: {
        fontSize: '1.75rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '2rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '2rem'
    }
};

darkTheme.typography.h5 = {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: palette.secondary.contrastText,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '0.875rem'
    },
    [breakpoints.up('sm')]: {
        fontSize: '1.125rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '1.5rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '1.5rem'
    }
};

darkTheme.typography.body1 = {
    fontSize: '1rem',
    fontWeight: 300,
    color: palette.secondary.contrastText,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '0.5rem',
        fontWeight: 300,
        color: palette.secondary.contrastText
    },
    [breakpoints.up('sm')]: {
        fontSize: '0.75rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '1rem'
    }
};

darkTheme.typography.body2 = {
    fontSize: '1rem',
    fontWeight: 300,
    color: palette.secondary.contrastText,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '0.75rem',
        fontWeight: 300,
        color: palette.secondary.contrastText
    },
    [breakpoints.up('sm')]: {
        fontSize: '0.75rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '1rem'
    },
    ':hover': {
        color: palette.primary.main
    }
};

darkTheme.typography.button = {
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: darkTheme.typography.fontFamily,
    [breakpoints.up('xs')]: {
        fontSize: '0.75rem',
        fontWeight: 500
    },
    [breakpoints.up('sm')]: {
        fontSize: '1rem'
    },
    [breakpoints.up('lg')]: {
        fontSize: '1.2rem'
    }
};

export default darkTheme;
