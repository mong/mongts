/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { AtlasLink } from "..";

test("Norsk render", async () => {
  const date1 = new Date("October 13, 2014 11:13:00");
  const { container } = render(
    <AtlasLink
      lang="no"
      linkTo="v2/test_atlas"
      imageSource="https://picsum.photos/id/237/100/100.jpg"
      linkTitle="Testatlas 1"
      wide={false}
      linkText="Lorem lipsum dolor 1"
      date={date1}
    />
  );
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const date1 = new Date("October 13, 2014 11:13:00");
  const { container } = render(
    <AtlasLink
      lang="en"
      linkTo="v2/en/test_atlas"
      imageSource="https://picsum.photos/id/237/100/100.jpg"
      linkTitle="Testatlas 2"
      wide={false}
      linkText="Lorem lipsum dolor 2"
      date={date1}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Wide is true", async () => {
  const date1 = new Date("October 13, 2014 11:13:00");
  const { container } = render(
    <AtlasLink
      lang="no"
      linkTo=""
      imageSource="https://picsum.photos/id/237/100/100.jpg"
      linkTitle=""
      wide={true}
      linkText=""
      date={date1}
    />
  );
  expect(container).toMatchSnapshot();
});

test("newlyUpdated is true", async () => {
  const date1 = new Date("October 13, 2014 11:13:00");
  jest.useFakeTimers().setSystemTime(new Date("2014-10-10"));
  const { container } = render(
    <AtlasLink
      lang="no"
      linkTo=""
      imageSource="https://picsum.photos/id/237/100/100.jpg"
      linkTitle=""
      wide={false}
      linkText=""
      date={date1}
    />
  );
  expect(container).toMatchSnapshot();
});
