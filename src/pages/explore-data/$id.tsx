import { createFileRoute } from '@tanstack/react-router';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { PageHeader } from '../../components/PageHeader';
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
      <PageHeader
        // CUSTOMIZE: page header field
        pageTitle={data ? `${data.firstName} ${data.lastName}` : ''}
        // CUSTOMIZE: breadcrumb title text
        breadcrumbTitle="User Detail"
        sx={{
          marginBottom: 1,
          padding: 2,
        }}
      />
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
