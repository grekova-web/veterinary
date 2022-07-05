/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAnimal
// ====================================================

export interface UpdateAnimal_updateAnimal {
  __typename: "MutationResponse";
  success: boolean;
  message: string;
}

export interface UpdateAnimal {
  updateAnimal: UpdateAnimal_updateAnimal;
}

export interface UpdateAnimalVariables {
  id: string;
  name?: string | null;
  kind?: string | null;
  age?: number | null;
  gender?: Gender | null;
  caseRecord?: string | null;
  ownerId?: string | null;
}
