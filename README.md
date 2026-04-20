# Care Analytics FE Plugin

CARE Analytics FE is a frontend plugin for CARE based on micro frontend architecture for analytics workflows. This plugin adds UI components for:

- Viewing analytics dashboards in CARE
- Listing and searching analytics dashboards at facility and organization level
- Creating, editing, and archiving analytics configurations from Admin
- Opening handler-generated dashboard URLs inside CARE with refresh support

## Getting Started

### Prerequisites

- Node.js and npm (refer `care_fe` repository for the exact version requirements)

### Setup Instructions

1. Clone both repositories:

```bash
git clone git@github.com:ohcnetwork/care_fe.git
git clone git@github.com:ohcnetwork/care_analytics_fe.git
```

1. Install dependencies for CARE Analytics FE:

```bash
cd care_analytics_fe
npm install
```

1. Start the development server:

```bash
npm start
```

## Connect Plugin to Main `care_fe`

1. Open the main Care frontend.
2. Go to **Admin Dashboard** from the navbar.
3. Open **Apps** and click **Add New Config**.
4. Add the config below (for local development, the `url` should point to your local server):

```json
{
  "url": "http://localhost:10120/assets/remoteEntry.js",
  "name": "care_analytics_fe",
  "plug": "care_analytics_fe"
}
```

The deployed plugin is available at `care-analytics-fe.pages.dev/`.
