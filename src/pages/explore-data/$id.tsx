import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { useDetailQuery } from '../../hooks/useDetailQuery';

export const Route = createFileRoute('/explore-data/$id')({
  component: DataDetailPage,
});

/**
 * Detail view for a selected row from the` <DataExplorer>` in the explore-data Task Flow.
 */
function DataDetailPage() {
  const { id } = Route.useParams();

  // Define query for this page and fetch data item
  const { data } = useDetailQuery({
    // CUSTOMIZE: detail data source
    dataSource: `data/getUser${id}.json`,
    // CUSTOMIZE: detail data unique ID field
    dataIdField: 'id',
    paramId: id,
    // CUSTOMIZE: query mode, 'client' or 'server'
    queryMode: 'client',
    staticParams: null,
  });

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          marginBottom: 1,
          padding: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link to="/explore-data">
            <IconButton
              aria-label="back to users list"
              sx={{
                color: 'primary.main',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Stack spacing={1} flex={1}>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink
                component={Link}
                to="/"
                underline="hover"
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon />
              </MuiLink>
              <MuiLink
                component={Link}
                to="/explore-data"
                underline="hover"
                color="inherit"
              >
                User Management
              </MuiLink>
              <Typography color="text.primary">User Details</Typography>
            </Breadcrumbs>
            <Typography variant="h4" component="h1">
              {data ? `${data.firstName} ${data.lastName}` : ''}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
      <Container maxWidth="xl">
        <Stack>
          {/* CUSTOMIZE: detail page content */}
          <Paper
            sx={{
              padding: 2,
            }}
          >
            <Stack spacing={2}>
              <Stack>
                <Typography fontWeight="bold">First Name</Typography>
                <Typography>{data && data.firstName}</Typography>
              </Stack>
              <Stack>
                <Typography fontWeight="bold">Last Name</Typography>
                <Typography>{data && data.lastName}</Typography>
              </Stack>
              <Stack>
                <Typography fontWeight="bold">Email Address</Typography>
                <Typography>{data && data.emailAddr}</Typography>
              </Stack>
              <Stack>
                <Typography fontWeight="bold">Roles</Typography>
                <Typography>
                  {data && Array.isArray(data.roleNames)
                    ? data.roleNames.join(', ')
                    : data?.roleNames}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
