import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LabelValueTable } from '../../../components/LabelValueTable';
import { AppLink } from '../../../components/AppLink';

interface PreviewPanelProps {
  /**
   * Data for the selected row from the main table
   */
  previewItem: any;
  /**
   * Function to handle hiding
   */
  onClose: () => void;
}

/**
 * Panel to show extra information about a row in a separate panel
 * next to the `<DataTablePanel>`.
 */
export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  previewItem,
  onClose,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        padding: 2,
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Stack direction="row">
            <Typography variant="h6" component="h3" flex={1}>
              <AppLink to="/explore-data/$id" params={{ id: previewItem.id }}>
                {previewItem.firstName} {previewItem.lastName}
              </AppLink>
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant="body2">{previewItem.emailAddr}</Typography>
        </Stack>
        <Box>
          <Typography fontWeight="medium" mb={1}>
            Contact Information
          </Typography>
          <LabelValueTable
            rows={[
              { label: 'First Name', value: previewItem.firstName },
              { label: 'Last Name', value: previewItem.lastName },
              { label: 'Email Address', value: previewItem.emailAddr },
            ]}
          />
        </Box>
        <Box>
          <Typography fontWeight="medium" mb={1}>
            Roles & Permissions
          </Typography>
          <LabelValueTable
            rows={[
              {
                label: 'Roles',
                value: Array.isArray(previewItem.roleNames)
                  ? previewItem.roleNames.join(', ')
                  : previewItem.roleNames,
              },
            ]}
          />
        </Box>
        <Stack direction="row" spacing={1}>
          <AppLink to="/explore-data/$id" params={{ id: previewItem.id }}>
            <Button variant="contained">View details</Button>
          </AppLink>
          <Button variant="outlined">Export data</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
