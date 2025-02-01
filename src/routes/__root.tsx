import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import * as React from 'react';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Layout>
        <Header />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </Layout>
    </React.Fragment>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px',
      }}>
      {children}
    </div>
  );
}
