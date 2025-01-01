import { NETWORK_CONFIG, easGraphQLClient } from "lib/consts";
import { SCHEMA_UID } from "lib/consts";
import { GET_ATTESTATIONS } from "./queries";
import { Attestation } from "@ethereum-attestation-service/eas-sdk";

export interface AttestationData extends Attestation {
    decodedDataJson: string;
  }

export const getPosts = async (recipient: string) => {

    const graphqlClient = easGraphQLClient(8453);
    const schemaUID = SCHEMA_UID;
    const AttestorAddress = recipient;
    
    const { attestations } = await graphqlClient.request<{
    attestations: Array<AttestationData>;
  }>(GET_ATTESTATIONS, {
    where: {
      schemaId: {
        equals: schemaUID,
      },
      attester: {
        equals: AttestorAddress,
      },
      recipient: {
        equals: recipient,
      },
    },
  });
  return attestations;
}