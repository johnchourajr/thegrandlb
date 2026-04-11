import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const urls = fs
  .readFileSync(path.join(ROOT, "docs/cloudflare-images-urls.txt"), "utf8")
  .trim()
  .split(/\n/)
  .filter(Boolean);
const ids = urls
  .map((u) => u.match(/\/([a-f0-9-]{36})\/public/)?.[1])
  .filter(Boolean);
if (ids.length !== 146) throw new Error(`expected 146 ids, got ${ids.length}`);

const C = {
  "003e6a49-b9e9-4186-2778-3b167de12200": {
    summary:
      "Monarch Room interior: dance floor, stage with blue lighting, banquet rounds, ornate ceiling.",
    sceneType: "event_ballroom",
    setting: "indoor",
    subjects: ["venue_interior", "stage", "dance_floor", "tables"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour", "reception", "dance", "lighting"],
  },
  "0061dc98-91d8-48c7-a03c-391748748a00": {
    summary:
      "Grand Ballroom vertical shot: dramatic ceiling, chandeliers, long perspective toward stage.",
    sceneType: "ballroom_hero",
    setting: "indoor",
    subjects: ["ceiling", "chandeliers", "ballroom"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["scale", "elegance", "faq"],
  },
  "023e8045-5fbe-40ff-1d88-2d6f8eaec900": {
    summary:
      "High aerial of the venue campus, parking, and surrounding city grid.",
    sceneType: "aerial_campus",
    setting: "aerial",
    subjects: ["building", "parking", "roads", "city"],
    estimatedVenueArea: null,
    suggestedUseTags: ["location", "scale", "logistics", "corporate"],
  },
  "07acd8a1-873a-46a9-2481-8b8de3197b00": {
    summary:
      "Outdoor patio at dusk: long banquet tables, market lights, palm silhouettes.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "string_lights", "dining"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["faq", "alfresco", "evening"],
  },
  "08333a96-97ef-4d0c-f638-60872e45dd00": {
    summary:
      "Palm Terrace evening: market lights, open-air dining, palm trees.",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["patio", "lights", "guests_distant"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour", "outdoor"],
  },
  "0a830e64-16a7-4af8-f53a-1ea322919e00": {
    summary: "Professional headshot of a man in a dark suit (team portrait).",
    sceneType: "portrait_staff",
    setting: "studio_like",
    subjects: ["person", "headshot"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about", "team"],
  },
  "0b3cacb3-aa0c-4f70-cc26-14da10e9e700": {
    summary:
      "Outdoor terrace with white drapery, palm trees, tented or ceremony feel.",
    sceneType: "outdoor_decor",
    setting: "outdoor",
    subjects: ["drapery", "palms", "terrace"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["ceremony", "cocktail"],
  },
  "0e026458-c661-4886-4be5-66945466f500": {
    summary:
      "Pacific Room: warm wood tones, coastal art, built-in bar, lounge seating.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["bar", "lounge", "art"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["intimate", "corporate", "lounge"],
  },
  "11a9b4fb-b982-4cd1-7aec-f800b0bafd00": {
    summary:
      "Large hall set with rounds and stage lighting accents (ballroom scale).",
    sceneType: "ballroom_setup",
    setting: "indoor",
    subjects: ["tables", "stage_glow"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour", "capacity"],
  },
  "12559b25-b543-4fe7-c999-e7d746b7a000": {
    summary:
      "Evening exterior of the venue with porte-cochere lighting and arriving cars.",
    sceneType: "venue_exterior_night",
    setting: "outdoor",
    subjects: ["facade", "lights", "cars"],
    estimatedVenueArea: null,
    suggestedUseTags: ["arrival", "prestige", "about"],
  },
  "12712332-36fa-4d26-10c8-35f35f3c4c00": {
    summary: "Casual outdoor portrait of a man in a Grand staff polo.",
    sceneType: "portrait_staff",
    setting: "outdoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about", "team"],
  },
  "14280994-4b15-4ee4-d9e5-0ca3e1e4d600": {
    summary:
      "Couple in formal attire dancing closely in a spotlight on the dance floor.",
    sceneType: "wedding_moment",
    setting: "indoor",
    subjects: ["couple", "dance"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["weddings", "romance"],
  },
  "1433ea04-6645-4d6a-2468-cf8b4fb04100": {
    summary: "Palm-lined walkway leading toward the lit venue entrance.",
    sceneType: "approach_exterior",
    setting: "outdoor",
    subjects: ["palms", "path", "building"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home", "first_impression"],
  },
  "166c57dc-8df9-4af7-b71d-1acd17872100": {
    summary: "Outdoor reception under string lights with palm trees.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["faq", "evening"],
  },
  "17563442-2ec9-45eb-9451-d8dfdbd20b00": {
    summary:
      "Reception tables with tall floral centerpieces and ambient uplighting.",
    sceneType: "tablescape",
    setting: "indoor",
    subjects: ["flowers", "glassware", "chairs"],
    estimatedVenueArea: null,
    suggestedUseTags: ["weddings", "decor"],
  },
  "1783ee0c-d007-4b8d-128e-13309b18dd00": {
    summary:
      "Catalina Room wide: stage, dance floor, rounds, large scenic wall mural.",
    sceneType: "ballroom_event",
    setting: "indoor",
    subjects: ["mural", "stage", "tables"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour", "large_event"],
  },
  "17986f96-43c9-44bb-705c-10d3e326b600": {
    summary:
      "Outdoor ceremony or reception on lawn with white chairs and floral arch.",
    sceneType: "outdoor_ceremony",
    setting: "outdoor",
    subjects: ["aisle", "arch", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["weddings", "events_index"],
  },
  "1965a8be-df9a-4531-e8dc-b3c9fa293200": {
    summary:
      "Catalina Room from stage perspective: mural, chandeliers, floor layout.",
    sceneType: "ballroom_perspective",
    setting: "indoor",
    subjects: ["stage", "mural", "ceiling"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "20cb49a5-6155-4016-44a5-eb72a13d9d00": {
    summary:
      "Head table or sweetheart setup with abundant white and green florals.",
    sceneType: "tablescape",
    setting: "indoor",
    subjects: ["flowers", "head_table"],
    estimatedVenueArea: null,
    suggestedUseTags: ["weddings", "reception"],
  },
  "22fb4442-0635-4729-391b-6a6fac7af400": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "23b476ce-ac42-4720-9881-fd7dfa9ab300": {
    summary:
      "Catalina Room with rounds, stage, and Catalina-themed wall art.",
    sceneType: "ballroom_setup",
    setting: "indoor",
    subjects: ["tables", "stage", "art"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour_index"],
  },
  "28150dc9-361a-446d-94e8-513710c15800": {
    summary:
      "Palm Terrace long exposure: string lights, palm trunks, evening sky.",
    sceneType: "terrace_ambiance",
    setting: "outdoor",
    subjects: ["lights", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["mood", "evening"],
  },
  "2a7a2b5f-e94b-41cf-4694-4c40e9f53d00": {
    summary:
      "Large ballroom for corporate or gala: stage, screen, rounds with uplighting.",
    sceneType: "corporate_gala",
    setting: "indoor",
    subjects: ["stage", "projection", "tables"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["business", "gala"],
  },
  "2c55bfad-d55a-4464-8afe-8a622a5e0c00": {
    summary: "Headshot of a woman with curly hair in business attire.",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "30e7d61c-d2c4-423e-3bd3-d7498839bd00": {
    summary:
      "Garden Room with garden mural, chandeliers, and dance floor.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "dance_floor"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour_hero"],
  },
  "318ad625-1012-4c7b-401a-cccc1fde7200": {
    summary: "Outdoor terrace event with palm trees and market lights.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "32248fb5-d086-4925-9b48-c43302529100": {
    summary:
      "Grand Ballroom from rear or balcony: full room, stage, crystal lighting.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["chandeliers", "stage"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "34a92d62-a25b-4a27-422f-2e8777714600": {
    summary:
      "Passed hors d'oeuvre tray with bruschetta-like bites (service detail).",
    sceneType: "food_service",
    setting: "indoor",
    subjects: ["food", "hands", "tray"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus", "catering"],
  },
  "3562cb12-8916-4107-ba62-834da911cb00": {
    summary:
      "Grand Ballroom with stage, dance floor, and pink uplighting.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["stage", "dance_floor", "color_wash"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour", "celebration"],
  },
  "358f8b46-075f-469b-567b-4e0e9f02ee00": {
    summary: "Bride and groom in spotlight on the dance floor.",
    sceneType: "wedding_moment",
    setting: "indoor",
    subjects: ["couple", "spotlight"],
    estimatedVenueArea: null,
    suggestedUseTags: ["weddings"],
  },
  "35d98bbb-5f73-4176-3020-759e692d6700": {
    summary:
      "Palm Terrace hero: palms, string lights, outdoor bar structure.",
    sceneType: "outdoor_terrace_hero",
    setting: "outdoor",
    subjects: ["palms", "bar", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour_hero"],
  },
  "35fc10fd-ffbf-42f1-90f8-f5d099771b00": {
    summary: "Outdoor evening reception under lights with palm silhouettes.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "3742c9dc-4bcb-4666-3b4d-0d261819b000": {
    summary:
      "Ballroom with vibrant purple and blue stage lighting and dance floor.",
    sceneType: "reception_party",
    setting: "indoor",
    subjects: ["dance_floor", "color_wash"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["party", "dj", "milestone"],
  },
  "3763f95d-0637-42a6-3c2c-c92111d1ef00": {
    summary:
      "Conference or gala room with stage, screen, and magenta uplighting.",
    sceneType: "corporate_av",
    setting: "indoor",
    subjects: ["projection", "stage"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["corporate", "av"],
  },
  "388081a7-5177-4ca9-6dc6-41b5aaff3500": {
    summary:
      "Garden Room with botanical wall, chandeliers, and set tables.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "39670f24-73de-4ddb-91c8-b992f36ccd00": {
    summary:
      "Ballroom with pink uplighting, dance floor, and DJ booth.",
    sceneType: "party_ballroom",
    setting: "indoor",
    subjects: ["dance_floor", "dj"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["quinces", "sweet16", "dance"],
  },
  "3b611b74-29b4-4561-a6a3-001dbbaad600": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "3edab71f-a985-4597-fb80-ccba0c012a00": {
    summary:
      "Garden Room with green botanical wall and warm chandelier light.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "ceiling"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "3fe21ffc-6b5f-4cee-c1b1-a53d1793dd00": {
    summary:
      "Garden Room wide: dance floor, stage, botanical mural, rounds.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "tables", "stage"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "43ae91e7-b3e8-428a-f770-1b4a14dda300": {
    summary:
      "Young woman smiling at reception desk with Grand logo wall.",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person", "branded_wall"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "43f087ef-d3f4-4f46-0fe2-99e4031c5000": {
    summary:
      "Catalina Room from balcony: mural wall, rounds, chandeliers.",
    sceneType: "ballroom_balcony_view",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "45647c84-beeb-4396-f30c-dd2846eec100": {
    summary:
      "Outdoor terrace with white drapery altar and palm trees (ceremony).",
    sceneType: "outdoor_ceremony",
    setting: "outdoor",
    subjects: ["arch", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["weddings", "faq"],
  },
  "45e64cf1-7202-4c5e-634b-1965815d2400": {
    summary: "Plated dessert with berry garnish and chocolate decoration.",
    sceneType: "food_plate",
    setting: "indoor",
    subjects: ["dessert", "plate"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus"],
  },
  "46afeef1-2580-419e-f2ae-fe0b82295400": {
    summary: "Outdoor evening: market lights and palm trunks (atmospheric).",
    sceneType: "terrace_ambiance",
    setting: "outdoor",
    subjects: ["lights", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "48eb9ff1-7ac7-431e-e380-079a64b59a00": {
    summary:
      "Grand Ballroom with rounds, stage, and warm chandelier glow.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["chandeliers", "tables"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "4d446732-70fd-43a5-762e-e709f97fe400": {
    summary:
      "Garden Room with green mural, dance floor, and stage lighting.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["mural", "dance_floor"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "5024f3df-bc07-443b-8c27-2112edb8f800": {
    summary: "Monarch Room with purple wash, dance floor, and DJ.",
    sceneType: "reception_party",
    setting: "indoor",
    subjects: ["dance_floor", "dj"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour"],
  },
  "50691ccf-e12f-4687-eeae-8bc3f7c66400": {
    summary: "Grand Ballroom with dramatic red uplighting and stage.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["color_wash", "stage"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "50c4f831-b640-4d51-1858-805075229600": {
    summary:
      "Pacific Room: lounge vignette, bar, and coastal wall art.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["bar", "seating", "art"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour"],
  },
  "50ed405a-6497-4840-ef60-ae92a71acb00": {
    summary:
      "Pacific Room with patterned carpet, columns, and coastal decor.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["columns", "lounge"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour"],
  },
  "52b8ff11-1b88-41c1-72e8-512662e19700": {
    summary: "Aerial twilight over the venue block and adjacent streets.",
    sceneType: "aerial_twilight",
    setting: "aerial",
    subjects: ["city", "parking", "building"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home", "community"],
  },
  "531e6536-68f1-4105-86e5-fe56512fdd00": {
    summary:
      "Close-up of a tall floral centerpiece with candles and glassware.",
    sceneType: "floral_detail",
    setting: "indoor",
    subjects: ["flowers", "candles"],
    estimatedVenueArea: null,
    suggestedUseTags: ["weddings", "decor"],
  },
  "550c0c0b-0622-40ff-8bb5-652e4d630400": {
    summary: "Palm Terrace with palms and open patio (daytime or soft dusk).",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["palms", "patio"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour_index"],
  },
  "553154e2-acd9-4f5e-6ce5-9d8d37fd9a00": {
    summary: "Garden Room with green mural wall and chandelier.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "ceiling"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "553cdde0-df5f-4907-932f-2805da4e4600": {
    summary:
      "Board Room: long mahogany table, leather chairs, built-ins.",
    sceneType: "meeting_room",
    setting: "indoor",
    subjects: ["board_table", "chairs"],
    estimatedVenueArea: "board-room",
    suggestedUseTags: ["tour_index", "corporate"],
  },
  "569cb5d0-cd2b-433e-6f65-d237efee8900": {
    summary:
      "Evening exterior of the venue with palms and illuminated facade.",
    sceneType: "venue_exterior_twilight",
    setting: "outdoor",
    subjects: ["building", "palms", "lights"],
    estimatedVenueArea: null,
    suggestedUseTags: ["tour_hero"],
  },
  "57e9f3bd-4c87-41fc-efe1-792f35567300": {
    summary:
      "Ballroom with bright stage lighting and dance floor (party energy).",
    sceneType: "reception_party",
    setting: "indoor",
    subjects: ["stage_lights", "dance_floor"],
    estimatedVenueArea: null,
    suggestedUseTags: ["milestone", "party"],
  },
  "5c5a5a88-be98-49ee-62ab-80e5f1b16a00": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "5d755ebb-0900-4db2-3a68-70f3ca2efa00": {
    summary:
      "Grand Ballroom with pink and purple uplighting and stage.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["color_wash", "stage"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "5dc64eb6-f953-4d0a-479f-ba4ab10fc500": {
    summary:
      "Large event hall with rounds, stage, and blue lighting accents.",
    sceneType: "ballroom_setup",
    setting: "indoor",
    subjects: ["tables", "stage"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home", "gallery"],
  },
  "5ffdbab1-11ba-477a-f11e-3d9b0e70b900": {
    summary: "Monarch Room with purple lighting along draped walls.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["uplighting", "dance_floor"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour"],
  },
  "60c6b33f-d09c-4f0d-1064-63237b61c500": {
    summary:
      "Garden Room with green mural and chandelier (alternate angle).",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "622e7bcd-2da3-4629-a8e1-4b9cfac18b00": {
    summary:
      "Grand Ballroom with pink uplighting and packed dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["crowd", "dance_floor"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour", "energy"],
  },
  "62bc010e-8ab6-42cd-5207-9160ff96f700": {
    summary: "Daytime exterior of the modern venue facade and signage.",
    sceneType: "venue_exterior_day",
    setting: "outdoor",
    subjects: ["building", "sky"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home", "gallery"],
  },
  "64afff82-8a14-4fae-9434-9debdeaa3700": {
    summary:
      "Garden Room with green wall, rounds, and chandeliers.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "67cadf3c-e458-4680-7b4d-da63fb3d7300": {
    summary:
      "Board Room: mahogany conference table and executive chairs.",
    sceneType: "meeting_room",
    setting: "indoor",
    subjects: ["board_table"],
    estimatedVenueArea: "board-room",
    suggestedUseTags: ["tour"],
  },
  "69ff6ae0-4b3f-4cfc-2a02-c33350a31100": {
    summary:
      "Catalina Room with rounds, stage, and mural (wide).",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "stage"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "6d437bce-c364-42fa-aa3d-8686a2fa3f00": {
    summary: "Large ballroom with blue uplighting and stage.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["stage", "tables"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["home", "gallery"],
  },
  "6e11ea19-e97b-4e26-95bc-47560099ca00": {
    summary: "Outdoor terrace with palm trees and string lights.",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["palms", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "6e2b5666-7f70-41c7-4916-139093221700": {
    summary:
      "Monarch Room hero: ornate ceiling, stage, dance floor, banquet setup.",
    sceneType: "ballroom_hero",
    setting: "indoor",
    subjects: ["ceiling", "stage", "dance_floor"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour_hero"],
  },
  "6f029f31-cd81-4ccd-232e-5ee5d19a3a00": {
    summary:
      "Elegant plated table: glassware, flatware, centerpiece in warm light.",
    sceneType: "tablescape",
    setting: "indoor",
    subjects: ["place_setting", "flowers"],
    estimatedVenueArea: null,
    suggestedUseTags: ["catering", "faq", "weddings"],
  },
  "701687bb-7fe3-46ad-40c7-b4574f704300": {
    summary:
      "Garden Room with garden mural, chandeliers, and rounds.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour_index"],
  },
  "72908b93-f2c2-44c4-ccb0-b3294d921400": {
    summary: "Kitchen or prep line with chefs working.",
    sceneType: "kitchen_action",
    setting: "indoor",
    subjects: ["chefs", "kitchen"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus", "culinary"],
  },
  "7573ad4a-ba05-4e5f-e1cd-c7375ee52200": {
    summary:
      "Pacific Room with coastal wall art and lounge seating.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["art", "chairs"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour"],
  },
  "792ee76a-6878-4c90-8b77-9448f34b9b00": {
    summary: "Outdoor portrait of a man in Grand polo (team).",
    sceneType: "portrait_staff",
    setting: "outdoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "796ef0d9-fc84-4199-a3b2-1376b7918800": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "856df71a-3832-4963-6cc1-1fc9c6115c00": {
    summary:
      "Grand Ballroom with rounds, stage, and chandeliers.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["chandeliers", "tables"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour_index"],
  },
  "87f0c8bf-146c-414a-aa10-978ea0890600": {
    summary:
      "Grand Ballroom with dramatic ceiling and central dance floor.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["ceiling", "dance_floor"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "889f2c5d-d996-4f19-c5c3-6da3daa08b00": {
    summary:
      "Garden Room vertical: tall windows, garden mural, chandelier.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["windows", "mural"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["faq"],
  },
  "8b05ce0f-a2a7-4abb-5de6-233074cd7c00": {
    summary:
      "Daytime exterior of the venue with porte-cochere and landscaping.",
    sceneType: "venue_exterior_day",
    setting: "outdoor",
    subjects: ["building", "drive"],
    estimatedVenueArea: null,
    suggestedUseTags: ["faq", "booking"],
  },
  "8c590e41-1860-402a-44a1-767881408e00": {
    summary:
      "Chef garnishing a plated dish with precision (hands and plate).",
    sceneType: "food_prep",
    setting: "indoor",
    subjects: ["chef", "food"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus_hero", "culinary"],
  },
  "94cee58e-f579-47e3-714b-7e1a04d8a800": {
    summary:
      "Catalina Room with rounds, stage, and mural (wide shot).",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "stage"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "97a6d0ad-5e40-4587-40ec-534ad0f2d500": {
    summary:
      "Board Room alternate angle: long table and wall sconces.",
    sceneType: "meeting_room",
    setting: "indoor",
    subjects: ["board_table"],
    estimatedVenueArea: "board-room",
    suggestedUseTags: ["tour"],
  },
  "984b240c-df65-48f8-b3f5-9435eebc5700": {
    summary: "Palm Terrace with market lights and open-air dining.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "98e95b5f-8018-45cb-e8e2-c26b9c68bd00": {
    summary: "Plated entree with vegetables and sauce (food hero).",
    sceneType: "food_plate",
    setting: "indoor",
    subjects: ["plate", "food"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus"],
  },
  "9a7da4ec-51de-4611-d292-4dbcd925e700": {
    summary:
      "Catalina Room with rounds, stage, and warm lighting.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "9c4a00e5-743d-41fc-f500-8e35b371b000": {
    summary:
      "Evening exterior with palms and illuminated entry (footer mood).",
    sceneType: "venue_exterior_twilight",
    setting: "outdoor",
    subjects: ["building", "palms"],
    estimatedVenueArea: null,
    suggestedUseTags: ["footer", "cta"],
  },
  "9d0dccc6-cc37-4965-8019-d351ad9f3700": {
    summary:
      "Outdoor terrace reception under string lights with palm trees.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights", "guests"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["events", "outdoor"],
  },
  "9e238529-fd80-4c3f-ae79-a10a7562d100": {
    summary:
      "Garden Room with green mural and chandelier (vertical emphasis).",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural", "windows"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "9eb76e6f-9d8d-443c-7d81-df245dbf9400": {
    summary: "Plated appetizer or salad with hands serving.",
    sceneType: "food_plate",
    setting: "indoor",
    subjects: ["food", "hands"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus"],
  },
  "a035a74c-382a-4391-b4a1-70313da9ff00": {
    summary:
      "Monarch Room with ornate ceiling, stage, and dance floor.",
    sceneType: "ballroom_hero",
    setting: "indoor",
    subjects: ["ceiling", "stage"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour_index"],
  },
  "a1f4b734-5327-4aeb-7c5c-80715d53f100": {
    summary:
      "Catalina Room hero: mural, chandeliers, rounds, and stage.",
    sceneType: "ballroom_hero",
    setting: "indoor",
    subjects: ["mural", "chandeliers"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour_hero"],
  },
  "a2aa72f8-8821-4b26-a0b7-e50db6933300": {
    summary:
      "Pacific Room with coastal art and lounge furniture.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["art", "seating"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour"],
  },
  "a4c776c5-dfdb-4a6a-e959-6646d4905900": {
    summary:
      "Board Room: mahogany table, leather chairs, sconce lighting.",
    sceneType: "meeting_room",
    setting: "indoor",
    subjects: ["board_table"],
    estimatedVenueArea: "board-room",
    suggestedUseTags: ["tour_hero"],
  },
  "a4f9887c-324e-489c-c975-51ab9519ef00": {
    summary:
      "Palm Terrace with string lights and dining under palms.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "a99e14e7-1ba6-49c4-1654-ef161e724100": {
    summary: "Grand Ballroom with rounds and stage (wide).",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["tables", "stage"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "b0c44b08-2811-4899-5f8b-b84dac06ff00": {
    summary:
      "Portrait of a woman at a reception desk with Grand logo wall.",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person", "branded_wall"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "b17a9cce-4843-4fd5-54d8-c8639d6c4900": {
    summary:
      "Catalina Room from rear toward stage and mural.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "stage"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "b386e330-b61e-4c9d-310d-304b20000000": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "b3efdfa5-90c4-491f-d04e-b38e102df500": {
    summary: "Catalina Room with rounds and mural (wide).",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "b41a724a-b3ad-40ae-57df-98a1b8ce3400": {
    summary:
      "Twilight exterior of the venue with palms and dramatic sky.",
    sceneType: "venue_exterior_twilight",
    setting: "outdoor",
    subjects: ["building", "palms", "sky"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home_hero"],
  },
  "b554ec79-70c2-4abb-18a4-f3d4e387ff00": {
    summary:
      "Conference room with presenter and seated attendees.",
    sceneType: "corporate_meeting",
    setting: "indoor",
    subjects: ["people", "presentation"],
    estimatedVenueArea: null,
    suggestedUseTags: ["business"],
  },
  "b6065055-4022-4fb1-948f-9285a0a87000": {
    summary: "Chef in whites arms crossed in commercial kitchen.",
    sceneType: "portrait_chef",
    setting: "indoor",
    subjects: ["person", "kitchen"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about", "culinary"],
  },
  "b79fb67e-391b-42e1-2cd6-56eca0f6a900": {
    summary: "Monarch Room with purple lighting and dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["dance_floor", "uplighting"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour"],
  },
  "b974fb0d-4d15-49e8-351b-fa4018109e00": {
    summary:
      "Garden room or conservatory-style space with guests at tables.",
    sceneType: "dining_event",
    setting: "indoor",
    subjects: ["guests", "windows", "plants"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["milestone", "anniversary"],
  },
  "ba00e56c-e108-4405-26e1-f16ba5b35c00": {
    summary:
      "Grand Ballroom with ornate ceiling, crystal chandeliers, formal rounds.",
    sceneType: "ballroom_hero",
    setting: "indoor",
    subjects: ["chandeliers", "tables"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["faq", "weddings", "indian_wedding"],
  },
  "babaa885-4edc-4fb7-63c6-5693245c4e00": {
    summary:
      "Close table setting with glassware and low floral centerpiece.",
    sceneType: "tablescape",
    setting: "indoor",
    subjects: ["glassware", "flowers"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home", "gallery"],
  },
  "bad51c37-0a71-4bb6-e0e0-699b19c0ef00": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "bb4114e2-ad13-41e5-e440-ab8aab4acf00": {
    summary: "Monarch Room with dance floor and stage lighting.",
    sceneType: "reception_party",
    setting: "indoor",
    subjects: ["dance_floor", "stage"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour"],
  },
  "bc23dc72-1b4e-454b-9572-15465ee2a800": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "bc27becf-bed9-4be0-7e8d-125bfa267200": {
    summary: "Outdoor terrace with string lights and palm trees.",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["lights", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["faq"],
  },
  "bdc5bd25-ad1d-45a3-1242-3fd77afbb800": {
    summary:
      "Grand Ballroom with pink uplighting and dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["color_wash", "dance_floor"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "bf13ca43-9923-43b7-213c-ece539894400": {
    summary:
      "Pacific Room with columns, carpet, and coastal seating area.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["columns", "lounge"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour"],
  },
  "c647a4c0-5d20-4460-82ad-d029b7c14800": {
    summary:
      "Indoor ceremony wide shot with floral arch and guests.",
    sceneType: "ceremony",
    setting: "indoor",
    subjects: ["arch", "aisle", "guests"],
    estimatedVenueArea: null,
    suggestedUseTags: ["weddings"],
  },
  "c75e4503-e033-4109-55f8-c007074e0c00": {
    summary: "Palm Terrace with market lights and dining under palms.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "c86282c4-c74f-46ed-b93e-f618390c0e00": {
    summary: "Chef torching or finishing a dish at the pass.",
    sceneType: "kitchen_action",
    setting: "indoor",
    subjects: ["chef", "flame", "food"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus"],
  },
  "c8b247ca-ab6b-4f95-0af4-e412e6ad4c00": {
    summary:
      "Grand Ballroom with dramatic ceiling, chandeliers, packed dance floor.",
    sceneType: "ballroom_hero",
    setting: "indoor",
    subjects: ["ceiling", "crowd"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour_hero"],
  },
  "c94179f3-6554-4e3a-0f02-c9818b0e4600": {
    summary:
      "Reception tables with tall white floral centerpieces and candles.",
    sceneType: "tablescape",
    setting: "indoor",
    subjects: ["flowers", "candles"],
    estimatedVenueArea: null,
    suggestedUseTags: ["weddings", "rehearsal_dinner"],
  },
  "cfe41bb3-f218-430d-868d-99feb6668300": {
    summary:
      "Elegant ballroom interior with rounds, chandeliers, soft uplighting.",
    sceneType: "ballroom_ambient",
    setting: "indoor",
    subjects: ["chandeliers", "tables"],
    estimatedVenueArea: null,
    suggestedUseTags: ["events_index_hero"],
  },
  "d3737cc7-41a3-499b-cca7-9269111c0b00": {
    summary:
      "Conference or seminar room with screen and classroom rows.",
    sceneType: "corporate_meeting",
    setting: "indoor",
    subjects: ["projection", "chairs"],
    estimatedVenueArea: null,
    suggestedUseTags: ["business", "events_index"],
  },
  "d7c0d809-c76f-4f45-62f3-9af5ad5a0400": {
    summary:
      "Wedding reception with dance floor, DJ, and blue lighting.",
    sceneType: "reception_party",
    setting: "indoor",
    subjects: ["dance_floor", "dj"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["weddings_hero"],
  },
  "d8b7f538-ec4f-4688-e22b-f6706a576a00": {
    summary: "Guests mingling in a warmly lit reception space.",
    sceneType: "cocktail_mingling",
    setting: "indoor",
    subjects: ["people", "bar_area"],
    estimatedVenueArea: null,
    suggestedUseTags: ["social", "home"],
  },
  "d8ca11cb-4683-497a-f327-21606bc31a00": {
    summary:
      "Kitchen pass with plated dishes lined up for service.",
    sceneType: "kitchen_line",
    setting: "indoor",
    subjects: ["plates", "kitchen"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about", "culinary"],
  },
  "da91e312-621d-4a89-4ec7-c627dbcfe100": {
    summary:
      "Grand entrance hallway with chandelier and checkered floor.",
    sceneType: "venue_interior_lobby",
    setting: "indoor",
    subjects: ["chandelier", "stairs"],
    estimatedVenueArea: null,
    suggestedUseTags: ["home", "arrival"],
  },
  "dbbd7285-1c7a-4ad2-cc2c-bc63ea9a3900": {
    summary: "Monarch Room with purple lighting and dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["dance_floor", "uplighting"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour"],
  },
  "dc01d6e5-c70a-4930-ade2-7f7c4cd4af00": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "dc4d9630-6872-458e-7223-8e94e5fb8800": {
    summary: "Portrait of a man in a suit jacket (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "dfcae997-e4ab-43db-9b06-6b58ccbfec00": {
    summary: "Portrait of a man in a suit (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "e1afd8d5-5eb2-4eff-cfac-be0b75a0f700": {
    summary:
      "Outdoor terrace with market lights and palm silhouettes.",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["lights", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "e2724b59-2b54-48ab-d7fe-7800d2d2fb00": {
    summary:
      "Grand Ballroom with pink uplighting and dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["color_wash", "dance_floor"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "e7455f65-b172-438b-77f2-d2b782adda00": {
    summary: "Palm Terrace with string lights and outdoor dining.",
    sceneType: "outdoor_reception",
    setting: "outdoor",
    subjects: ["terrace", "lights"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "e925b2b4-950d-43f6-8234-d209195abe00": {
    summary: "Portrait of a woman in a black blazer (team headshot).",
    sceneType: "portrait_staff",
    setting: "indoor",
    subjects: ["person"],
    estimatedVenueArea: null,
    suggestedUseTags: ["about"],
  },
  "e931f5af-d53c-4108-d65b-dab7f149de00": {
    summary:
      "Pacific Room with coastal columns, carpet, and seating.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["columns", "lounge"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour_hero"],
  },
  "e9bf67ab-d15c-44e6-dee5-7d3019a2b400": {
    summary: "Catalina Room with rounds and mural (wide).",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "tables"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "eaa674d0-b46a-4473-4464-f2aaba173500": {
    summary:
      "Pacific Room with coastal artwork and lounge.",
    sceneType: "small_event_room",
    setting: "indoor",
    subjects: ["art", "seating"],
    estimatedVenueArea: "pacific-room",
    suggestedUseTags: ["tour"],
  },
  "eedc2a6f-b2ca-4e4f-ad7e-52754836e100": {
    summary:
      "Guests seated at a celebration with balloons and centerpieces.",
    sceneType: "seated_celebration",
    setting: "indoor",
    subjects: ["guests", "balloons", "tables"],
    estimatedVenueArea: null,
    suggestedUseTags: ["milestone", "party"],
  },
  "f191b26e-899e-41ae-9354-aecd4a48fd00": {
    summary: "Garden Room with green mural and chandelier.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "f59eff0c-96f3-4a03-cdf4-26282d36d500": {
    summary: "Board Room: mahogany table and leather chairs.",
    sceneType: "meeting_room",
    setting: "indoor",
    subjects: ["board_table"],
    estimatedVenueArea: "board-room",
    suggestedUseTags: ["tour"],
  },
  "f7ffd2cf-564c-4fd8-006e-ff1219868b00": {
    summary:
      "Ballroom with cake table, dessert spread, and pink lighting.",
    sceneType: "dessert_station",
    setting: "indoor",
    subjects: ["cake", "candy", "tables"],
    estimatedVenueArea: null,
    suggestedUseTags: ["milestones", "sweet16"],
  },
  "f8325240-f0c7-4319-7703-026e3d803000": {
    summary: "Chef garnishing small bites on a tray.",
    sceneType: "food_prep",
    setting: "indoor",
    subjects: ["chef", "food"],
    estimatedVenueArea: null,
    suggestedUseTags: ["menus"],
  },
  "f8ec6e4c-0ef9-413a-4fbf-d1c3fc16e100": {
    summary: "Catalina Room with rounds, stage, and mural.",
    sceneType: "ballroom_wide",
    setting: "indoor",
    subjects: ["mural", "stage"],
    estimatedVenueArea: "catalina-room",
    suggestedUseTags: ["tour"],
  },
  "fb5d8069-34d9-4eae-0cf5-43acad511600": {
    summary: "Garden Room with green mural and chandelier.",
    sceneType: "ballroom_botanical",
    setting: "indoor",
    subjects: ["mural"],
    estimatedVenueArea: "garden-room",
    suggestedUseTags: ["tour"],
  },
  "fbabdfb9-4baa-4836-0516-44294e16b600": {
    summary:
      "Grand Ballroom with pink uplighting and dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["dance_floor", "color_wash"],
    estimatedVenueArea: "grand-ballroom",
    suggestedUseTags: ["tour"],
  },
  "fd44e436-6b35-48e5-a137-25578b682000": {
    summary: "Outdoor terrace with market lights and palm trees.",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["lights", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "fda46957-db2b-4df2-71ed-f59b57773f00": {
    summary: "Palm Terrace with string lights and evening sky.",
    sceneType: "outdoor_terrace",
    setting: "outdoor",
    subjects: ["lights", "palms"],
    estimatedVenueArea: "palm-terrace",
    suggestedUseTags: ["tour"],
  },
  "ff9d9566-2957-40b5-e49d-ed47f59b4a00": {
    summary: "Monarch Room with purple lighting and dance floor.",
    sceneType: "ballroom_party",
    setting: "indoor",
    subjects: ["dance_floor", "uplighting"],
    estimatedVenueArea: "monarch-room",
    suggestedUseTags: ["tour"],
  },
};

const missing = ids.filter((id) => !C[id]);
if (missing.length) {
  throw new Error(`missing ${missing.length}: ${missing.slice(0, 5).join(",")}...`);
}

const meta = {
  generatedAt: new Date().toISOString(),
  source:
    "Human visual review of 800px WebP derivatives (saved as JPEG) downloaded from Cloudflare Images flexible variant URLs.",
  previewUrlTemplate:
    "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/{imageId}/w=800,q=80,f=webp",
  disclaimer:
    "Labels describe visible content in one downscaled frame. Venue-area guesses align with repo tour mapping where interiors match named rooms; confirm for legal or PR-sensitive use.",
  notForInferenceFrom:
    "src/app/(site)/events/[uid]/*.content.ts — generated event verticals may pair images poorly; use this JSON and trusted pages (home, tour, events index, FAQ, menus, about) instead.",
  altTextInRepo:
    "Repo `alt` fields next to each Cloudflare Images URL should match this file's `summary` (maintain with `node scripts/sync-cf-image-alts.mjs` after changing summaries).",
};

const images = ids.map((id) => ({
  id,
  publicUrl: `https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/${id}/public`,
  ...C[id],
}));

fs.writeFileSync(
  path.join(ROOT, "docs/cloudflare-images-visual-classification.json"),
  JSON.stringify({ meta, images }, null, 2)
);
console.log("wrote", images.length, "classifications");
