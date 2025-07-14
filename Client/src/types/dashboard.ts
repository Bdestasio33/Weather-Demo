export type WidgetType = 
  | 'current-weather'
  | 'weather-forecast'
  | 'weather-alerts'
  | 'temperature-chart'
  | 'humidity-meter'
  | 'wind-compass'
  | 'uv-index'
  | 'air-pressure'
  | 'visibility'
  | 'sunrise-sunset';

export type WidgetSize = 'sm' | 'md' | 'lg' | 'xl';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  icon: string;
  size: WidgetSize;
  minSize: WidgetSize;
  maxSize: WidgetSize;
  defaultProps?: Record<string, any>;
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  props?: Record<string, any>;
  isVisible: boolean;
  lastUpdated: string;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

export interface DashboardState {
  currentLayout: DashboardLayout;
  availableWidgets: WidgetConfig[];
  savedLayouts: DashboardLayout[];
  sidebarOpen: boolean;
}

export interface DragItem {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  isNew?: boolean;
}

export interface DropResult {
  position: {
    x: number;
    y: number;
  };
  targetArea: 'dashboard' | 'sidebar' | 'trash';
} 