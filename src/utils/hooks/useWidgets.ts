import { useMemo } from "react";
import { shallow } from "zustand/shallow";

import { useWidget } from "~/state/widget";

export const useWidgets = () => {
  const widgets = useWidget(state => state.order, shallow);

  return useMemo(() => ({
    main: widgets[0],
    widgets: widgets.slice(1),
  }), [widgets]);
};
