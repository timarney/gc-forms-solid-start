// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdn.design-system.alpha.canada.ca/@cdssnc/gcds-utility@1.9.2/dist/gcds-utility.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.design-system.alpha.canada.ca/@cdssnc/gcds-components@0.40.0/dist/gcds/gcds.css"
          />
          <script
            type="module"
            src="https://cdn.design-system.alpha.canada.ca/@cdssnc/gcds-components@0.40.0/dist/gcds/gcds.esm.js"
          ></script>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
