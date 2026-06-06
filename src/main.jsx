import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  CheckCircle,
  Compass,
  Cpu,
  createIcons,
  Globe,
  Globe2,
  Info,
  Loader,
  LogOut,
  Menu,
  Play,
  Settings,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide";
import App from "./App.jsx";
import "./styles.css";

const icons = {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  CheckCircle,
  Compass,
  Cpu,
  Globe,
  Globe2,
  Info,
  Loader,
  LogOut,
  Menu,
  Play,
  Settings,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  X,
  Zap,
};

window.lucide = {
  createIcons: () => createIcons({ icons }),
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
