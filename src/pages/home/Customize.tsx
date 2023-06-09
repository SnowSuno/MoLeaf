import React from "react";
import styled from "@emotion/styled";
import { Reorder } from "framer-motion";

import { Page } from "../../components/layouts/Page";
import { useTranslation } from "react-i18next";
import { CustomHelperImage } from "../../assets/CustomHelperImage";
import { Text } from "../../components/elements/Text";
import { useWidgetState } from "../../state/widget";
import { Menu } from "../../assets/icons/Menu";
import { Star } from "../../assets/icons/Star";

export const Customize: React.FC = () => {
  const { t } = useTranslation();
  const { order, setOrder } = useWidgetState();

  return (
    <Page title={t(`home.edit`)} background>
      <Container>
        <figure>
          <CustomHelperImage/>
        </figure>

        <Text>{t("customize.help")}</Text>

        <Group axis="y" values={order} onReorder={setOrder}>
          {order.map((widget, i) => (
            <Item key={widget} value={widget}>
              {t(`usage.${widget}.long`)}
              <span>
                {i === 0 && <Star size={24} color="var(--primary)"/>}
                <Menu size={24} color="var(--gray)"/>
              </span>
            </Item>
          ))}
        </Group>
      </Container>
    </Page>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: var(--margin-inline);

  & > figure {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;

    & > svg {
      width: 75%;
    }
  }
`;

const Group = styled(Reorder.Group)`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled(Reorder.Item)`
  list-style: none;
  background-color: var(--white);
  color: var(--dark-text);
  font-weight: 500;
  padding: 14px 20px;
  border-radius: 14px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;
