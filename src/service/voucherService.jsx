import axiosInstance from './axiosInstance';

export const getSettings = async () => {
  const response = await axiosInstance.get('/settings');
  return response.data.data;
};

export const updateSettings = async (settings) => {
  const response = await axiosInstance.put('/settings', settings);
  return response.data;
};

export const getVouchers = async () => {
  const response = await axiosInstance.get('/voucher');
  return response.data.data;
};

export const generateQRCode = async () => {
  const response = await axiosInstance.post('/voucher/generate');
  return response.data.data.qrCodeUrl;
};

export const downloadPDF = async (voucherCode) => {
    try {
      const token = localStorage.getItem('token'); 
      const url = `${axiosInstance.defaults.baseURL}/voucher/${voucherCode}/pdf`;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axiosInstance.get(url, { headers, responseType: 'blob' });
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', `${voucherCode}_voucher.pdf`); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
