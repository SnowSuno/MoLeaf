import { useMemo } from "react";
import { shallow } from "zustand/shallow";

import { useWidgetState } from "~/state/widget";

export const useWidgets = () => {
  const widgets = useWidgetState(state => state.order, shallow);

  return useMemo(() => ({
    main: widgets[0],
    widgets: widgets.slice(1),
  }), [widgets]);
};
