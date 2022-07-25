import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import palette from './palette';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    mini: true;
  }
}
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label1: true;
    label2: true;
  }
}
declare module '@mui/material/styles' {
  interface PaletteOptions{
    black?: SimplePaletteColorOptions;
    gray?: SimplePaletteColorOptions;
    white?: SimplePaletteColorOptions;
  }
  interface SimplePaletteColorOptions {
    60?: string;
    70?: string;
    80?: string;
    90?: string;
    100?: string;
  }
  interface TypographyVariants {
    label1: React.CSSProperties;
    label2: React.CSSProperties;
  }  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label1?: React.CSSProperties;
    label2?: React.CSSProperties;
  }
}
let theme = createTheme({
  palette: palette
});

theme = createTheme({
  palette: { ...palette,
    background: {
    }
  },
  typography: {
    fontFamily: 'Montserrat, Arial',
    h4: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 500
    },
    subtitle1: {
      fontWeight: 800,
      fontSize: '20px',
      lineHeight: '24px',
    },
    subtitle2: {
      fontWeight: 800,
      fontSize: '18px',
      lineHeight: '24px',
    },
    label1: {
      fontWeight: 700,
      fontSize: '13px',
      lineHeight: '16px',
      marginBottom: '12px',
    },
    label2: {
      fontWeight: 700,
      fontSize: '9px',
      lineHeight: '16px',
      margin: '10px',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          height: '36px',
          color: 'white',
          fontFamily: 'Montserrat',
          fontSize: '12px',
          fontWeight: 700,
          padding: '10px 26px',
          borderRadius: '10px',
          background: 'linear-gradient(to bottom, #7F43FF, #2EF6F6)',
          // background:'#0E0E0E',
          ":disabled": {
            background: palette.primary[60],
          },
          ":hover": {
            background: palette.primary[60],
          },
          ":focus": {
            // border: '3px solid ' + palette.primary[60],
            // boxShadow: `${alpha(palette.primary[100], 0.25)} 0px 0px 0px 3px`,
            border: 'none',
            backgroundColor: palette.primary[60],
          },
          transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
          ]),
        },
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: palette.white[100],
            backgroundColor: palette.gray[90],
            ":disabled": {
              color: palette.black[60],
              backgroundColor: palette.gray[90],
            },
            ":hover": {
              backgroundColor: palette.gray[100],
            },
            ":focus": {
              // border: '3px solid ' + palette.gray[100],
              backgroundColor: palette.gray[90],
            },
          }
        },
        {
          props: { color: 'error' },
          style: {
            backgroundColor: palette.error[100],
            ":disabled": {
              backgroundColor: palette.error[60],
            },
            ":hover": {
              backgroundColor: palette.error[90],
            },
            ":focus": {
              border: '3px solid ' + palette.error[60],
              backgroundColor: palette.error[90],
            },
          }
        },
        {
          props: { color: 'warning' },
          style: {
            color: palette.black[90],
            backgroundColor: palette.warning[100],
            ":disabled": {
              backgroundColor: palette.warning[60],
            },
            ":hover": {
              backgroundColor: palette.warning[90],
            },
            ":focus": {
              border: '3px solid ' + palette.warning[60],
              backgroundColor: palette.warning[90],
            },
          }
        },
        {
          props: { variant: 'mini' }, 
          style: {
            padding: 0,
            minWidth: '30px',
            height: '25px',
            fontSize: '8px',
            fontWeight: 700,
            color: palette.primary.main,
            background: palette.gray[80],
            borderRadius: '8px',
            // border: '1px solid ' + palette.gray[100],
            ":hover": {
              color: palette.white[100],
              // backgroundColor: palette.primary[90],
            }
          }
        }
      ]
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '40px',
          borderRadius: '10px',
          color: palette.black[100],
          fontFamily: 'Montserrat',
          fontSize: '12px',
          fontWeight: 700,
          border: '1px solid ' + palette.gray[100],
          
          "::placeholder":{
            color: palette.black[60]
          },
          ":hover": {
            border: '1px solid ' + palette.primary[100],
          },
          ":focus-within": {
            border: '1px solid ' + palette.primary[100],
            boxShadow: `${alpha(palette.primary[100], 0.25)} 0px 0px 0px 3px`,
          },
          ":disabled": {
            border: '1px solid ' + palette.gray[100],
            backgroundColor: palette.gray[80],
            color: palette.black[60]
          },
          transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
          ]),
        },
        notchedOutline: {
          visibility: 'hidden'
        }, 
        input: {
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '0px 15px',
          height: '38px'
        }
      },
      variants: [
        {
          props: { color: 'error' },
          style: {
            border: '1px solid ' + palette.error[100],
            ":hover": {
              border: '1px solid ' + palette.error[100],
            },
            ":focus-within": {
              border: '1px solid ' + palette.error[100],
              boxShadow: `${alpha(palette.error[100], 0.25)} 0px 0px 0px 3px`,
            },
          }
        }
      ]
    },
    MuiCssBaseline: {
      styleOverrides: {
        "body": {
          color: 'white',
          // background: 'linear-gradient(to right, #A656C1, #3B1D6D)'
          background:'#0E0E0E',
        },
        fallbacks: [
          {
            '@font-face': {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 400,
              src: `local(''),
                  url('./fonts/montserrat-v23-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                  url('./fonts/montserrat-v23-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */`
            }
          },
          /* montserrat-700 - latin */
          {
            '@font-face': {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 700,
              src: `local(''),
                  url('./fonts/montserrat-v23-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                  url('./fonts/montserrat-v23-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */`
            }
          },
          /* montserrat-800 - latin */
          {
            '@font-face': {
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 800,
              src: `local(''),
                  url('./fonts/montserrat-v23-latin-800.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                  url('./fonts/montserrat-v23-latin-800.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */`
            }
          }
        ]
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: palette.gray[90],
        }
      }
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
          fontWeight: 700,
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 2000
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: '80px',
          backgroundColor: 'transparent',
          zIndex: 2000,
          boxShadow: 'none'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: '240px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          boxSizing: 'border-box',
          ' .MuiPaper-root': {
            zIndex: 2001
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            // backgroundColor : '#A656C1',
            background:'gray',
            borderRadius: '10px',
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: palette.black[60],
          '&.Mui-selected': {
            color: palette.primary[100]
          }
        },
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: palette.primary['main']
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          ' .MuiListItemText-primary': {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 'bold',
            style: 'normal',
            fontSize: '13px',
            lineHeight: '16px',
          }
        }
      }
    }
  }, 
});

export default theme;
