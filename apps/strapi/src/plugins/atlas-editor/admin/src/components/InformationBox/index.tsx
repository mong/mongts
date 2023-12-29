import * as React from "react";

import { Box, Divider, Flex, Typography } from "@strapi/design-system";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import { InformationBoxStrings } from "./InformationBoxStringsContext";

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      {children}
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Title
 * -----------------------------------------------------------------------------------------------*/

const Title = () => {
  const { formatMessage } = useIntl();
  const strings = new InformationBoxStrings(formatMessage);

  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <Typography
        variant="sigma"
        textColor="neutral600"
        id="additional-information"
      >
        {strings.information}
      </Typography>

      <Box>
        <Divider />
      </Box>
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Body
 * -----------------------------------------------------------------------------------------------*/

const Body = ({ atlas }) => {
  const { formatMessage, formatRelativeTime } = useIntl();
  const strings = new InformationBoxStrings(formatMessage);

  const { initialData, isCreatingEntry } = useCMEditViewDataManager();
  const currentTime = React.useRef(Date.now());

  const formatDate = (at) => {
    const timestamp = at ? new Date(at).getTime() : Date.now();
    const elapsed = timestamp - currentTime.current;
    const { unit, value } = getUnits(-elapsed);

    return formatRelativeTime(value, unit, { numeric: "auto" });
  };

  const getFieldInfo = (
    atlas,
    atField: "updatedAt" | "createdAt",
    byField: "updatedBy" | "createdBy",
  ) => {
    const user = atlas[byField];
    const at = atlas[atField];

    const displayName = user ? `${user.firstname} ${user.lastname}` : "-";

    return {
      at: formatDate(at),
      by: isCreatingEntry ? "-" : displayName,
    };
  };

  const updated = getFieldInfo(atlas, "updatedAt", "updatedBy");
  const created = getFieldInfo(atlas, "createdAt", "createdBy");

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <Flex direction="column" alignItems="stretch" gap={2} as="dl">
        <KeyValuePair label={strings.created} value={created.at} />
        <KeyValuePair label={strings.by} value={created.by} />
      </Flex>

      <Flex direction="column" alignItems="stretch" gap={2} as="dl">
        <KeyValuePair label={strings.lastUpdate} value={updated.at} />
        <KeyValuePair label={strings.by} value={updated.by} />
      </Flex>

      {atlas?.publishedAt && (
        <Flex direction="column" alignItems="stretch" gap={2} as="dl">
          <KeyValuePair
            label={strings.publishedAt}
            value={formatDate(atlas.publishedAt)}
          />
          <KeyValuePair label={strings.by} value={atlas.publishedBy} />
        </Flex>
      )}
    </Flex>
  );
};

interface KeyValuePairProps {
  label: string;
  value?: string;
}

const KeyValuePair = ({ label, value = "-" }: KeyValuePairProps) => {
  return (
    <Flex justifyContent="space-between">
      <Typography as="dt" fontWeight="bold" textColor="neutral800" variant="pi">
        {label}
      </Typography>
      <Typography as="dd" variant="pi" textColor="neutral600">
        {value}
      </Typography>
    </Flex>
  );
};

const MINUTE = 60 * 1000;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

/**
 * @internal
 *
 * @description This compares the milliseconds to the constants above to understand
 * which time unit it's closest too e.g. is it under a minute? then it's seconds
 * and we turn the value into seconds.
 */
const getUnits = (
  value: number,
): { unit: Intl.RelativeTimeFormatUnit; value: number } => {
  if (value < MINUTE) {
    return { unit: "second", value: -Math.round(value / 1000) };
  }
  if (value < HOUR) {
    return { unit: "minute", value: -Math.round(value / MINUTE) };
  }
  if (value < DAY) {
    return { unit: "hour", value: -Math.round(value / HOUR) };
  }
  if (value < MONTH) {
    return { unit: "day", value: -Math.round(value / DAY) };
  }
  if (value < YEAR) {
    return { unit: "month", value: -Math.round(value / MONTH) };
  }

  return { unit: "year", value: -Math.round(value / YEAR) };
};

const InformationBox = ({ atlas }) => {
  return (
    <Root>
      <Title />
      <Body atlas={atlas} />
    </Root>
  );
};

export default InformationBox;
