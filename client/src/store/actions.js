export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = web3 => async dispatch => {
  dispatch({
    type: SET_WEB3,
    web3,
  });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = walletAddress => dispatch => {
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
  });
};

export const SET_AIRDROP_INSTANCE = 'SET_AIRDROP_INSTANCE';
export const setAirdropInstance = instanceAirdropContract => async dispatch => {
  dispatch({
    type: SET_AIRDROP_INSTANCE,
    instanceAirdropContract,
  });
};

export const SET_PHONE_INSTANCE = 'SET_PHONE_INSTANCE';
export const setPhoneInstance = instancePhoneToken => async dispatch => {
  dispatch({
    type: SET_PHONE_INSTANCE,
    instancePhoneToken,
  });
};

export const SET_LOADING = 'SET_LOADING';
export const setLoading = loading => dispatch => {
  dispatch({
    type: SET_LOADING,
    loading,
  });
};

export const SET_TRANCHE = 'SET_TRANCHE';
export const setTranche = tranche => dispatch => {
  dispatch({
    type: SET_TRANCHE,
    tranche,
  });
};
