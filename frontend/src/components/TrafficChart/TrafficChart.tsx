import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import { TrafficStat } from "../../interfaces/TrafficStat.interface";
import { aggregateVisits, groupBy } from "../../utils/aggregateStats";
import { ViewMode } from "../types/view-mode";
import { formatDate } from "../../utils/dateHelpers";

const TrafficChart = ({ trafficStats }: { trafficStats: TrafficStat[] }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");

  const chartData = useMemo(() => {
    if (viewMode === "daily") {
      return trafficStats.map((stat) => ({
        date: stat.date,
        visits: stat.visits,
      }));
    }

    if (viewMode === "weekly") {
      const grouped = groupBy(trafficStats, (stat) => {
        const d = formatDate(stat.date);
        const weekStart = new Date(d);
        weekStart.setDate(d.getDate() - d.getDay());
        return weekStart.toISOString().split("T")[0];
      });
      return aggregateVisits(grouped);
    }

    if (viewMode === "monthly") {
      const grouped = groupBy(trafficStats, (stat) => stat.date.slice(0, 7));
      return aggregateVisits(grouped);
    }

    return [];
  }, [trafficStats, viewMode]);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null
  ) => {
    if (newView !== null) setViewMode(newView);
  };

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">תנועת מבקרים</Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleChange}
            size="small"
            color="primary"
          >
            <ToggleButton value="daily">יומי</ToggleButton>
            <ToggleButton value="weekly">שבועי</ToggleButton>
            <ToggleButton value="monthly">חודשי</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const d = new Date(date);
                return viewMode === "daily"
                  ? `${d.getMonth() + 1}-${d.getDate()}`
                  : viewMode === "weekly"
                  ? `שבוע של ${d.getDate()}/${d.getMonth() + 1}`
                  : d.toLocaleString("he-IL", { month: "long" });
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visits" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
