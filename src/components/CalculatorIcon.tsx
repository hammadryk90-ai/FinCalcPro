import React from "react";
import {
  Home,
  Car,
  Landmark,
  Building2,
  TrendingUp,
  PiggyBank,
  Target,
  Flame,
  Percent,
  Scale,
  BarChart3,
  Briefcase,
  CreditCard,
  Scissors,
  Wallet,
  PieChart,
  RefreshCw,
  Store,
  Repeat,
  Coins,
  Shield,
  FileSpreadsheet,
  BadgeDollarSign,
  Activity,
} from "lucide-react";
import type { CalculatorMeta } from "@/lib/calculators-registry";

const ICON_MAP = {
  Home,
  Car,
  Landmark,
  Building2,
  TrendingUp,
  PiggyBank,
  Target,
  Flame,
  Percent,
  Scale,
  BarChart3,
  Briefcase,
  CreditCard,
  Scissors,
  Wallet,
  PieChart,
  RefreshCw,
  Store,
  Repeat,
  Coins,
  Shield,
  FileSpreadsheet,
  BadgeDollarSign,
  Activity,
};

export function CalculatorIcon({
  name,
  className = "w-5 h-5",
}: {
  name: CalculatorMeta["iconName"];
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} />;
}
