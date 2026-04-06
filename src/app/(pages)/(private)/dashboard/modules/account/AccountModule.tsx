"use client";

import { useState } from "react";
import AccountHeader from "./components/AccountHeader";
import AccountTabs from "./components/AccountTabs";
import ProfileSection from "./components/ProfileSection";
import WorkshopSection from "./components/WorkshopSection";
import SecuritySection from "./components/SecuritySection";

export default function AccountModule() {

  const [tab, setTab] = useState<
    "profile" | "workshop" | "security"
  >("profile");

  return (
    <div className="space-y-6 p-4">

      <AccountHeader />

      <AccountTabs tab={tab} setTab={setTab} />

      {tab === "profile" && <ProfileSection />}
      {tab === "workshop" && <WorkshopSection />}
      {tab === "security" && <SecuritySection />}

    </div>
  );
}