// import React, {createContext} from 'react'

// export default createContext({

//     token:null,
//     userId:null,
//     login:(token , userId , tokenExpiration) => {},
//     logout:()=>{}
// })

import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});