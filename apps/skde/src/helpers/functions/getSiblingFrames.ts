export default function getSiblingFrames(window: Window | undefined) {
  const siblings: Window[] = [];

  if (
    !window ||
    !window.parent ||
    !window.parent.frames ||
    window === window.top
  ) {
    return siblings;
  }

  for (let i = 0; i < window.parent.frames.length; i++) {
    if (window.parent.frames[i] !== window) {
      siblings.push(window.parent.frames[i]);
    }
  }

  return siblings;
}