"use client";

import { useSyncExternalStore } from "react";
import { getConsent, isConsentSettingsOpen, subscribeConsent } from "@/lib/consent";

/**
 * Izbor posetioca. `undefined` na serveru i pre hidracije: tada se ne zna da li je
 * posetilac već birao, pa se baner ne prikazuje (da ne bi bljesnuo onima koji jesu).
 */
export const useConsent = () => useSyncExternalStore(subscribeConsent, getConsent, () => undefined);

export const useConsentSettingsOpen = () => useSyncExternalStore(subscribeConsent, isConsentSettingsOpen, () => false);
