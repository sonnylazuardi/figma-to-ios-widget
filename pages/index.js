import Head from "next/head";
import { useState, useCallback } from "react";
// https://www.figma.com/file/Qw50W199NUzlPz8lvLMeuT/Among-Us?node-id=1%3A2
export default function Home() {
  let [figmaUrl, setFigmaUrl] = useState("");
  let [shortcut, setShortcut] = useState("");

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const showResult = async () => {
      const fileSplit = figmaUrl.split("/");
      const nodeSplit = figmaUrl.split("=");
      const fileKey = fileSplit[4];
      const nodeId = nodeSplit[1].replace("%3A", ":");
      const res = await fetch(`https://plugin-api.sonnylab.com/widget`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileKey,
          nodeId,
          shortcut,
        }),
      });
      const result = await res.json();
      window.location.href = `/result?url=${result.randomId}`;
    };
    showResult();
  });

  return (
    <div className="container">
      <Head>
        <title>Figma Widget</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Figma to iOS Widget</h1>
      <h2>Auto-magically showing your design in ios widget</h2>

      <form onSubmit={onSubmit}>
        <p>Copy your file URL:</p>
        <input
          placeholder={`https://www.figma.com/file/Qw50W199NUzlPz8lvLMeuT/Among-Us?node-id=1%3A2`}
          defaultValue={figmaUrl}
          onChange={(event) => {
            setFigmaUrl(event.target.value);
          }}
        />
        <br />
        <p>Enter shortcut URL:</p>
        <input
          placeholder={`https://sonnylab.com`}
          defaultValue={shortcut}
          onChange={(event) => {
            setShortcut(event.target.value);
          }}
        />
        <br />
        {figmaUrl.length && shortcut.length ? (
          <button type="submit">CREATE WIDGET</button>
        ) : null}
      </form>

      <p>
        Crafted with ❤ by{" "}
        <a href="https://twitter.com/sonnylazuardi">@sonnylazuardi</a>
      </p>
    </div>
  );
}
