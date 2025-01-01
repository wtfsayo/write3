import { GraphQLClient } from "graphql-request";
export const NETWORK_CONFIG = [
    {
        name: 'base',
        chainId: 8453,
        blockExolorer: 'https://basescan.org',
        attestationExplorer: 'https://base.easscan.org',
        queryUrl: '	https://base.easscan.org/graphql'
    },
    {
        name: 'optimism',
        chainId: 10,
        blockExolorer: 'https://optimistic.etherscan.io',
        attestationExplorer: 'https://optimism.easscan.org',
        queryUrl: 'https://optimism.easscan.org/graphql'
    },
    {
        name: 'arbitrum',
        chainId: 42161,
        blockExolorer: 'https://arbiscan.io',
        attestationExplorer: 'https://arbitrum.easscan.org',
        queryUrl: 'https://arbitrum.easscan.org/graphql'
    }
]

export const ENS_RESOLVER = 'https://api.ensdata.net'

export const SCHEMA_UID = `0x80be3615216f248943b819801b16d29c4cadbb5599b9eccfbf02738ca886b702`


export const easGraphQLClient = (chainId: number) => new GraphQLClient(NETWORK_CONFIG.find(n => n.chainId === chainId)?.queryUrl!)