import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        style={{ margin: 0, fontFamily: "space-mono" }}
        data-theme="emerald"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
