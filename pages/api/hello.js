// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// @GF-2021-06-21: Wrap API handlers with a withSentry function to capture Next.js API route errors:
// Without Sentry:
// const handler = (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

// With Sentry:
import { withSentry } from "@sentry/nextjs";

const handler = (req, res) => {
  res.status(200).json({ name: "John Doe" });
};

export default withSentry(handler);
