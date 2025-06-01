import { Box, Container, Typography } from "@mui/material";
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
      <Typography variant="h4" gutterBottom>
        Traffic Dashboard
      </Typography>

      <Box mb={4}>
        <AddEntryForm onAdd={addEntry} canEdit={isEditor} />
      </Box>

      <Box mb={4}>
        <TrafficChart trafficStats={trafficStats} />
      </Box>

      <Box>
        <TrafficTable
          trafficStats={trafficStats}
          onUpdate={updateEntry}
          onDelete={deleteEntry}
          canEdit={isEditor}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
