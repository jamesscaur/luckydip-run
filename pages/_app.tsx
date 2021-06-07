import type { AppProps } from "next/app";

import "../styles/global.css";

import { createClient } from '@supabase/supabase-js'
import { Provider } from 'react-supabase'

const client = createClient('https://vhnxbqmgswljzegzzldn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjkxMDgwMSwiZXhwIjoxOTM4NDg2ODAxfQ.Zd-vP2FM6VZd4XUd71h0-2kVt7ATz2ADlykt5dgt_qw')

const App = ({ Component, pageProps }: AppProps) => {
  return <Provider value={client}>
    <Component {...pageProps} />
  </Provider>
};

export default App;
