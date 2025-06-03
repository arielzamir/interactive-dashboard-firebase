import { Box, Container, Paper, Typography } from "@mui/material";
import AddEntryForm from "../components/AddEntryForm/AddEntryForm";
import { useTrafficData } from "../hooks/useTrafficData";
import { useAuth } from "../contexts/AuthContext";
import TrafficChart from "../components/TrafficChart/TrafficChart";
import TrafficTable from "../components/TrafficTable/TrafficTable";

const Dashboard = () => {
  const {
    data: trafficStats,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useTrafficData();

  const { user } = useAuth();
  const isEditor = user?.role === "editor";

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Traffic Dashboard
      </Typography>

      {isEditor && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Add New Entry
          </Typography>
          <AddEntryForm onAdd={addEntry} canEdit={isEditor} />
        </Paper>
      )}

      {trafficStats.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Typography variant="h6" color="text.secondary">
            No traffic data available yet.
          </Typography>
          {isEditor && (
            <Typography variant="body2" color="text.secondary">
              Start by adding a new entry above.
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" mb={2}>
              Visitor Traffic Chart
            </Typography>
            <Typography variant="subtitle1" mb={2}>
              Total Visitors:{" "}
              {trafficStats.reduce((sum, stat) => sum + stat.visits, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Last updated: {trafficStats.at(-1)?.date}
            </Typography>
            <TrafficChart trafficStats={trafficStats} />
          </Paper>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Traffic Stats Table
            </Typography>
            <TrafficTable
              trafficStats={trafficStats}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
              canEdit={isEditor}
            />
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
