import PlaygroundClient from "./PlaygroundClient";

export const metadata = {
  title: "Python Playground — CS Tutor",
  description: "Write and run Python code directly in your browser",
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
