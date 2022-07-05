/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAnimal
// ====================================================

export interface DeleteAnimal_deleteAnimal {
  __typename: "MutationResponse";
  success: boolean;
  message: string;
}

export interface DeleteAnimal {
  deleteAnimal: DeleteAnimal_deleteAnimal;
}

export interface DeleteAnimalVariables {
  id: string;
}
