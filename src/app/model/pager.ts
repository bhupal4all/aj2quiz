export class Pager {
    index: number;
    size: number;
    count: number;

    constructor(data:any) {
        data = data || {};
        this.index = data.index || 0;
        this.size = data.size || 1;
    }
}