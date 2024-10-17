export default function getSiblingFrames(window: Window | undefined) {
  if (!window || !window.parent || !window.parent.frames) {
    return [];
  }

  const domain = window.location.origin;

  return Array.from(window.parent.frames).filter((frame) => {
    return frame.location.origin === domain && frame !== window;
  });
}
