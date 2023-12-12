
namespace lists {

    interface IList {
        [key: number]: any;
    }

    // Integer type
    type Integer = number;
    function isInteger(value: number): value is Integer {
        return value === Math.floor(value);
    }

    // Error messages
    export const NON_INTEGER_INDEX = "Index must be integer";
    export const INVALID_INDEX = "Index must be non-negative integer";
    export const OUT_OF_RANGE = "Index is out of list range";
    export const EMPTY_LIST = "Operation can't be performed on empty list";
    export const INVALID_RANGE = "First index must not exceed second index";

    export class List {
        items: IList;

        constructor(items?: IList) {
            this.items = items || {};
        }

        /**
         * Static methods
         */

        /**
         * Check if value is of `List` type
         * @param value Value to check
         * @returns true if value is an instane of `List`
         */
        static isList(value: any): value is List {
            return value instanceof List;
        }

        static fromArray(array: any[]): List {
            let result = new List();
            array.forEach((value) => {
                result.push(value);
            })
            return result;
        }

        /**
         * Properties
         */
        
        /**
         * Get length of list
         * @returns Number of items in list
         */
        get length(): number {
            return Object.keys(this.items).length;
        }

        /**
         * Read operations
         * Methods that access list items
         */
        
        /**
         * Check if index is valid (internal method)
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @param index Index to check
         * @returns index if index is valid
         */
        private verify(index: Integer): Integer {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            if (!this.inRange(index)) throw OUT_OF_RANGE;
            return index;
        }

        /**
         * Get item at index from list
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @param T generic type to cast to
         * @param index Index to get
         * @returns Item at index cast to T type
         */
        get<T>(index: Integer): T {
            index = this.verify(index);
            return this.items[index] as T;
        }

        /**
         * Get random item from list
         * Throws INVALID_INDEX or OUT_OF_RANGE for invalid start or end arguments
         * Throws INVALID_RANGE if start value is higher than end value
         * Throws EMPTY_LIST if list is empty
         * @param start (optional) start of range; inclusive (defaults to 0)
         * @param end (optional) end of range; inclusive (defaults to length of list - 1)
         * @returns Random item from list within range
         */
        random(start?: number, end?: number): any {
            start = this.verify(start || 0);
            end = this.verify(end || this.length - 1);

            if (end < start) throw INVALID_RANGE;
            if (this.isEmpty()) throw EMPTY_LIST;
            return this.get(Math.randomRange(start, end));
        }

        /**
         * Modify operations
         * Methods that add, change or remove list items
         */

        /**
         * Set item at given index to value
         * Throws INVALID_INDEX if index is not a non-negative integer
         * @param T generic type to cast to
         * @param index Index at which value is set
         * @param value Element to set at index
         */
        set<T>(index: Integer, value: T): void {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            this.items[index] = value;
        }

        /**
         * Delete item at index
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @param index Index to delete value at
         */
        delete(index: Integer): void {
            index = this.verify(index);
            delete this.items[index];
        }

        /**
         * Add value to end of list
         * @param value Value to append to list end
         */
        push(value: any): void {
            this.set(this.length, value);
        }

        /**
         * Remove and return value from list at index
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @index Index of item to remove
         * @returns Item in list at index
         */
        pop(index: Integer): any {
            index = this.verify(index);
            let item = this.get(index);
            this.delete(index);
            return item;
        }
    	
        /**
         * Remove first occurence of an item from list
         * @param value Value to remove
         */
        remove(value: any): void {
            for (let i = 0; i < this.length; i++) {
                if (this.get(i) === value) this.delete(i);
                return;
            }
        }

        /**
         * Remove all occurences of item from list (unless `max` is specified)
         * @param value Value to remove
         * @param max Items to remove at most; no limit if 0 (defaults to 0)
         */
        removeAll(value: any, max: number=0): void {
            let removed = 0;
            for (let i = 0; i < this.length; i++) {
                if (max > 0 && max >= removed) {
                    return;
                }

                if (this.get(i) === value) {
                    this.delete(i);
                    removed += 1;
                }
            }
        }

        /**
         * Swap two item positions in list
         * Throws INVALID_INDEX or OUT_OF_RANGE for invalid first or other argument
         * @param first Index of first item
         * @param other Index of second item
         */
        swap(first: number, other: number): void {
            first = this.verify(first);
            other = this.verify(other);
            
            let item = this.get(first);
            this.set(first, this.get(other));
            this.set(other, item);
        }

        /**
         * List operations
         * Methods that return list data or performs
         * operations on entire lists
         */

        /**
         * Check if index is in range of list
         * Throws NON_INTEGER_INDEX if index is not an integer
         * @param index Index to compare
         * @returns true if index is above 0 and below the length of the list
         */
        inRange(index: Integer): boolean {
            if (!isInteger(index)) throw NON_INTEGER_INDEX;
            return index >= 0 && index < this.length;
        }

        /**
         * Check if list is empty
         * @returns true if list has no items
         */
        isEmpty(): boolean {
            return this.length === 0;
        }

        /**
         * Iterate through every list element
         * @param handler (value, index) => void
         */
        forEach(handler: (value?: any, index?: number) => void): void {
            for (let i = 0; i < this.length; i++) {
                handler(this.get(i), i);
            }
        }

        /**
         * Creates a copy of the list
         * @retuns New list instance with identical items
         */
        copy(): List {
            return new List(this.items);
        }
    }
}