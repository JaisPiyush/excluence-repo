export const GeneralPermissions: Record<string, bigint> = {
    'View Channel': BigInt('0x400'),
    'Manage Channel': BigInt('0x10'),
    'Manage Roles': BigInt('0x10000000'),
    'Manage Emojis and Stickers': BigInt('0x40000000'),
    'View Audit Log': BigInt('0x80')
}

export const TextPermissions: Record<string, bigint> = {
    'Send Messages': BigInt('0x800')
}

export const VoicePermissions: Record<string, bigint> = {
    'Connect': BigInt('0x100000')
}

export const AllPermissions = {
    ...GeneralPermissions,
    ...TextPermissions,
    ...VoicePermissions
}