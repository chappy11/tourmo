import React from "react";
import { RefreshControl } from 'react-native'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Refresh = () => {
    const [refreshing, setrefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setrefreshing(true);
    wait(2000).then(() => setrefreshing(false));
  }, []);
    return (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
    )
}

export default Refresh