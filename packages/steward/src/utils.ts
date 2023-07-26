export function getContractId(eventName: string) {
    const splitted = eventName.split('.');
    return splitted.slice(0, 3).join('.');
}

export function getContractNameOnly(eventName: string) {
    const splitted = eventName.split('.');
    return splitted[2];
}

export function getEventTypeOnly(eventName: string) {
    const splitted = eventName.split('.');
    return splitted[3];
}

export function getAddressOnly(eventName: string) {
    const splitted = eventName.split('.');
    return '0x' + splitted[1];
}
