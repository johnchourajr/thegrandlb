import type { PageDoc } from "content/types";

import { anniversaryPartiesPage } from "./anniversary-parties.content";
import { babyShowersPage } from "./baby-showers.content";
import { barBatMitzvahPage } from "./bar-bat-mitzvah.content";
import { businessPage } from "./business.content";
import { galasPage } from "./galas.content";
import { graduationPartiesPage } from "./graduation-parties.content";
import { indianWeddingsPage } from "./indian-weddings.content";
import { milestonesPage } from "./milestones.content";
import { quincesPage } from "./quinces.content";
import { rehearsalDinnersPage } from "./rehearsal-dinners.content";
import { sweet16Page } from "./sweet-16.content";
import { weddingsPage } from "./weddings.content";

export const eventPages: Record<string, PageDoc> = {
  milestones: milestonesPage,
  business: businessPage,
  weddings: weddingsPage,
  quinces: quincesPage,
  "indian-weddings": indianWeddingsPage,
  "sweet-16": sweet16Page,
  "bar-bat-mitzvah": barBatMitzvahPage,
  "graduation-parties": graduationPartiesPage,
  galas: galasPage,
  "baby-showers": babyShowersPage,
  "rehearsal-dinners": rehearsalDinnersPage,
  "anniversary-parties": anniversaryPartiesPage,
};

export const eventPageUids = Object.keys(eventPages);
