import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Box,
  Paper,
  Container,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from '../translations/TranslationContext';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink
    },
  },
});

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/announcements`, {
          params: { page, perPage },
        });
        setAnnouncements(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };
    fetchAnnouncements();
  }, [page, perPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            {t('homePageTitle')}
          </Typography>
          <Grid container spacing={3}>
            {announcements.map((announcement: any) => (
              <Grid item xs={12} key={announcement._id}>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="secondary">
                          {announcement.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" color="textSecondary">
                          {announcement.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(total / perPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;