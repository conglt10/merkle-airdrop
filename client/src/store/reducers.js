import * as connect from './actions';

const initialState = {
  web3: null,
  walletAddress: null,
  loading: false,
  instanceAirdropContract: null,
  instancePhoneToken: null,
  tranche: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case connect.SET_WEB3:
      return {
        ...state,
        web3: action.web3,
      };
    case connect.SET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    case connect.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case connect.SET_AIRDROP_INSTANCE:
      return {
        ...state,
        instanceAirdropContract: action.instanceAirdropContract,
      };
    case connect.SET_PHONE_INSTANCE:
      return {
        ...state,
        instancePhoneToken: action.instancePhoneToken,
      };
    case connect.SET_TRANCHE:
      return {
        ...state,
        tranche: action.tranche,
      };
    default:
      return state;
  }
};

export default rootReducer;
