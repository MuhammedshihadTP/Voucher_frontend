import { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VoucherSettingsModal from './VoucherSettingsModal';
import { downloadPDF, generateQRCode, getVouchers } from '../service/voucherService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = () => {
    const navigate=useNavigate()
  const [vouchers, setVouchers] = useState([]);
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);


  const fetchVouchers = async () => {
    try {
      const data = await getVouchers();
      setVouchers(data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  const handleGenerateQRCode = async () => {
    try {
      const qrCodeUrl = await generateQRCode();
      setQrCodeImage(qrCodeUrl);
      fetchVouchers();
      toast.success('QR Code generated successfully!');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Error generating QR code');
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleDownloadPDF = (voucherCode) => {
    downloadPDF(voucherCode);
  };
  useEffect(() => {
    fetchVouchers();
  }, []);

 



  const handleOpenSettings = () => {
    setOpenSettingsModal(true);
  };

  const handleCloseSettings = () => {
    setOpenSettingsModal(false);
  };

  const handleLogout = () => {
   
    localStorage.removeItem('token'); 
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#1565c0',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Avatar alt="Admin User" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>

     
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button selected>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={handleOpenSettings}>
              <ListItemText primary="Settings" />
            </ListItem>
        
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        {/* QR Code Generation Section */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            bgcolor: 'white',
            borderRadius: 2,
            textAlign: 'center',
            boxShadow: 2,
            mt:4
          }}
        >
          <Typography variant="h5" gutterBottom>
            Generate a New QR Code
          </Typography>
          <Button
            variant="contained"
            onClick={handleGenerateQRCode}
            sx={{
              mt: 2,
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Generate QR Code
          </Button>
          {qrCodeImage && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Generated QR Code:
              </Typography>
              <img
                src={qrCodeImage}
                alt="QR Code"
                style={{ marginTop: '10px', width: '200px', height: '200px' }}
              />
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h5" gutterBottom>
          Existing Vouchers
        </Typography>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table aria-label="voucher table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Voucher Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Generated Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Expiry Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Download PDF</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers?.length > 0 ? (
                vouchers.map((voucher) => (
                  <TableRow key={voucher?.voucherCode}>
                    <TableCell>{voucher?.voucherCode}</TableCell>
                    <TableCell>{new Date(voucher.generatedDate).toLocaleString()}</TableCell>
                    <TableCell>{new Date(voucher.expiryDate).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDownloadPDF(voucher?.voucherCode)}
                        color="primary"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                    
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No vouchers available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      
      <ToastContainer />
      <VoucherSettingsModal open={openSettingsModal} handleClose={handleCloseSettings} />
    </Box>
  );
};

export default Dashboard;
