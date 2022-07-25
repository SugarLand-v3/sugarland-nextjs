import * as React from 'react';
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box, TextField } from '@mui/material';
import { GlobalContext, Web3ModalContext } from '../contexts';
import { makeStyles } from "@mui/styles";
import { useReflection } from '../hooks';
import { useYam } from '../hooks';
import { stringHelper } from '../helpers';
import Image from 'next/image';

import MockAvatar from '../public/images/citizen/MockAvatar.jpg';


const useStyles = makeStyles(() => ({

  customButtonStyle: {
    color:'white',
    borderRadius: '10px',
    background: 'linear-gradient(to bottom, #AB6FE9, #9E2EF6)',
    borderColor:'#AB6FE9',
    borderWidth:'1px',
    borderStyle:'solid',
    width:'50%',
    fontSize:'12px',
    height:'auto',
  },
  titleStyle: {
    fontSize:'30px',
    lineHeight:'40px',
    wordWrap:'break-word',
  },
  subtitleStyle: {
    fontSize:'15px',
    wordWrap:'break-word',
  },
  subContentStyle: {
    fontSize:'20px',
    wordWrap:'break-word',
  },
  subDescriptionStyle: {
    fontSize:'12px',
    wordWrap:'break-word',
  },
  rewardContainerStyle: {
    marginLeft:'5%',
    marginTop:'150px', 
    wordWrap:'break-word',
  },
  imageBoxStyle: {
    backgroundColor:'black',
    width:'180px',
    marginTop:'50px',
    borderRadius:'10px',
    padding:'15px',
  },
  nftImageStyle: {
    botherRadius:'20px',
    margin:'30px',
    padding:'10px',
  },
  nextBorderBox:{
    borderRadius: '10px',
    overflow: 'hidden',
    width:'150px',
    height:'180px',
  }
}));

const Reward: NextPage = () => {
  const { numberWithCommas } = stringHelper;
  const { account } = useContext(Web3ModalContext);
  const  {fetchReflection} = useReflection(account);  
  const [addressInputValue, setAddressInputValue] = useState<any>();
  const [reflectionAmount, setReflectionAmount] = useState<any>(0);
  const [reflectionValue, setReflectionValue] = useState<any>(0);
  const [rewardAmount, setRewardAmount] = useState<any>(0);
  const [rewardValue, setRewardValue] = useState<number>(0);
  const [claimButtonStatus, setClaimButtonStatus] = useState<boolean>(false);
  const yamClient = useYam();

    useEffect(() => {
      const ClaimInit = async () => {
        try {
          if(yamClient != undefined) {
              const temp = await yamClient.contracts.contractsMap['REWARD'].methods.g_userInfo(account).call();
              const temp1 = await yamClient.contracts.contractsMap['REWARD'].methods.getCurrentTime(account).call();
              setRewardAmount(temp[0]);
              setClaimButtonStatus(temp1);
              } 
              const sugarReflection = await fetchReflection();
              if(sugarReflection != undefined) {
              const res = sugarReflection.curPrice;
              setRewardValue(res);
          } 
        } catch (error) {
            console.log(error);
          } 
        };
        ClaimInit();
      }, [yamClient]);

  const handleReward = () => {
    async function getRewards() {
        if(yamClient != undefined) {
          const res = await yamClient.contracts.contractsMap['REWARD'].methods.claimRewards().send({from:account})
        }
      }
      getRewards();
  }

  const handleEnterWallet =() => { 
    setAddressInputValue(account);
    async function getReflection() {
      const sugarReflection = await fetchReflection();
      if(sugarReflection != undefined){
        setReflectionAmount(sugarReflection.balToken);
        setReflectionValue(sugarReflection.curPrice * sugarReflection.balToken);
      }
      return sugarReflection;
    }
     getReflection();
  }
  
  const classes = useStyles();
  return (
    <Container className={classes.rewardContainerStyle}>
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={6}>
          <Box sx={{backgroundColor: 'rgba(47, 19, 74, 0.25)', p: 5, borderRadius: 3,}}>
            <Grid item sx={{mb:8}}>
              <Typography className={classes.titleStyle} variant="subtitle2" >CHECK YOUR REFLECTIONS</Typography>
            </Grid>
            <Grid item sx={{mb:3}}>
              <TextField
              className={classes.customInput}
              placeholder={'Input Wallet Address'}
              value={addressInputValue}
              />
            </Grid>
            <Grid item sx={{mb:4}}>
              <Button className={classes.customButtonStyle} onClick={() => handleEnterWallet()}>Enter Wallet</Button>
            </Grid>
            <Grid item sx={{mb:3}}>
              <Typography className={classes.subtitleStyle} variant="subtitle2" >Reflections Amount</Typography>
              <Typography className={classes.subContentStyle}>{numberWithCommas( reflectionAmount.toFixed(0) )} SUGAR</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subtitleStyle} variant="subtitle2" >Reflections value </Typography>
              <Typography className={classes.subContentStyle}>{numberWithCommas( reflectionValue.toFixed(2) )} $</Typography>
            </Grid>
          </Box>
        </Grid> */}
        <Grid item xs={12} md={6}>
        <Box sx={{p: 5, borderRadius: 3,}}>
          <Grid>
            <Typography className={classes.titleStyle} variant="subtitle2" >My NFTs</Typography>
            <Typography className={classes.subContentStyle}>Your CITIZEN NFTs will show here</Typography>
            <Box className={classes.imageBoxStyle}>
              <Box className={classes.nextBorderBox}>
                <Image alt="MockAvatar" className="rounded-full" src={MockAvatar} width={'150px'} height={'180px'}  objectFit="cover"/>
              </Box>
              <Typography sx={{fontSize:'15px',m:3,}}>CITIZEN #011</Typography>
            </Box>
          </Grid>
        </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{backgroundColor: '#141518', p: 5, borderRadius: 3,}}>
            <Grid item sx={{mb:3,}}>
              <Typography className={classes.titleStyle} variant="subtitle2" >CHECK YOUR DIAMOND NFT REWARDS</Typography>
            </Grid>
            <Grid item sx={{mb:3,}}>
              <Typography className={classes.subtitleStyle} variant="subtitle2" >Rewards Collected </Typography>
              <Typography className={classes.subContentStyle}>{numberWithCommas(rewardAmount/1000000000)} SUGAR</Typography>
            </Grid>
            <Grid item sx={{mb:3,}}>
              <Typography className={classes.subtitleStyle} variant="subtitle2" >Rewards Value</Typography>
              <Typography className={classes.subContentStyle}>{((rewardValue * rewardAmount) / 1000000000) .toFixed(10)} $</Typography>
            </Grid>
            <Grid item sx={{mb:3,}}>
            {claimButtonStatus == false ? (
              <Button className={classes.customButtonStyle} onClick={() => handleReward()} disabled>Claim Rewards {claimButtonStatus}</Button>
            ) : (
              <Button className={classes.customButtonStyle} onClick={() => handleReward()}>Claim Rewards {claimButtonStatus}</Button>
            )}
            </Grid>
            <Grid item sx={{mb:1,}}>
              <Typography className={classes.subDescriptionStyle}>
              Claim every 24 hours.
              <br/>
              Rewards will be lost if not claimed in 30days.
              </Typography>
            </Grid>
          </Box>
        </Grid>        
      </Grid>
    </Container>
  );
};

export default Reward;
