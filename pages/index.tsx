import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Web3 from 'web3';
import { Container, Grid, Box, Typography, TextField, Button, Stack } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useYam } from '../hooks';
import { useWeb3 } from '../hooks';
import { GlobalContext } from '../contexts';
import { stringHelper } from '../helpers';

const COINGECKO = "/images/icons/Coingecko-icon.png";
const BCSSCAN = "/images/icons/BSCScan-icon.png";
const COINMARKETCAP = "/images/icons/Coinmarketcap-icon.png";
const POOCOIN = "/images/icons/Poocoin-icon.png";
const DEXTOOLS = "/images/icons/Dextools-icon.png";
const CITI = "/images/icons/Citi-icon.png";
const BSCNET = "https://bsc-dataseed2.binance.org/"
const GROWTHWALLET = "0x2C0F2e13a79fEE743A283b25892D32fc3Ea59317";
const ROYALTYWALLET = "0xa2f7DB7Fd092A676F8a3f88Ce9A41A51f9d2bd84";
const TREASURYWALLET = "0xbCBb5E17c7544571581ef33c2a7ED9808B966955";
const web3 = new Web3(BSCNET);

const useStyles = makeStyles(() => ({
  networkIconStyle: {
    color: 'white',
    display:'flex',
    alignItems:'center',
    marginRight: '3%',
    marginBottom:'2%',
  },
 
  inRowStyle: {
    display:'flex',
  },

  iconStyle: {
    justifyContent:'center',
  },

  dashContainerStyle: {
    marginTop:'100px',
    marginLeft:'5%',
  },

  subTitleStyle: {
    fontFamily:'Montserrat',
    fontSize:'14px',
    lineHeight:'35px',
    marginRight:'10px',
    wordWrap:'break-word',
  },

  subContentStyle: {
    fontFamily:'Montserrat',
    fontSize:'14px',
    lineHeight:'35px',
    wordWrap:'break-word',
  },

  balanceTitleStyle: {
    fontFamily:'Montserrat',
    fontSize:'12px',
    fontWeight:'bold',
    lineHeight:'35px',
  },

  balanceContentStyle: {
    fontFamily:'Montserrat',
    fontSize:'18px',
    
    lineHeight:'35px',
  },

  boxBlurStyle: {
    marginLeft:'5%',
    padding: '5%',
    backgroundColor: '#0E0E0E',
    borderRadius: '10px',
    borderWidth: '1px',
    borderColor: '#AB6FE9',
    boxShadow: '0px 0px 2px 2px #AB6FE9',
  },

  boxlinkStyle: {
    marginTop:'5%',
    marginLeft: '2%',
    marginBottom:'30px',
    padding: '5%',
    borderRadius: '10px',
    opacity:'70%',
    background:'rgba(24, 26, 32, 0.7)',
  },

  boxlinkStyleBottom: {
    marginTop:'10%',
    marginLeft: '2%',
    marginBottom:'30px',
    padding: '5%',
    borderRadius: '10px',
    opacity:'70%',
  },

  calcBoxStyle: {
    padding:'5%',
    height:'100%',
    borderRadius: '10px',
    background: 'linear-gradient(to bottom, rgba(78, 14, 238, 0.25), rgba(123,122, 231, 0.25))',
    marginBottom: '10%',
    marginLeft:'5%',
  },

  dashImageStyle: {
    width: '100%',
    backgroundImage: 'url(images/citizen/CitiWorld.jpg)',
    height: '250px',
    backgroundSize: '100%',
    backgroundPositionY: '50%',
    borderRadius: '10px',
    padding:'10px',
  },

  customInput: {
    width:'90%',
  },

  customButtonStyle: {
    color:'white',
    borderRadius: '10px',
    background: 'linear-gradient(to bottom, #AB6FE9, #9E2EF6)',
    borderColor:'#AB6FE9',
    borderWidth:'1px',
    borderStyle:'solid',
    width:'100%',
    height:'40px',
    fontSize:'12px',
  },

  swapBoxStyle:{
    borderStyle:'solid',
    borderColor:'rgba(24, 26, 32, 0.7)',
    borderWidth:'10px',
    backgroundColor:'rgba(24, 26, 32, 0.8)',
    borderRadius:'10px',
  },

  detialRowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'justify-content'
  },

  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(232, 241, 250)"
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "rgb(250, 232, 241)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(232, 241, 250)"
      }
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgb(250, 241, 232)"
    }
  },
}));


const Home: NextPage = () => {

  const classes = useStyles(); 
  const { numberWithCommas } = stringHelper;
  const { sugarPrice, tokenHolders, totalSupply, marketCap } = useContext(GlobalContext);
  const [ growthWalletAmount, setGrowthWalletAmount] = useState<number>(0);
  const [ royaltyWalletAmount, setRoyaltyWalletAmount] = useState<number>(0);
  const [ treasuryWalletAmount ,setTreasuryWalletAmount] = useState<number>(0);
  const [burntAmount, setBurntAmount] = useState<number>(0);
  const [yamRepeater,setYamRepeater]=useState<number>(0);  
  const yamClient = useYam();
  const web3Client = useWeb3();

  useEffect(() => {
    const getBurntAmount = async () => {
      if(yamClient != undefined) {
        const res = await yamClient.contracts.contractsMap['SUGAR'].methods.balanceOf('0x000000000000000000000000000000000000dead').call();
        setBurntAmount(res);
      }
    };
    // const { sugarPrice, tokenHolders, totalSupply, marketCap } = useContext(GlobalContext);
    getBurntAmount();
    setTimeout(() => setYamRepeater(prevState=>prevState+1), 10000);
  }, [yamRepeater]);

  
  useEffect(() => {
    const getExtraWallet = async () => {
      if(web3Client != undefined) {
        const res = await web3.eth.getBalance(GROWTHWALLET);
        setGrowthWalletAmount(Number(res) / 1000000000000000000);
        const res1 = await web3.eth.getBalance(ROYALTYWALLET);
        setRoyaltyWalletAmount(Number(res1) / 1000000000000000000);
        const res2 = await web3.eth.getBalance(TREASURYWALLET);
        setTreasuryWalletAmount(parseInt(res2) / 1000000000000000000);
      }
    };
    getExtraWallet();
    setTimeout(() => setYamRepeater(prevState => prevState + 1), 10000);
  }, [yamRepeater]);

  return (
    <Container className={classes.dashContainerStyle}>
      <Grid container spacing={6}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={6}>

          {/* <Grid lg={4} md={6} xs={12} item>
            <Box className={classes.calcBoxStyle}>
              <Grid item sx={{mb:3,}}>
                <Typography className={classes.subTitleStyle}>Current Price </Typography>
                <Typography className={classes.subContentStyle}> $ {Number(sugarPrice).toFixed(6)}</Typography>
              </Grid>
              <Grid item sx={{mb:3,}}>
                <Typography className={classes.subTitleStyle}>Marketcap </Typography>
                <Typography className={classes.subContentStyle}> $ {Number(marketCap)}</Typography>
              </Grid>
              <Grid item sx={{mb:3,}}>
                <Typography className={classes.subTitleStyle}>Circulating Supply </Typography>
                <Typography className={classes.subContentStyle}> {numberWithCommas(totalSupply)}</Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid lg={4} md={6} xs={12} item>  
            <Box className={classes.calcBoxStyle}>
              <Grid item sx={{mb:3,}}>
                <Typography className={classes.subTitleStyle}>Burned Supply </Typography>
                <Typography className={classes.subContentStyle}> $ {numberWithCommas(burntAmount)}</Typography>
              </Grid>

              <Grid item sx={{mb:3,}}>
                <Typography  className={classes.subTitleStyle}>Burned Value </Typography>
                <Typography  className={classes.subContentStyle}> $ {numberWithCommas(Number(burntAmount) * Number(sugarPrice))}</Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid lg={4} md={6} xs={12} item>  
            <Box className={classes.calcBoxStyle}>
              <Grid item sx={{mb:3,}}>
                <Typography className={classes.subTitleStyle}>Holders </Typography>
                <Typography  className={classes.subContentStyle}> {numberWithCommas(tokenHolders)}</Typography>
              </Grid>

              <Grid item>
                <Typography className={classes.subTitleStyle}>Diamond Hands Who Never Sold </Typography>
                <Typography  className={classes.subContentStyle}> {numberWithCommas(648320)}</Typography>
              </Grid>
            </Box>
          </Grid> */}
          <Grid lg={8} md={12} xs={12} item>
            <Grid item>
              <Box className={classes.dashImageStyle}>
                <Box sx={{background:'rgba(24, 26, 32, 0.7)', borderRadius:'10px', height:'100%'}}>
                  <Typography sx={{pl:5, pt:5, fontSize:'25px',fontWeight:'bold',}}>Access trusted and reliable DeFi opportunities</Typography>
                  <Typography variant='h5' sx={{pl:5, pt:1, fontWeight:'bold',}}>- Only with CITI</Typography>
                  <Typography className={classes.subTitleStyle} sx={{pl:5, pt:1, fontWeight:'bold',}}>t.me/CitizensOfficial</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid container lg={12} spacing={6} className={classes.boxlinkStyle}>
              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle}>Current Price </Typography>
                  <Typography className={classes.subContentStyle} sx={{color:'#B353FF'}}> $ {Number(sugarPrice).toFixed(6)}</Typography>
              </Grid>

              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle}>Circulating Supply </Typography>
                  <Typography className={classes.subContentStyle} sx={{color:'#B353FF'}}> {numberWithCommas(totalSupply)}</Typography>
              </Grid>

              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle}>MarketCap </Typography>
                  <Typography className={classes.subContentStyle} sx={{color:'#B353FF'}}> $8,648,320</Typography>
              </Grid>

              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle} sx={{color:'#53FEA2'}}>Burned supply </Typography>
                  <Stack className={classes.detialRowStyle}>
                    <Typography className={classes.subContentStyle}> $100,100</Typography>
                    <Typography className={classes.subContentStyle} sx={{color:'#53CBFF'}}>&nbsp;($132,000)</Typography>
                  </Stack>
              </Grid>
            </Grid>

            <Grid container lg={12} spacing={6} className={classes.boxlinkStyle}>
              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle} sx={{color:'#53FEA2'}}>CITI Balance </Typography>
                  <Stack className={classes.detialRowStyle}>
                      <Typography className={classes.subContentStyle}>800,000</Typography>
                      <Typography className={classes.subContentStyle} sx={{color:'#53CBFF'}}>&nbsp;($7550.90)</Typography>
                  </Stack>
              </Grid>

              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle} sx={{color:'#53FEA2'}}>Daily Sell Limit - CITI </Typography>
                  <Stack className={classes.detialRowStyle}>
                      <Typography className={classes.subContentStyle}>20,000</Typography>
                      <Typography className={classes.subContentStyle} sx={{color:'#53CBFF'}}>&nbsp;($250.90)</Typography>
                  </Stack>
              </Grid>

              <Grid lg={3} md={3} xs={3}>
                  <Typography className={classes.subTitleStyle} sx={{color:'#53FEA2'}}>Daily Transfer Limit </Typography>
                  <Stack className={classes.detialRowStyle}>
                      <Typography className={classes.subContentStyle}>20,000</Typography>
                      <Typography className={classes.subContentStyle} sx={{color:'#53CBFF'}}>&nbsp;($250.90)</Typography>
                  </Stack>
              </Grid>

              <Grid lg={3} md={3} xs={3}>
              </Grid>
            </Grid>
            
            <Grid container lg={12}className={classes.boxlinkStyle}>
              <Grid item lg={12} md={12} xs={12}>
                  <Typography className={classes.subContentStyle}>Check Your Reflections</Typography>
              </Grid>
              <Grid item lg={9} md={8} xs={8}>
                  <TextField
                  className={classes.customInput}
                  placeholder={'Input Wallet Address'}
                  // value={addressInputValue}
                  />
              </Grid>
              <Grid item lg={3} md={4} xs={4}>
                  <Button className={classes.customButtonStyle}>Enter Wallet</Button>
              </Grid>
              <Stack className={classes.detialRowStyle}>
                  <Typography className={classes.subContentStyle}>CITI Eearned</Typography>
                  <Typography className={classes.subContentStyle} sx={{color:'#53CBFF',}}>&nbsp;6,000</Typography>
                  <Typography className={classes.subContentStyle} sx={{color:'#53CBFF'}}>&nbsp;($256)</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Grid lg={4} md={12} xs={12} item>  
            <iframe width="400" height="650" className={classes.swapBoxStyle} src="https://www.flooz.trade/embedded/0x59eb96f0b6f5838021f0e8f412afe65d1bf44a02/?backgroundColor=transparent" title="Flooz Trade" frameBorder="0" allow="clipboard-read; clipboard-write; web-share; accelerometer *; autoplay *; camera *; gyroscope *; payment *"> </iframe>
          </Grid>
        </Grid>
      </Grid>

      <Grid container lg={12} spacing={6} className={classes.boxlinkStyleBottom}>
        <Grid lg={2} md={6} xs={12} className={classes.networkIconStyle}>
          <Image alt="coingecko" src={CITI} width={'40px'} height={'40px'}/>
          <Link href='https://www.coingecko.com/' passHref>
            <Typography className={classes.subTitleStyle} >CoinGecko</Typography>
          </Link>
        </Grid>
        <Grid lg={2} md={6} xs={12} className={classes.networkIconStyle}>
          <Image alt="coingecko" src={COINGECKO} width={'40px'} height={'40px'}/>
          <Link href='https://www.coingecko.com/' passHref>
            <Typography className={classes.subTitleStyle} >CoinGecko</Typography>
          </Link>
        </Grid>

        <Grid lg={2} md={6} xs={12} className={classes.networkIconStyle}>
          <Image alt="bsc" src={BCSSCAN} width={'40px'} height={'40px'}/>
          <Link href='https://bscscan.com/' passHref>
            <Typography className={classes.subTitleStyle} >BSCScan</Typography>
          </Link>
        </Grid>

        <Grid lg={2} md={6} xs={12} className={classes.networkIconStyle}>
          <Image alt="cmc" src={COINMARKETCAP} height={'40px'}  width={'40px'} layout={'fixed'}/> 
          <Link href='https://coinmarketcap.com/' passHref>
            <Typography className={classes.subTitleStyle} >CoinMarketCap</Typography>
          </Link>
        </Grid>

        <Grid lg={2} md={6} xs={12} className={classes.networkIconStyle}>
          <Image alt="cmc" src={DEXTOOLS} width={'40px'} height={'40px'} /> 
          <Link href='https://www.dextools.io/' passHref>
            <Typography className={classes.subTitleStyle} >Dextools</Typography>
          </Link>
        </Grid>

        <Grid lg={2} md={6} xs={12} className={classes.networkIconStyle}>
          <Image alt="cmc" src={POOCOIN} width={'40px'} height={'40px'}/>   
          <Link href='https://poocoin.app/' passHref>
            <Typography className={classes.subTitleStyle} >Poocoin</Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>

    </Container>
  );
};

export default Home;
