import { useState, useEffect } from "react";
import DragDropDashboard from "../components/DragDropDashboard";
import LocationDialog from "../components/LocationDialog";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const { preferences, isLoaded } = useUser();
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Check if location is properly set
      const hasLocation =
        preferences.locationOverride?.enabled &&
        preferences.locationOverride.city &&
        preferences.locationOverride.state;

      if (!hasLocation) {
        setLocationDialogOpen(true);
        toast.info("Please set your location to get weather data", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, [isLoaded, preferences.locationOverride]);

  return (
    <div data-testid="dashboard-page">
      <DragDropDashboard />
      <LocationDialog
        open={locationDialogOpen}
        onClose={() => setLocationDialogOpen(false)}
        required={!preferences.locationOverride?.enabled}
      />
    </div>
  );
}
