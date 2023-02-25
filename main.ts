
/**
 * Extension adding Python-like lists to MakeCode
 */
//% color=#2a6cbd
//% weight=0
//% icon="\uf2b9"
//% block="Lists"
//% advanced=true

namespace list {

    interface IList {
        [key: number]: any
    }

    enum FlushMode {
        Added,
        Removed
    }

    function to_string(item: any) {
        if (List.is_list(item)) {
            return item.toString();
        } else if (Array.isArray(item)) {
            return `<array ${JSON.stringify(item)}>`;
        }
        return JSON.stringify(item);
    }

    function flatten(list: List, max: number, current: number=0): List {
        let flattened = new List();
        let expression: boolean;
        list.for_each((value, index) => {
            expression = max === 0 ? true : current <= max;
            if (List.is_list(value) && expression) {
                flattened.extend(flatten(value, max, current + 1))
            } else {
                flattened.push(value);
            }
        })
        return flattened;
    }

    class List {
        items: IList;
        constructor(list?: IList) {
            this.items = list ? list : {};
        }

        static from_array(array: Array<any>): List {
            let list: IList = {};
            for (let i = 0; i < array.length; i++) {
                list[i] = array[i];
            }
            return new List(list);
        }

        static from_items(
            i1?: any, i2?: any, i3?: any, i4?: any, i5?: any,
            i6?: any, i7?: any, i8?: any, i9?: any, i10?: any
        ): List {
            let list: IList = {};
            let items = [
                i1, i2, i3, i4, i5, i6, i7, i8, i9, i10
            ]
            for (let i = 0; i < 10; i++) {
                if (items[i] === undefined) { break }
                list[i] = items[i];
            }
            return new List(list);
        }

        static is_list(value: any): boolean {
            return (value instanceof List);
        }

        in_range(index: number): boolean {
            return !(index < 0 || index >= this.length);
        }

        get(index: number): any | void {
            if (this.in_range(index)) {
                return this.items[index];
            }
            throw `List error: Index ${index} out of range`;
        }

        set(index: number, item: any): void {
            this.items[index] = item;
            this.flush(index, FlushMode.Added);
        }

        delete(index: number): void {
            if (this.in_range(index)) {
                this.items[index] = undefined;
            }
        }

        get length(): number {
            return Object.keys(this.items).length;
        }

        flush(index: number, mode: FlushMode): void {
            if (mode === FlushMode.Added) {
                let biggest = this.length - 1;
                for (let i = index; i > biggest; i--) {
                    this.items[i] = undefined;
                }
            } else if (mode === FlushMode.Removed) {
                let copy = this.copy();
                let items = copy.items;
                for (let i = index + 1; i < copy.length; i++) {
                    this.items[i - 1] = items[i];
                }
            }
        }

        push(item: any): void {
            this.set(this.length, item);
        }

        pop(index?: number): any {
            let key = index ? index : this.length - 1;
            let value = this.get(key);
            delete this.items[key];
            this.flush(key, FlushMode.Removed);
            return value;
        }

        extend(list: List): void {
            list.for_each((value, index) => {
                this.push(value);
            })
        }

        flatten(depth: number=0) {
            let list = flatten(this, depth);
            this.items = list.items;
        }

        slice(start: number, stop: number): List {
            let sliced: IList = {};
            for (let i = start; i < stop; i++) {
                sliced[i - start] = this.get(i);
            }
            return new List(sliced);
        }

        insert(index: number, value: any): void {
            let start = this.slice(0, index);
            let end = this.slice(index, this.length);
            start.push(value);
            start.extend(end);
        }

        find(item: any): number {
            let found = undefined;
            this.for_each((value, index) => {
                if (value === item) {
                    found = index;
                    return
                }
            })
            return found;
        }

        contains(item: any): boolean {
            return this.find(item) !== undefined;
        }

        remove(item: any): any {
            let location = this.find(item);
            if (location !== undefined) {
                let item = this.pop(location);
            }
            return item;
        }

        swap(i1: number, i2: number): void {
            if (this.in_range(i1) && this.in_range(i2)) {
                [this.items[i1], this.items[i2]] = [this.items[i2], this.items[i1]];
                return;
            }
            throw `List error: Indices (${i1}, ${i2}) out of range`;
        }

        compress(): void {
            let copy = this.copy();
            let shifted = 0;
            copy.for_each((value, index) => {
                if (value === undefined) {
                    this.pop(index - shifted);
                    shifted += 1;
                }
            })
        }

        patch(item: any): void {
            this.for_each((value, index) => {
                if (value === undefined) {
                    this.set(index, item);
                }
            })
        }

        fill(start: number, stop: number, item: any): void {
            for (let i = start; i < stop; i++) {
                this.set(i, item);
            }
        }

        replace(search: any, item: any): void {
            this.for_each((value, index) => {
                if (value === search) {
                    this.set(index, item);
                }
            })
        }

        zip(other: List): List {
            let zipped = new List();
            let pair = new List();
            let longer = this.length > other.length ? this : other;
            let shorter = longer === this ? other : this;

            shorter.for_each((value, index) => {
                pair.push(value);
                pair.push(longer.get(index));
                zipped.push(pair.copy());
                pair.clear();
            })
            return zipped;
        }

        reverse(): void {
            let reversed: IList = {};
            for (let i = this.length - 1; i >= 0; i--) {
                reversed[this.length - i] = this.items[i];
            }
            this.items = reversed;
        }

        random(): any {
            if (this.length === 0) { return null }
            return this.items[Math.randomRange(0, this.length - 1)];
        }

        for_each(handler: (value: any, index: number) => void): void {
            for (let i = 0; i < this.length; i++) {
                handler(this.items[i], i);
            }
        }
        
        clear(): void {
            this.items = {};
        }

        count(item: any): number {
            let times = 0;
            this.for_each((value, index) => {
                if (value === item) { times += 1 }
            })
            return times;
        }

        copy(): List {
            return new List(this.items);
        }

        is_empty(): boolean {
            return this.length > 0;
        }

        all(): boolean {
            let result = false;
            this.for_each((value, index) => {
                result = !!(value);
                if (!result) {
                    return;
                }
            })
            return result;
        }

        any(): boolean {
            let result = false;
            this.for_each((value, index) => {
                result = !!(value);
                if (result) {
                    return;
                }
            })
            return result;
        }

        toString(): string {
            let result = "";
            for (let i = 0; i < this.length; i++) {
                let item = this.items[i];
                result += to_string(item);

                if (i < this.length - 1) {
                    result += ", ";
                }
            }
            return `[${result}]`;
        }
    }

    export function list_factory_array(array: Array<any>): List {
        let list = List.from_array(array);
        return list;
    }

    export function list_factory_items(
        i1?: any, i2?: any, i3?: any, i4?: any, i5?: any,
        i6?: any, i7?: any, i8?: any, i9?: any, i10?: any
    ): List {
        let list = List.from_items(
            i1, i2, i3, i4, i5, i6, i7, i8, i9, i10
        )
        return list
    }

    /**
     * Push an item to the end of the list
     * @list list object to push to
     * @item item to push to end of `list`
     */
    //% block="add $item to end of $list"
    //% item.defl = "item"
    export function push(list: List, item: any): void {
        list.push(item);
    }
}