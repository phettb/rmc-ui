export interface RawMaterial {
    id: string,
    rawmatid: string,
    name: string,
    type: string,
    status: boolean,
    detail: detail[],
    imageid: string,
    created_time: string,
    updated_time: string,
}

export interface detail {
    key: string,
    value: string,
}

