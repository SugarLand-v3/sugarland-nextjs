import * as React from 'react';
import { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AppBar, Toolbar, Button, Stack, IconButton, Grid } from '@mui/material';
import { drawerWidth } from '../../config';
import { Web3ModalContext, NavigationContext } from '../../contexts';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { useCallback, useContext } from 'react';
import Logo from '../../public/images/citizen/Citi_header_logo.png';

const useStyles = makeStyles(() => ({
  navBarLayout: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    padding: '15px',
    background:'rgba(24,26,32, .8)', 
    opacity:'90%',
    left:'0px',
    position:'absolute',
  },
  citiValueStyle: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
}));
// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
const StyledToolbar = styled(Toolbar)(( ) => ({
  alignItems: 'flex-center',
  justifyContent: 'space-between',
  width: '100%',
}));

const NavBar: NextPage = () => {
  const router = useRouter();
  const [addr, setAddr] = React.useState<string>("");
  const { connect, disconnect, account } = useContext(Web3ModalContext);
  const { toggleDrawerOpen } = useContext(NavigationContext);

  React.useEffect(() => {
    if (account) {
      const updatedAddr = account.toString();
      setAddr(updatedAddr);
    }
  })
  
  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const classes = useStyles(); 

  const _renderConnectWalletButton = () => {
  
    return (
      <Stack direction="row" spacing={2} 
      className={classes.navBarLayout}
      sx={{
 

        // sm:{
        //   width: '100%',
        // },

        // md: {
        //   width: `calc(100% - ${drawerWidth}px)`, 
        //   ml: `${drawerWidth}px` 
        // },

        // lg:{
        //   width:'100%',
        // },

      }}>
        <Stack className={classes.citiValueStyle}>
          {/* <Image alt="logo" src={Logo} width={'250px'} height={'30px'}/> */}
          <Grid
                component="img"
                // src={`/images/citizen/NFTMockup.png`}
                src={'images/citizen/Citi_header_logo.png'}

                sx={{ 
                  height: 50,
                  width: 280,
                  borderRadius: 3,
                }}
                >
          </Grid>
          <Typography variant="body1" align="center" p={2} sx={{color:'#FF43F7', marginLeft:'100px',fontWeight:'bold',}}>$CITI $0.001</Typography>
        </Stack>
      <>
        {!account ? (
          <Button
            color="primary"
            onClick={handleConnectWallet}
            sx={{
              display:'flex',
            }}
          >
            Connect
          </Button>
        ) : (
          <Button 
            color="secondary"
            onClick={handleDisconnectWallet}
          >
            {addr.substr(0,5) + "..." + addr.substr(addr.length - 6, addr.length)}
          </Button>
        )}
      </>
      </Stack>
    );
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0} 
      sx={{
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        zIndex:'9999',
        sm: {
          width: '100%',
          pl: 3,
          zIndex:'-1',
        },
        md: {
          width: `calc(100% - ${drawerWidth}px)`, 
          ml: `${drawerWidth}px` ,
          zIndex:'-1',
        },
      }}>
      <StyledToolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawerOpen}
          sx={{ mr: 2, visibility: { md: 'hidden'} ,zIndex:'-2' }}
        >
          <MenuIcon />
        </IconButton>
        
        { router.asPath != '/swap' && _renderConnectWalletButton() }
      </StyledToolbar>
    </AppBar>
  );
};

export default NavBar;
