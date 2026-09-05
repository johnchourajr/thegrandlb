"use client";

import { setExperimentArm } from "@/utils/analytics";
import type { Arm } from "@/utils/experiment";

/**
 * Publishes the server-resolved experiment arm to the analytics layer.
 *
 * Renders nothing. The value is set during render rather than in an effect so
 * that events fired by components mounting on the same page already carry it —
 * an effect would run after theirs and lose the first event of the visit.
 */
export default function ExperimentArm({ arm }: { arm: Arm | null }) {
  setExperimentArm(arm);
  return null;
}
