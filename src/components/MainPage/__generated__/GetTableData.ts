/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetTableData
// ====================================================

export interface GetTableData_animals_owner {
  __typename: "Owner";
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
}

export interface GetTableData_animals {
  __typename: "Animal";
  id: string;
  name: string;
  kind: string | null;
  age: number | null;
  gender: Gender | null;
  caseRecord: string | null;
  owner: GetTableData_animals_owner;
}

export interface GetTableData {
  animals: GetTableData_animals[] | null;
}
