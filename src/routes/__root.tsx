import { ApolloWrapper } from "@/lib/apolloWrapper";
import { customAntDTheme } from "@/utils/themeUtils";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ConfigProvider } from "antd";

export const Route = createRootRoute({
  component: () => (
    <ApolloWrapper>
      <ConfigProvider
        theme={{
          components: {
            ...customAntDTheme?.components,
            Tabs: {
              ...customAntDTheme?.components?.Tabs,
              horizontalItemPadding: "12px 54px 12px 54px",
            },
          },
        }}
      >
        <>
          <Outlet />
          <TanStackRouterDevtools />
        </>
      </ConfigProvider>
    </ApolloWrapper>
  ),
});
