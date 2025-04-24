import { AppProps } from 'next/app';
import { AuthProvider } from '../src/utils/auth';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../components/design-system/Theme';
import ChatWidget from '../components/ChatWidget';
import AlertBanner from '../components/AlertBanner';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertBanner />
        <ChatWidget />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}