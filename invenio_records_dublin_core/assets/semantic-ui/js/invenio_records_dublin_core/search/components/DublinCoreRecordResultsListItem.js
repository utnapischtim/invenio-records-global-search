// This file is part of Invenio.
//
// Copyright (C) 2023 Graz University of Technology.
//
// invenio-records-dublin-core is free software; you can redistribute it and/or
// modify it under the terms of the MIT License; see LICENSE file for more
// details.

import React, { useState } from "react";
import { truncate, get } from "lodash";
import { Button, Item, Label } from "semantic-ui-react";
import { i18next } from "../../../../translations/invenio_records_dublin_core/i18next";

export const DublinCoreRecordResultsListItem = ({ result, index }) => {
  const version = get(result, "revision_id", null);

  const publishedAt = undefined;
  const publicationDate = get(result, "metadata.dates", [
    "No publication date",
  ])[0];
  const createdDate = get(result, "created_date_l10n_long");

  const titles = get(result, "metadata.titles", ["No titles"]);

  const accessId = get(result, "access_status.id");
  const accessIcon = get(result, "access_status.icon");
  const accessStatus = get(result, "access_status.title_l10n");

  const resourceType = get(result, "metadata.types", ["Not defined"])[0];
  const description = get(result, "metadata.descriptions", []).join(" ");
  const subjects = get(result, "metadata.subjects", []);

  const creators = get(result, "metadata.creators", ["No creators"]);

  const viewLink = get(result, "original.view");

  const schema = get(result, "original.schema_l10n");

  const [error, setError] = useState("");

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <Item key={index}>
      <Item.Content>
        <Item.Extra>
          <div>
            <Label size="tiny" color="blue">
              {publishedAt ? `${publishedAt}` : publicationDate}
              {version ? `(${version})` : null}
            </Label>
            <Label size="tiny" className={`access-status ${accessId}`}>
              {accessIcon && <i className={`icon ${accessIcon}`}></i>}
              {accessStatus}
            </Label>
            {resourceType && (
              <Label size="tiny" color="blue">
                {resourceType}
              </Label>
            )}
            <Label size="tiny">{schema}</Label>
            <Button
              basic
              compact
              size="small"
              floated="right"
              icon="eye"
              content={i18next.t("View")}
              href={viewLink}
            />
          </div>
        </Item.Extra>
        <Item.Header href={viewLink}>
          {titles.map((title, index) => (
            <span key={index}>{title}</span>
          ))}
        </Item.Header>
        <Item.Meta>
          {creators.map((creator, index) => (
            <span key={index}>
              {creator}
              {index < creators.length - 1 && ","}
            </span>
          ))}
        </Item.Meta>
        <Item.Description>
          {truncate(description, { length: 350 })}
        </Item.Description>
        <Item.Extra>
          {subjects.map((subject, index) => (
            <Label key={index} size="tiny">
              {subject}
            </Label>
          ))}
          {createdDate && (
            <div>
              <small>
                {i18next.t("Uploaded on ")}
                <span>{createdDate}</span>
              </small>
            </div>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
