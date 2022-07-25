import * as React from 'react';
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Stack} from '@mui/material';
import { makeStyles } from "@mui/styles";
import {useYam} from "../hooks";
import { GlobalContext, Web3ModalContext } from '../contexts';
const useStyles = makeStyles(() => ({
  customBoxStyle: {
    // backgroundColor: 'rgba(47, 19, 74, 0.25)',
    backgroundColor:'gray',

    padding:'2%',
    borderRadius: '10px',
  },

  customButtonStyle: {
    color:'white',
    borderRadius: '10px',
    background:'#471D67',
    borderColor:'#AB6FE9',
    borderWidth:'1px',
    borderStyle:'solid',
    width:'50%',
    fontSize:'12px',
  },

  titleStyle: {
    fontSize:'30px',
    lineHeight:'40px',    
  },

  subtitleStyle: {
    fontSize:'20px',
  },

  subContentStyle: {
    fontSize:'20px',
  },

  subDescriptionStyle: {
    fontSize:'12px',
  },

  mynftContainerStyle: {
    marginTop:'200px',
    marginLeft:'5%',
  },

  myNftContentStyle: {
    borderRadius:'5px',
  },

  customBadge: {
    position:"absolute",
    marginBottom:'260px',
    textDecoration:'underline',
    marginLeft:"160px",
    color:'gray',
    fontWeight:'bold',
    fontSize:'18px',
    width:'30px',
    height:'30px',
    borderRadius:'15px',
    textAlign:'center',
    paddingTop:'5px',
  }
}));

const Mynfts: NextPage = () => {
  const classes = useStyles();
  const globalContext = useContext(GlobalContext);
  const { account } = useContext(Web3ModalContext);
  const [diamondCounts,setDiamondCounts] = useState<number[]>([]);
  // const sugarPrice = globalContext.sugarPrice == null ? 0 : globalContext.sugarPrice;
  const yamClient = useYam();

  useEffect(() => {
    const getMyNFTs = async () => {
      try {
        if(yamClient != undefined) {
          const nftCount: number[] = new Array(6).fill(0);
          for(let i = 0; i < 6; i++){
            const temp = await yamClient.contracts.contractsMap['SugarOldNFT'].methods.balanceOf(account, i+1).call();
            nftCount[i] = temp;
          }
          setDiamondCounts(nftCount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyNFTs();
  }, [yamClient]);

  return (
    <Container className={classes.mynftContainerStyle}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
        <Box className={classes.customBoxStyle}>
          <Grid container xs={12}>
              <Grid item xs={12}>
                  <Grid item sx={{mb:6}}>
                      <Typography className={classes.titleStyle} variant="subtitle2" >Diamond NFTs</Typography>
                  </Grid>
              </Grid>

            <Grid container xs={12}>
              {
                (new Array(6).fill(0)).map((_, index) => {
                  return (
                    <>
                      { diamondCounts[index] == 0 ? (
                        <></>
                      ) : (
                        <>
                          <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
                            <Stack direction="column" justifyContent='center' alignItems='center'>
                              <Typography className={classes.customBadge}>{diamondCounts[index]}</Typography>
                              <Box 
                                component="img"
                                src={`/images/util/ez${index + 1}.gif`}                        
                                sx={{
                                  height: 250,
                                  width: 200,
                                  borderRadius: 3,
                                  marginBottom:5,
                                  boxShadow: '0px 0px 4px 4px lightgray',
                                }} 
                              ></Box>
                            </Stack>
                          </Grid>                                
                        </>
                      )}
                    </>
                  )
                })
              }
            </Grid>
        </Grid>
        </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mynfts;
