"use client";

import { useState } from "react";
import {
  useGetTopCarpentersByCuttingsQuery,
  useGetOneTimeProductsCountQuery,
  useGetSubscriptionsCountQuery,
  useGetTotalBetweenDatesQuery,
  useGetTopCarpentersByPaidPaymentsQuery,
  useGetTopCarpentersByAmountQuery,
  useGetActiveSubscriptionsCountQuery,
  useGetSubscriptionsByPlanQuery,
} from "@/app/services/analyticsApi";
import StatCard from "./StatCard";
import TopCarpentersTable from "./TopCarpentersTable";
import SectionCard from "./SectionCard";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import {
  FaHammer,
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaDollarSign,
  FaRegCreditCard,
  FaSyncAlt,
  FaChartPie,
} from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";

const PLAN_COLORS: Record<string, string> = {
  BASIC: "bg-gray-200 text-gray-700",
  PRO: "bg-purple-200 text-purple-800",
  ENTERPRISE: "bg-amber-200 text-amber-800",
};

export default function AdminAnalytics() {
  const today = new Date().toISOString().split("T")[0];
  const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(firstOfMonth);
  const [endDate, setEndDate] = useState(today);
  const [activeDateFilter, setActiveDateFilter] = useState({
    startDate: firstOfMonth,
    endDate: today,
  });

  const { data: oneTime = 0, isFetching: oneTimeLoading } =
    useGetOneTimeProductsCountQuery();
  const { data: subsPaid = 0, isFetching: subsPaidLoading } =
    useGetSubscriptionsCountQuery();
  const { data: activeSubscriptions = 0, isFetching: activeSubsLoading } =
    useGetActiveSubscriptionsCountQuery();
  const { data: totalAmount = 0, isFetching: totalLoading } =
    useGetTotalBetweenDatesQuery({
      startDate: activeDateFilter.startDate,
      endDate: activeDateFilter.endDate,
    });
  const { data: planData = [], isFetching: plansLoading } =
    useGetSubscriptionsByPlanQuery();
  const { data: topByCuttings = [], isFetching: cuttingsLoading } =
    useGetTopCarpentersByCuttingsQuery({ limit: 5 });
  const { data: topByPayments = [], isFetching: paymentsLoading } =
    useGetTopCarpentersByPaidPaymentsQuery({ limit: 5 });
  const { data: topByAmount = [], isFetching: amountLoading } =
    useGetTopCarpentersByAmountQuery({ limit: 5 });

  const handleApplyFilter = () => {
    setActiveDateFilter({ startDate, endDate });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── KPI Cards ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Productos pagados"
          value={oneTime}
          icon={<FaRegCreditCard />}
          subtitle="pagos únicos"
          loading={oneTimeLoading}
          colorClass="text-purple-700"
          bgClass="bg-purple-50"
        />
        <StatCard
          title="Suscripciones pagadas"
          value={subsPaid}
          icon={<FaSyncAlt />}
          subtitle="pagos recurrentes"
          loading={subsPaidLoading}
          colorClass="text-indigo-700"
          bgClass="bg-indigo-50"
        />
        <StatCard
          title="Suscripciones activas"
          value={activeSubscriptions}
          icon={<MdCardMembership />}
          subtitle="en este momento"
          loading={activeSubsLoading}
          colorClass="text-violet-700"
          bgClass="bg-violet-50"
        />
        <StatCard
          title="Total recaudado"
          value={`$${totalAmount.toLocaleString()}`}
          icon={<FaDollarSign />}
          subtitle={`${activeDateFilter.startDate} → ${activeDateFilter.endDate}`}
          loading={totalLoading}
          colorClass="text-emerald-700"
          bgClass="bg-emerald-50"
        />
      </div>

      {/* ── Filtro de fechas para total ───────────────────────────────────────── */}
      <SectionCard title="Total recaudado por período" icon={<FaDollarSign />}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              label="Desde"
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label="Hasta"
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              label="Aplicar"
              icon={<FaSearch className="text-sm" />}
              onClick={handleApplyFilter}
              disabled={totalLoading}
            />
          </div>
        </div>
        {!totalLoading && (
          <div className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <FaDollarSign className="text-3xl text-emerald-600" />
            <div>
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
                Total recaudado
              </p>
              <p className="text-3xl font-bold text-emerald-700">
                ${totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── Suscripciones por plan ────────────────────────────────────────────── */}
      <SectionCard title="Suscripciones por plan" icon={<FaChartPie />}>
        {plansLoading ? (
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 flex-1 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : planData.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-gray-400 gap-2">
            <FaBoxOpen className="text-3xl" />
            <p className="text-sm italic">Sin datos de suscripciones</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {planData.map((plan) => (
              <div
                key={plan.plan}
                className={`flex flex-col items-center justify-center rounded-xl px-6 py-4 min-w-[120px] font-semibold ${
                  PLAN_COLORS[plan.plan] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                <span className="text-2xl font-bold">{plan.count}</span>
                <span className="text-xs uppercase tracking-widest mt-1">
                  {plan.plan}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* ── Top carpinteros ───────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6">
        <SectionCard title="Top 5 por cortes" icon={<FaHammer />}>
          <TopCarpentersTable
            data={topByCuttings}
            loading={cuttingsLoading}
            mode="cuttings"
          />
        </SectionCard>

        <SectionCard title="Top 5 por pagos" icon={<FaRegCreditCard />}>
          <TopCarpentersTable
            data={topByPayments}
            loading={paymentsLoading}
            mode="payments"
          />
        </SectionCard>

        <SectionCard title="Top 5 por monto" icon={<FaDollarSign />}>
          <TopCarpentersTable
            data={topByAmount}
            loading={amountLoading}
            mode="amount"
          />
        </SectionCard>
      </div>
    </div>
  );
}