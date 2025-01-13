import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { getSettings, updateSettings } from '../service/voucherService';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const VoucherSettingsModal = ({ open, handleClose }) => {

  const [settings, setSettings] = useState({})

  useEffect(() => {
    if (open) {
      const fetchSettings = async () => {
        try {
          const data = await getSettings();
          setSettings(data);
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      };

      fetchSettings();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dimensions')) {
      const dimensionName = name.split('.')[1];
      setSettings((prevSettings) => ({
        ...prevSettings,
        dimensions: {
          ...prevSettings.dimensions,
          [dimensionName]: value,
        },
      }));
    } else if (name.includes('fontSizes')) {
      const fontSizeName = name.split('.')[1];
      setSettings((prevSettings) => ({
        ...prevSettings,
        fontSizes: {
          ...prevSettings.fontSizes,
          [fontSizeName]: value,
        },
      }));
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings(settings);
      toast.success('Settings updated successfully');
      handleClose();  
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ padding: 3, width: 400, margin: 'auto', backgroundColor: 'white', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Update Voucher Settings
        </Typography>

        <TextField
          label="Voucher Title"
          variant="outlined"
          fullWidth
          value={settings?.title}
          name="title"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Width (mm)"
          variant="outlined"
          fullWidth
          value={settings?.dimensions?.width}
          name="dimensions.width"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Height (mm)"
          variant="outlined"
          fullWidth
          value={settings?.dimensions?.height}
          name="dimensions.height"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Title Font Size"
          variant="outlined"
          fullWidth
          value={settings?.fontSizes?.title}
          name="fontSizes.title"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Text Font Size"
          variant="outlined"
          fullWidth
          value={settings?.fontSizes?.text}
          name="fontSizes.text"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Max Expiry Days"
          variant="outlined"
          fullWidth
          value={settings?.maxExpiryDays}
          name="maxExpiryDays"
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>
    </Modal>
  );
};

export default VoucherSettingsModal;
