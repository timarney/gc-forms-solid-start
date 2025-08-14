import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { TemplateProvider } from "./lib/TemplateContext";
import formRecord from "../public/data/cmeaj61dl0001xf01aja6mnpf.json";
import "./app.css";

export default function App() {
  return (
    <TemplateProvider formRecord={formRecord}>
      <Router
        root={(props) => (
          <MetaProvider>
            <Title>Demo App</Title>
            <div>
              <gcds-header lang-href="#" skip-to-href="#main-content">
                <gcds-top-nav
                  slot="menu"
                  label="Top navigation"
                  alignment="right"
                >
                  <gcds-nav-link slot="home" href="/">
                    Demo App
                  </gcds-nav-link>
                  <gcds-nav-link href="/form">View form</gcds-nav-link>
                  <gcds-nav-link href="/json">View JSON</gcds-nav-link>
                </gcds-top-nav>
              </gcds-header>

              <div class="content-wrapper">
                <gcds-container
                  id="main-content"
                  main-container
                  size="xl"
                  centered
                  tag="main"
                >
                  <Suspense>{props.children}</Suspense>
                  <gcds-date-modified type="version">1.0.0</gcds-date-modified>
                </gcds-container>
                <gcds-footer
                  display="compact"
                  contextual-heading="Canadian Digital Service"
                  contextual-links='{ "Why GC Notify": "#","Features": "#", "Activity on GC Notify": "#"}'
                ></gcds-footer>
              </div>
            </div>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </TemplateProvider>
  );
}
