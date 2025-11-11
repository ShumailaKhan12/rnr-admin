import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ContextHomeDataAPI, setContextHomeDataAPI] = useState();
  const [ContextFaqsDataAPI, setContextFaqsDataAPI] = useState();
  const [ContextMyRewardDataAPI, setContextMyRewardDataAPI] = useState();
  const [ContextInviteRefferAPI, setContextInviteRefferAPI] = useState();
  const [ContextCampEditDataAPI, setContextCampEditDataAPI] = useState();
  const [ContextToEditForm, setContextToEditForm] = useState();
  const [AuthLocal, setAuthLocal] = useState();
  const [MeterUpdateData, setMeterUpdateData] = useState();
   const [logo, setLogo] = useState(null);
  return (
    <UserContext.Provider
      value={{
        ContextHomeDataAPI,
        setContextHomeDataAPI,
        ContextMyRewardDataAPI,
        setContextMyRewardDataAPI,
        ContextFaqsDataAPI,
        setContextFaqsDataAPI,
        AuthLocal,
        setAuthLocal,
        ContextInviteRefferAPI,
        setContextInviteRefferAPI,
        MeterUpdateData,
        setMeterUpdateData,
         logo, setLogo,
         ContextToEditForm, setContextToEditForm,
         ContextCampEditDataAPI, setContextCampEditDataAPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
