# MoLeaf

## Teammates

20200510 이지윤 nicolelee2001@kaist.ac.kr

20200549 장준하 andy.jang@kaist.ac.kr

20220042 권순호 snowsuno@kaist.ac.kr

> Final Prototype Link: [https://moleaf.sparcsandbox.com/](https://moleaf.sparcsandbox.com/)
> 
> For real app-like usage, please use `Add to home screen`, and it will act like an app.

## Selected Topic

Visual Analytics for Better Self-regulating Phone Usage Behaviors

### Tasks

1. Allow users to set and visualize clear goals
2. Provide intuitive visual aids to motivate users to regulate usage
3. Enable user customization to deliver the data more effectively

### Links

- [Process Book](https://docs.google.com/presentation/d/1-JtEbmjFuFBJG91VrgiLuUFtJZL5uprzzzDAyeCCJ1E/edit?usp=sharing)
- [Final Prototype](https://moleaf.sparcsandbox.com/)

### How to run development server
```bash
yarn install
yarn dev
```

## Code Explanation

### Page Layout

- [Main page (Overview page)](https://moleaf.sparcsandbox.com/): `src/pages/home/Home.tsx`
  - summary of phone usage data using widgets (`src/components/widgets`)
- [Customization page](https://moleaf.sparcsandbox.com/customize): `src/pages/home/Customize.tsx`
  - main page customization feature
- [Total usage page (page with main graph)](https://moleaf.sparcsandbox.com/total): `src/pages/home/TotalUsage.tsx`
  - view weekly and daily usage graphs (`src/components/graphs`)
- [Goal page](https://moleaf.sparcsandbox.com/goals): `src/goals/Goals.tsx`
  - see list of set and unset goals
- [Edit goal page](https://moleaf.sparcsandbox.com/goals/totaltime): `src/pages/goals/TotalTime.tsx`, `src/pages/goals/DownTime.tsx`, `src/pages/goals/Unlocks.tsx`
  - allow editing of each goal
- [Settings page](https://moleaf.sparcsandbox.com/settings): `src/pages/Settings.tsx`
  - view basic user information

### Main Graphs

- **Horizontal bar graph**: `src/components/graphs/BarGauge.tsx`
  - main page widget preview
  - total usage page daily usage view
- **Vertical bar graph**: `src/components/graphs/BarGraph.tsx`
  - total usage page weekly usage view

### Processed data

- Code used to process the raw data can be seen in the `data_processor` directory on the `feat/data-processing` branch
- Processed data is located in `src/data`
