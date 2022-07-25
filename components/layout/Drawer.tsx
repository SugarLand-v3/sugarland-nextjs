import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer  from '@mui/material/Drawer';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem, ListItemText, Stack } from '@mui/material';
import Image from 'next/image';
import Logo from '../../public/images/citizen/Citi_header_logo.png';
import { drawerWidth } from '../../config';
import { GlobalContext, NavigationContext} from '../../contexts';

const TWITTER = "/images/icons/Twitter.png";
const TELEGRAM = "/images/icons/Telegram.png";
const INSTAGRAM = "/images/icons/Instagram.png";
const DISCORD = "/images/icons/Discord.png";
const REDDIT = "/images/icons/Reddit.png";
import {CgLaptop} from 'react-icons/cg';
import {BiPlusCircle} from 'react-icons/bi';
import {IoIosSwitch} from 'react-icons/io';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {IoMdLock} from 'react-icons/io';
import {RiImageFill} from 'react-icons/ri';
import {AiOutlineUser} from 'react-icons/ai';
import {BsFillBookmarkPlusFill} from 'react-icons/bs';
import {BsList} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import {FiShare} from 'react-icons/fi'
import {MdCollectionsBookmark} from 'react-icons/md'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const useStyles = makeStyles(() => ({
  diamondBox: {
    margin:'5%',
    paddingBottom:'5%',
    backgroundSize:"contain",
    backgroundRepeat:'no-repeat',
    backgroundPositionX:'center',
    backgroundPositionY:'-10px',
    borderRadius:'10px',
    color:'White',
  },

  customBadge: {
    display:'flex',
    fontSize:'15px',
    color:'#EB6FE9',
  },

  iconContainerStyle: {
    // background: 'linear-gradient(to bottom, rgba(78, 94, 238, 0.25), rgba(228,122, 231, 0.25))',
    background: '#444444',
    opacity:'0.9',
    borderRadius: 3,
    paddingBottom: 4,
    width:'80%',
  },
  boxItemStyle: {
    background:'rgba(60, 60, 90)',
    opacity:'0.9',
    borderRadius: 10,
  }
}));

export default function PermanentDrawerLeft(props: Props) {
  const { window } = props;
  const router = useRouter();
  // const [addr, setAddr] = React.useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(true);
  const { sugarPrice } = useContext(GlobalContext);
  const { drawerOpen, toggleDrawerOpen } = useContext(NavigationContext);
  // const { connect, disconnect, account } = useContext(Web3ModalContext);
  const container = window !== undefined ? () => window().document.body : undefined;

  const boxTypoStyle = {
    // background: 'linear-gradient(to bottom, rgba(78, 94, 238, 0.25), rgba(228,122, 231, 0.25))',
    background: '#444444',
    margin:'30px',
    opacity:'0.9',
    borderRadius: 3,
    paddingRight: 7,
  };

  const listItemStyle = {
    paddingLeft: 2,
    justifyContent:'space-between',
    display:'flex',
  }
  const listIconStyle = {
    paddingLeft: 6,
    justifyContent:'space-between',
    display:'flex',
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const socialLinkStyle = {
    cursor: 'pointer',
  };

  const classes = useStyles(); 
  const drawerContent = (
    <Stack direction="column" spacing={1} sx={{mb:4, ml:3, mr:3,mt:15,}}>
      <Box className={classes.boxItemStyle}>
          <List>
            <Link href='/whitelist' passHref>
              <ListItem button key="whitelist" selected={router.asPath == '/whitelist'}>
                <BsFillBookmarkPlusFill/> 
                <ListItemText sx={listItemStyle} primary="whitelist" />
              </ListItem>
            </Link>
            <Link href='/' passHref>
              <ListItem button key="collections" selected={router.asPath == '/collections'}>
                <BiPlusCircle/>
                <ListItemText  sx={listItemStyle} primary="collections" />
              </ListItem>
            </Link>
            <Link href='/swap' passHref>
                <ListItem button key="collections" selected={router.asPath == '/swap'}>
                  <AiOutlineUser/>
                  <ListItemText  sx={listItemStyle} primary="My Account" />
                </ListItem>
            </Link>
          </List>
      </Box>
      <Box className={classes.boxItemStyle}>
          <List>
            <Link href='/' passHref>
              <ListItem button key="stats" selected={router.asPath == '/'}>
                <BiPlusCircle/>
                <ListItemText sx={listItemStyle} primary="Dashboard" />
              </ListItem>
            </Link>
            <Link href='/Reward' passHref>
              <ListItem button key="Reward" selected={router.asPath == '/Reward'}>
                <MdCollectionsBookmark/>
                <ListItemText sx={listItemStyle} primary="My NFT" />
              </ListItem>
            </Link>
            <Link href='/mint' passHref>
              <ListItem button key="mint" selected={router.asPath == '/mint'}>
                <RiImageFill/>
                <ListItemText sx={listItemStyle} primary="Mint NFT" />
              </ListItem>
            </Link>
            <Link href="/soon" passHref>
                <ListItem button key="merch" >
                  <AiOutlineHeart/>
                  <ListItemText sx={listItemStyle} primary="MarketPlace"/>
                </ListItem>
            </Link>
          </List>
      </Box>
      {/* <Box sx={boxItemStyle}>
          <List>
            <Link href="/staking" passHref>
                <ListItem button key="staking" selected={router.asPath == '/staking'}>
                  <IoMdLock/>
                  <ListItemText sx={listItemStyle} primary="Staking"/>
                </ListItem>
            </Link>
          </List>
      </Box> */}
      <Box className={classes.boxItemStyle}>
          <List>
            <Link href='/staking' passHref>
              <ListItem button key="citizen" selected={router.asPath == '/staking'}>
                <AiOutlineUser/>
                <ListItemText sx={listItemStyle} primary="DAO" />
              </ListItem>
            </Link>
            <Link href='/mynfts' passHref>
              <ListItem button key="MyNFTs" selected={router.asPath == '/soon'}>
                <MdCollectionsBookmark/>
                <ListItemText sx={listItemStyle} primary="My NFTs" />
              </ListItem>
            </Link>
          </List>
      </Box>
      <Box className={classes.boxItemStyle}>
          <List>
            <Link href="/soon" passHref>
                <ListItem button key="merch" >
                  <AiOutlineHeart/>
                  <ListItemText sx={listItemStyle} primary="Merch"/>
                </ListItem>
            </Link>
          </List>
      </Box>
      {/* <Box className={classes.iconContainerStyle} > */}
      <Box className={classes.boxItemStyle}>
      
          <List>
            <ListItem>
              <FiShare/>
              <ListItemText sx={listItemStyle} primary="Socials" />
            </ListItem>
            <ListItem sx={listIconStyle}>
              <Link href='https://twitter.com/sugarlandcoin/' passHref>
                <a target="_blank" style={socialLinkStyle}>
                  <Image alt="twitter" src={TWITTER} width={'25px'} height={'22px'}/>
                </a>
              </Link>
              <Link href='https://t.me/SugarLandNews/' passHref>
                <a target="_blank" style={socialLinkStyle}>
                  <Image alt="telegram" src={TELEGRAM} width={'25px'} height={'22px'}/>
                </a>
              </Link>
              <Link href='https://discord.gg/28KZRJzxbA/' passHref>
                <a target="_blank" style={socialLinkStyle}>
                  <Image alt="discord" src={DISCORD} width={'25px'} height={'22px'}/>
                </a>
              </Link>
              <Link href='https://www.instagram.com/sugarland_IG/' passHref>
                <a target="_blank" style={socialLinkStyle}>
                  <Image alt="instagram" src={INSTAGRAM} width={'25px'} height={'22px'}/>
                </a>
              </Link>
              <Link href='https://www.Reddit.com/SugarlandCoinFB/' passHref>
                <a target="_blank" style={socialLinkStyle}>
                  <Image alt="reddit" src={REDDIT} width={'25px'} height={'22px'}/>
                </a>
              </Link>

            </ListItem>
          </List>
      </Box>
      <Divider />
    </Stack>

  );

  // const classes = makeStyles();
  return (
    <>
      <Drawer
        open={drawerOpen}
        variant="temporary"
        container={container}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
        }}
        onClose={toggleDrawerOpen}
        sx={{
          display: { xs: 'block', sm: 'block' },
          width: drawerWidth, 
          '& .MuiDrawer-paper': {
            color: 'white',
            // padding: '30px 30px 30px 30px',
            background: '#171520',
            boxSizing: 'border-box', 
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      <Drawer
        open
        variant="permanent"
        container={container}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            color: 'white',
            // padding: '30px 30px 30px 30px',
            background: '#171520',
            boxSizing: 'border-box', 
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
